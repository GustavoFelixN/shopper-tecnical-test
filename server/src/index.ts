import 'dotenv/config';
import express, { Request, Response } from 'express';
import {
    rideEstimateSchema,
    RideEstimateRequest,
    RideConfirmationRequest,
    rideConfirmationSchema,
} from './schemas/rideSchemas';
import { ValidationError } from 'yup';
import { Client } from '@googlemaps/google-maps-services-js';
import { drivers, PrismaClient, rides } from '@prisma/client';

const app = express();
app.use(express.json());

const client = new Client();
const prisma = new PrismaClient();
const PORT = 8080;

let API_KEY: string;
if (process.env.GOOGLE_API_KEY) {
    API_KEY = process.env.GOOGLE_API_KEY;
}

type Coord = {
    latitude: number;
    longitude: number;
};

type Route = {
    distanceMeters: number;
    duration: string;
    polyline: {
        encodedPolyline: string;
    };
};

type RoutesResponse = {
    routes: Route[];
};

const getCoords = async (address: string) => {
    try {
        const response = await client.geocode({
            params: {
                key: API_KEY,
                address: address,
            },
        });

        if (response.data.results.length === 0) {
            throw new Error('No results found for the given address');
        }

        const location = response.data.results[0].geometry.location;
        return { latitude: location.lat, longitude: location.lng };
    } catch (err: any) {
        console.error('Error in getCoords:', err);
        throw err;
    }
};

const getRoute = async (coordOrigin: Coord, coordDestination: Coord) => {
    const origin = {
        location: {
            latLng: {
                latitude: coordOrigin.latitude,
                longitude: coordOrigin.longitude,
            },
        },
    };
    const destination = {
        location: {
            latLng: {
                latitude: coordDestination.latitude,
                longitude: coordDestination.longitude,
            },
        },
    };
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
    const payload = {
        origin,
        destination,
        travelMode: 'DRIVE',
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask':
                    'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: RoutesResponse = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching route:', error);
        throw error;
    }
};

const formatDriver = (driver: drivers, kms: number) => {
    let { rating, review_comment, value, ...rest } = driver;
    return {
        ...rest,
        review: {
            rating,
            comment: review_comment,
        },
        value: value ? value * kms : value,
    };
};

const estimateRoute = async (req: Request, res: Response) => {
    try {
        const validateBody: RideEstimateRequest =
            await rideEstimateSchema.validate(req.body, { abortEarly: true });

        if (validateBody.origin.trim() == validateBody.destination.trim()) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Origin and Destination must be different',
            });
        }

        const coordOrigin = await getCoords(validateBody.origin);
        const coordDestination = await getCoords(validateBody.destination);

        const routes: RoutesResponse = await getRoute(
            coordOrigin,
            coordDestination,
        );
        if (routes && routes.routes.length >= 1) {
            const route = routes.routes[0];
            const kms = route.distanceMeters / 1000;
            const drivers = await prisma.drivers.findMany({
                where: {
                    min_km: {
                        lte: kms,
                    },
                },
            });
            const formattedDrivers = drivers.map((driver) =>
                formatDriver(driver, kms),
            );
            const response = {
                origin: coordOrigin,
                destination: coordDestination,
                distance: route.distanceMeters,
                duration: route.duration,
                options: formattedDrivers,
                routeResponse: routes,
            };
            return res.json(response);
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: err.message,
            });
        }
    }
};

const confirmRide = async (req: Request, res: Response) => {
    try {
        const validateBody: RideConfirmationRequest =
            await rideConfirmationSchema.validate(req.body);
        const driverId = validateBody.driver.id;
        const driver = await prisma.drivers.findUnique({
            where: {
                id: driverId,
            },
        });

        if (!driver || driver.name !== validateBody.driver.name) {
            return res.status(404).json({
                error_code: 'DRIVER_NOT_FOUND',
                error_description: 'Motorista nao encontrado',
            });
        }

        const distanceKM = validateBody.distance / 1000;
        if (driver.min_km && driver.min_km > distanceKM) {
            return res.status(406).json({
                error_code: 'INVALID_DISTANCE',
                error_description: 'Quilometragem invalida para motorista',
            });
        }

        await prisma.rides.create({
            data: {
                customer_id: validateBody.customer_id,
                driver_id: validateBody.driver.id,
                origin: validateBody.origin,
                destination: validateBody.destination,
                value: validateBody.value,
            },
        });

        res.json({ sucess: true });
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: err.message,
            });
        }
    }
};

const getHistory = async (req: Request, res: Response) => {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    if (!driver_id) {
        const rides = await prisma.rides.findMany({
            where: {
                customer_id: customer_id,
            },
            include: {
                drivers: true,
            },
        });
        const formattedRides = rides.map((r) => ({
            id: r.id,
            date: r.date,
            origin: r.origin,
            destination: r.destination,
            duration: r.duration,
            driver: {
                id: r.driver_id,
                name: r.drivers.name,
            },
            value: r.value,
        }));
        return res.json({
            customer_id,
            rides: formattedRides,
        });
    }

    res.json({
        message: 'Detalhes da corrida',
        customer_id,
        driver_id,
    });
};

app.post('/ride/estimate', async (req, res) => estimateRoute(req, res) as any);
app.post('/ride/confirm', async (req, res) => confirmRide(req, res) as any);
app.get('/ride/:customer_id', async (req, res) => getHistory(req, res) as any);

app.listen(PORT, () => {
    console.log(`Server runnig at port: ${PORT}`);
});
