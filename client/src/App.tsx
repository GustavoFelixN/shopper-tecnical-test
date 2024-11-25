import { Map, ViewOverlay, Button, Input } from './components';


function App() {

  return (
    <>
      <Map>
        <ViewOverlay >
          <Input placeholder='' value='' onChange={(_e) => { }} />
          <Button label='dale' onClick={() => { }} />
        </ViewOverlay >
      </Map>
    </>
  )
}

export default App
