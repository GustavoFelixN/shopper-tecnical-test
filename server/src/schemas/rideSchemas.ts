import { number, object, string } from 'yup';

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

export type RideConfirmationRequest = {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
        id: number;
        name: string;
    };
    value: number;
};

export const rideConfirmationSchema = object().shape({
    customer_id: string().required('CustomerID is required.'),
    origin: string().required('Origin is required.'),
    destination: string().required('Destination is required.'),
    distance: number().required('Distance is required.'),
    duration: string().required('Duration is required.'),
    driver: object().shape({
        id: number().required('Driver id is required.'),
        name: string().required('Driver name is required.'),
    }),
    value: number().required('Value is required.'),
});
