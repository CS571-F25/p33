import profilePic from "../assets/profilePicture.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  function handleFavorites() {
    navigate("/Favorites");
  }

  function handleJournal() {
    navigate("/Journal");
  }

  function handleLogout() {
    sessionStorage.removeItem("username");
    sessionStorage.clear();
    navigate("/");
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
      <h2>@{username}</h2>
      < div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <Button 
          style={{ 
            margin: 20, 
            backgroundColor: "lightblue", 
            color: "black", 
            borderColor: "gray" 
          }} 
          onClick={handleFavorites}>
            Favorite Coffee Shops
        </Button>
        <Button 
          style={{ 
            margin: 20, 
            backgroundColor: "lightblue", 
            color: "black", 
            borderColor: "gray"  
          }} 
          onClick={handleJournal}>
            Journal
        </Button>
      </div>
      <Button 
      style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                  background: "pink",
                  color: "black",
                  cursor: "pointer",
                }}
                onClick = {handleLogout}>
        Logout
      </Button>
    </div>
  );
}
