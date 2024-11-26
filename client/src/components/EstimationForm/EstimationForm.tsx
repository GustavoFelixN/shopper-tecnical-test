import React, { useCallback, useState, useRef } from 'react'
import { ViewOverlay, FormView, Input, Button } from '../index';
import { Autocomplete } from '@react-google-maps/api';


const EstimationForm: React.FC = () => {

	const [customerId, setCustomerId] = useState('');
	const [origin, setOrigin] = useState('');
	const [destination, setDestination] = useState('');

	const [customerIdError, setCustomerIdError] = useState('');
	const [originError, setOriginError] = useState('');
	const [destinationError, setDestinationError] = useState('');


	const autocompleteOriginRef = useRef<google.maps.places.Autocomplete | null>(null);
	const autocompleteDestinationRef = useRef<google.maps.places.Autocomplete | null>(null);

	const onLoadOrigin = useCallback((autocomplete: google.maps.places.Autocomplete) => {
		autocompleteOriginRef.current = autocomplete;
	}, []);

	const onLoadDestination = useCallback((autocomplete: google.maps.places.Autocomplete) => {
		autocompleteDestinationRef.current = autocomplete;
	}, []);

	const onPlaceChangedOrigin = useCallback(() => {
		if (autocompleteOriginRef.current) {
			const place = autocompleteOriginRef.current.getPlace();
			setOrigin(place.formatted_address || '');
		}
	}, []);

	const onPlaceChangedDestination = useCallback(() => {
		if (autocompleteDestinationRef.current) {
			const place = autocompleteDestinationRef.current.getPlace();
			setDestination(place.formatted_address || '');
		}
	}, []);

	const clearErrors = () => {
		setCustomerIdError('');
		setOriginError('');
		setDestinationError('');
	};

	const checkEmptyFields = () => {
		if (customerId === '') {
			setCustomerIdError('O ID não pode ser vazio');
		}
		if (origin === '') {
			setOriginError('A origem não pode ser vazia');
		}
		if (destination === '') {
			setDestinationError('O destino não pode ser vazio');
		}

		return customerId === '' || origin === '' || destination === '';
	};

	const checkSameAddress = () => {
		if (origin.trim() === destination.trim()) {
			setOriginError('Origem e destino devem ser diferentes');
			setDestinationError('Origem e destino devem ser diferentes');
			return true;
		}
		return false;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		clearErrors();
		const hasEmptyFields = checkEmptyFields();
		if (hasEmptyFields) {
			return;
		}
		const hasSameAddress = checkSameAddress();
		if (hasSameAddress) {
			return;
		}
		console.log('Formulário enviado com sucesso!');
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<ViewOverlay>
			<FormView>
				<form onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
					<Input
						placeholder="ID"
						value={customerId}
						onChange={(e) => setCustomerId(e.target.value)}
						error={customerIdError}
					/>
					<Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlaceChangedOrigin}>
						<Input
							placeholder="Origem"
							value={origin}
							onChange={(e) => setOrigin(e.target.value)}
							error={originError}
						/>
					</Autocomplete>
					<Autocomplete onLoad={onLoadDestination} onPlaceChanged={onPlaceChangedDestination}>
						<Input
							placeholder="Destino"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							error={destinationError}
						/>
					</Autocomplete>
					<Button label="Estimar" />
				</form>
			</FormView>
		</ViewOverlay>

	)
}

export default EstimationForm;
