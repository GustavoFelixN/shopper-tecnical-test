import express, { Request, Response } from 'express';
import { rideEstimateSchema, RideEstimateRequest } from './schemas/rideSchemas';
import { ValidationError } from 'yup';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (_req: Request, res: Response) => {
    res.send('Sucesso');
});

const estimate = async (req: Request, res: Response) => {
    try {
        const validateBody: RideEstimateRequest =
            await rideEstimateSchema.validate(req.body, { abortEarly: true });

        if (validateBody.origin.trim() == validateBody.destination.trim()) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Origin and Destination must be different',
            });
        }
        return res.json({ message: 'tudo certo', data: validateBody });
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: err.message,
            });
        }
    }
};

app.post('/ride/estimate', async (req, res) => estimate(req, res) as any);

app.listen(PORT, () => {
    console.log(`Server runnig at port: ${PORT}`);
});
