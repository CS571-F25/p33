import cat1 from "../assets/cat1.jpg";
import { useNavigate } from "react-router-dom";

export default function AboutCharlotte() {

    const navigate = useNavigate();

    function goBack() {
        navigate("/About");
    }

    return (
        <div style={{ position: "relative", paddingTop: "10px" }}>
        <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: "0px",
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
        <h1>About Charlotte</h1>
        <img 
                    src={cat1} 
                    alt="mia"
                    style={{ width: "300px", height: "300px", objectFit: "cover" }}
                />
        <div style={{ marginTop: 50 }}> 
            <p>Favorite Coffee Shop: Fair Trade Coffee House</p>
            <p>Go To Drink: Honey Latte with Oatmilk</p>
            <p>Fun Fact(s): I made my own strawberry syrup once!</p>
        </div>
    </div>
    );
}