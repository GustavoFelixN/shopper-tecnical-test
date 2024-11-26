import React from 'react';
import {
    Container,
    TitleView,
    Date,
    Driver,
    Address,
    Metric,
    Value,
} from './styles';

export interface HistoryCardProps {
    date: string;
    driver: {
        id: number;
        name: string;
    };
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
    date,
    driver,
    origin,
    destination,
    distance,
    duration,
    value,
}) => {
    return (
        <Container>
            <TitleView>
                <>
                    Viagem de <Date>{date}</Date>
                </>
                <Driver>{driver.name}</Driver>
            </TitleView>
            <b>De: </b> <Address>{origin}</Address>
            <b>Até: </b> <Address>{destination}</Address>
            <Metric>{distance}</Metric>
            <Metric>{duration}</Metric>
            <Value>{value}</Value>
        </Container>
    );
};

export default HistoryCard;
