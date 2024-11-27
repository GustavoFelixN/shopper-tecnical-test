import React from 'react';
import {
    Container,
    TitleView,
    NameView,
    SelectionView,
    Name,
    Description,
    Vehicle,
    Rating,
    Value,
} from './styles';
import { Button } from '../index';

export interface DriverProps {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string;
    };
    value: number;
}

interface DriverCardProps {
    driver: DriverProps;
    onSelection: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, onSelection }) => {
    const { name, description, vehicle, review, value } = driver;
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
    return (
        <Container>
            <TitleView>
                <NameView>
                    <Name>{name}</Name>
                    <Vehicle>{vehicle}</Vehicle>
                </NameView>
                <Rating>{review.rating}⭐</Rating>
            </TitleView>
            <Description>{description}</Description>
            <SelectionView>
                <Value>{formattedValue}</Value>
                <Button label="Selecionar" onClick={onSelection} />
            </SelectionView>
        </Container>
    );
};

export default DriverCard;
