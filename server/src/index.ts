import 'dotenv/config';
import express, { Request, Response } from 'express';
import { rideEstimateSchema, RideEstimateRequest } from './schemas/rideSchemas';
import { ValidationError } from 'yup';
import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import { RoutesClient } from '@googlemaps/routing';

const app = express();
app.use(express.json());

const client = new Client();
const routingClient = new RoutesClient();

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
            const response = {
                origin: coordOrigin,
                destination: coordDestination,
                distance: route.distanceMeters,
                duration: route.duration,
                options: [],
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

app.post('/ride/estimate', async (req, res) => estimateRoute(req, res) as any);

app.listen(PORT, () => {
    console.log(`Server runnig at port: ${PORT}`);
});
