import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const API_KEY = import.meta.env.GOOGLE_API_KEY;

const containerStyle = {
  width: '100vw',
  height: '100vh',
}

const center = {
  lat: -23.53,
  lng: -46.78,
}

function Map({ children }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  })

  useEffect(() => {
    console.log(API_KEY);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {children}
      </GoogleMap>
    </>
  ) : (
    <></>
  )
}

export default React.memo(Map)
