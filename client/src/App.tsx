import { useState } from 'react';
import { Map, EstimationForm, DriversList, HistoryCardList } from './components';
import { DriverProps } from './components/DriverCard/DriverCard.tsx';
import { HistoryCardProps } from './components/HistoryCard/HistoryCard.tsx';
function App() {

  const [operation, setOpertion] = useState('historic');
  const homer: DriverProps = {
    id: 1,
    name: 'Homer Simpson',
    description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
    vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
    review: {
      rating: 2,
      comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
    },
    value: 2.5
  }

  const historic: HistoryCardProps = {
    date: '2024',
    driver: {
      id: 1,
      name: 'Homer Simpson',
    },
    origin: 'Carapicuiba',
    destination: 'Osasco',
    distance: 20,
    duration: 'pouco',
    value: 5.9,
  };

  const drivers = [homer, homer, homer, homer];
  const historics = [historic];

  const getOperation = () => {
    switch (operation) {
      case 'estimation':
        return <EstimationForm onEstimation={() => setOpertion('driver_selection')} />
      case 'driver_selection':
        return <DriversList drivers={drivers} onSelection={() => setOpertion('estimation')} />
      case 'historic':
        return <HistoryCardList historic={historics} />
    }
  }

  return (
    <Map>
      {getOperation()}
    </Map>
  );
}

export default App;
