import React from 'react';
import { Container, TitleView, NameView, SelectionView, Name, Description, Vehicle, Rating, Value } from './styles';
import { Button } from '../index';

export interface DriverCardProps {
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

const DriverCard: React.FC<DriverCardProps> = ({ name, description, vehicle, review, value }) => {
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
				<Button label="Selecionar" />
			</SelectionView>
		</Container>
	)
}

export default DriverCard;
