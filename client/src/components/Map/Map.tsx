import React, { FC, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const center = {
    lat: -23.53,
    lng: -46.78,
};

interface MapProps {
    children: React.ReactNode;
}

const Map: FC<MapProps> = ({ children }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries: ['places'],
    });

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
    );
};

export default React.memo(Map);
