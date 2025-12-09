import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import coffeeShops from "../data/coffeeShops.json";


const containerStyle = { width: '100vw', height: '800px' };
const center = { lat: 43.0731, lng: -89.4012 };
const libraries = ['places']; // for coffee shops
const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

export default function Home(props){

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: MAP_API_KEY,
        libraries,
    });

    const [selectedShop, setSelectedShop] = useState();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(stored);
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    function toggleFavorite(shop) {
        setFavorites(prev => {
            const exists = prev.find(s => s.id === shop.id);
            if (exists) {
                return prev.filter(s => s.id !== shop.id); 
            }
            return [...prev, shop];
        });
    }

    // 👇 NEW: If we came from "View on Map", open that shop
    useEffect(() => {
        if (!isLoaded) return;

        const selectedId = localStorage.getItem("selectedShopId");
        if (selectedId) {
            const found = coffeeShops.find(
                s => String(s.id) === String(selectedId)
            );
            if (found) {
                setSelectedShop(found);
            }
            // clear it so it doesn't reopen every time
            localStorage.removeItem("selectedShopId");
        }
    }, [isLoaded]);

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

                            {/* CUSTOM X CLOSE BUTTON */}
                            <div
                                onClick={() => setSelectedShop(null)}
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#333"
                                }}
                            >
                                ✖
                            </div>

                                <h2>{selectedShop.name}</h2>
                                <p>{selectedShop.address}</p>

                                {/* Heart icon */}
                                <div 
                                    onClick={() => toggleFavorite(selectedShop)}
                                    style={{ 
                                        cursor: "pointer", 
                                        fontSize: "24px", 
                                        marginTop: "8px" 
                                    }}
                                >
                                    {favorites.some(s => s.id === selectedShop.id)
                                        ? "❤️"  // if favorited
                                        : "🤍"  // if not favorited
                                    }
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
}