import { Map, ViewOverlay, Button, Input, FormView } from './components';
import { useState } from 'react';

function App() {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const [customerIdError, setCustomerIdError] = useState('');
  const [originError, setOriginError] = useState('');
  const [destinationError, setDestinationError] = useState('');

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

  const handleSubmit = () => {
    clearErrors();
    const hasEmptyFields = checkEmptyFields();
    if (hasEmptyFields) {
      return;
    }
    const hasSameAddress = checkSameAddress();
    if (hasSameAddress) {
      return;
    }
    // Lógica adicional ao enviar os dados
    console.log('Formulário enviado com sucesso!');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita o comportamento padrão de recarregar a página
      handleSubmit();
    }
  };

  return (
    <Map>
      <ViewOverlay>
        <FormView>
          {/* Adicione o evento onKeyDown no formulário */}
          <form onKeyDown={handleKeyDown}>
            <Input
              placeholder="ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              error={customerIdError}
            />
            <Input
              placeholder="Origem"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              error={originError}
            />
            <Input
              placeholder="Destino"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              error={destinationError}
            />
            <Button label="Estimar" onClick={handleSubmit} />
          </form>
        </FormView>
      </ViewOverlay>
    </Map>
  );
}

export default App;