import cat2 from "../assets/cat2.jpg";
import { useNavigate } from "react-router-dom";


export default function AboutMia() {
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
          border: "1px solid gray",
          color: "black",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Back
      </button>
        <h1>About Mia</h1>
        <img 
            src={cat2} 
            alt="mia"
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
        />
        <div style={{ marginTop: 50 }}> 
            <p>Favorite Coffee Shop: Wonderstate Coffee</p>
            <p>Go To Drink: matcha latte with almond milk and honey</p>
            <p>Fun Fact(s): I make a matcha latte almost everyday.</p>
        </div>
    </div>
    );
}