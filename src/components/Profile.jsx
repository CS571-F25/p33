import profilePic from "../assets/profilePicture.png";
import { Button } from "react-bootstrap";
//import FavoriteCoffeeShops from "./FavoriteCoffeeShops";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();

  function handleFavorites() {
    navigate("/Favorites");
  }
  return ( <div> 
      <img 
        src={profilePic}
        alt="Profile"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "20px"
        }}
      />
      <h1>FirstName LastName</h1>
      <h2>@username</h2>
      <Button onClick={handleFavorites}>Favorite Coffee Shops</Button>
    </div>
  );
}
