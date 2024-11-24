import { object, string } from 'yup';

export type RideEstimateRequest = {
    customer_id: string;
    origin: string;
    destination: string;
};

export const rideEstimateSchema = object().shape({
    customer_id: string().required('CustomerID is required.'),
    origin: string().required('Origin is required.'),
    destination: string().required('Destination is required.'),
});
