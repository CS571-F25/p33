import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import coffeeShops from "../data/coffeeShops.json";


const containerStyle = { width: '100vw', height: '800px' };
const center = { lat: 43.0731, lng: -89.4012 };
const libraries = ['places']; // for coffee shops
const MAP_API_KEY = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Home(props){

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: MAP_API_KEY,
        libraries,
    });
    const [selectedShop, setSelectedShop] = useState();

    if (!isLoaded) 
        return <div>Loading Map...</div>;

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Madison Coffee Crawl</h1>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                    
                    {coffeeShops.map((shop) => ( 
                        <Marker 
                            key={shop.id}
                            position={{lat: shop.lat, lng: shop.lng}}
                            onClick={() => setSelectedShop(shop)} 
                        />
                    ))};
                    {selectedShop && (
                        <InfoWindow 
                            position={{lat: selectedShop.lat, lng: selectedShop.lng}} 
                            onCloseClick={() => setSelectedShop(null)}>
                            <div>
                                <h2>{selectedShop.name}</h2>
                                <p>{selectedShop.address}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
}