import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {

    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(stored);
    }, []);

    function removeFavorite(id) {
        const updated = favorites.filter(shop => shop.id !== id);
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    }

    function handleViewOnMap(id) {
        // store the selected shop id so Home can pick it up
        localStorage.setItem("selectedShopId", id);
        navigate("/"); // go to the map page
    }

    function goBack() {
        navigate("/Profile");
    }

    return (
        <div style={{ textAlign: "center" }}>
            <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: "70px",
          left: "10px",
          background: "lightgray",
          color: "black",
          border: "1px solid gray",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Back
      </button>
            <h1>Favorite Coffee Shops</h1>

            {favorites.length === 0 && <p>No favorites yet!</p>}

            {favorites.map(shop => (
                <div 
                    key={shop.id} 
                    style={{ 
                        margin: "1rem auto", 
                        width: "320px",
                        padding: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        textAlign: "left",
                        position: "relative"
                    }}
                >
                    {/* Unfavorite Button */}
                    <div 
                        onClick={() => removeFavorite(shop.id)}
                        style={{
                            cursor: "pointer",
                            fontSize: "20px",
                            position: "absolute",
                            top: "3px",
                            right: "6px",
                            marginLeft: 5
                        }}
                        title="Remove from favorites"
                    >
                        ✖
                    </div>

                    <h2 style={{ marginBottom: "6px" }}>{shop.name}</h2>
                    <p style={{ margin: "0 0 0.5rem 0" }}>{shop.address}</p>

                    {/* 👇 View on Map button */}
                    <button
                        onClick={() => handleViewOnMap(shop.id)}
                        style={{
                            marginTop: "0.5rem",
                            padding: "0.4rem 0.8rem",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        View on Map
                    </button>
                </div>
            ))}
        </div>
    );
}
