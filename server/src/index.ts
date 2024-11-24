import 'dotenv/config';
import express, { Request, Response } from 'express';
import { rideEstimateSchema, RideEstimateRequest } from './schemas/rideSchemas';
import { ValidationError } from 'yup';
import { Client } from '@googlemaps/google-maps-services-js';

const app = express();
app.use(express.json());

const client = new Client();

const PORT = 8080;

let API_KEY: string;
if (process.env.GOOGLE_API_KEY) {
    API_KEY = process.env.GOOGLE_API_KEY;
}

const getCoords = async (addres: string) => {
    try {
        const response = await client.geocode({
            params: {
                key: API_KEY,
                address: addres,
            },
        });
        return response;
    } catch (err: any) {
        console.error(err);
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
        return res.json({ message: 'tudo certo', data: coordOrigin });
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
