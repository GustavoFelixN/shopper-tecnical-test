import React from 'react';
import {
    Container,
    TitleView,
    Date,
    Driver,
    Address,
    Metric,
    Value,
    RouteView,
    Text,
    AddressView,
    Metrics,
    MetricView,
    ValueView,
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

const Origin = ({ origin: string }) => {
    return (
        <div>
            <Text>De: </Text> <Address>{origin}</Address>
        </div>
    );
};

const HistoryCard: React.FC<HistoryCardProps> = ({
    date,
    driver,
    origin,
    destination,
    distance,
    duration,
    value,
}) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
    return (
        <Container>
            <TitleView>
                <Date>{date}</Date>
                <Driver>{driver.name}</Driver>
            </TitleView>
            <RouteView>
                <AddressView>
                    <Text>De: </Text>
                    <Address>{origin}</Address>
                </AddressView>
                <AddressView>
                    <Text>Até: </Text>
                    <Address>{destination}</Address>
                </AddressView>
            </RouteView>
            <Metrics>
                <MetricView>
                    <Text>Distancia: </Text>
                    <Metric>{distance}</Metric>
                </MetricView>
                <MetricView>
                    <Text>Tempo: </Text>
                    <Metric>{duration}</Metric>
                </MetricView>
            </Metrics>
            <ValueView>
                <Value>{formattedValue}</Value>
            </ValueView>
        </Container>
    );
};

export default HistoryCard;
