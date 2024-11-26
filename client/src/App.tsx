import { Map, DriversList } from './components';
import { DriverProps } from './components/DriverCard/DriverCard.tsx';

function App() {

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

  const drivers = [homer, homer, homer, homer];

  return (
    <Map>
      <DriversList drivers={drivers} onSelection={() => { }} />
    </Map>
  );
}

export default App;
