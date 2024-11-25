import { Map, ViewOverlay, Button, Input, FormView } from './components';
import { useState } from 'react';

function App() {

  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <>
      <Map>
        <ViewOverlay >
          <FormView>
            <Input placeholder='ID' value={customerId} onChange={(e) => {
              setCustomerId(e.target.value)
              if (e.target.value === 'popo') {
              }
            }} />
            <Input placeholder='Origem' value={origin} onChange={(e) => { setOrigin(e.target.value) }} />
            <Input placeholder='Destino' value={destination} onChange={(e) => { setDestination(e.target.value) }} />
            <Button label='Estimar' onClick={() => { }} />
          </FormView>
        </ViewOverlay >
      </Map>
    </>
  )
}

export default App
