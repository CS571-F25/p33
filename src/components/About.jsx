import cat1 from "../assets/cat1.jpg";
import cat2 from "../assets/cat2.jpg";
import {useNavigate} from "react-router-dom";

export default function About(props){
    const navigate = useNavigate();
    
    function navToCharlotte() {
        navigate("/AboutCharlotte");

    }

    function navToMia() {
        navigate("/AboutMia");
    }

    return <div 
        style={{ 
            marginLeft: 30, 
            marginRight: 30            
        }}
    >
        <h1>Welcome to Madison Coffee Crawl!</h1>
        <h2>Meet the Creators</h2>
        <p>Hi, we're Charlotte and Mia, and we're two students studying computer science at UW-Madison. We've partnered up to build this website for our CS571 class which to help students find coffee shops in the Madison area while also catering to their drink preferences.</p>
        <p>Click on an image below to learn more about us!</p>
        
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginTop: "20px",
    flexWrap: "wrap"  
  }}
>
  <figure style={{ textAlign: "center" }}>
    <figcaption style={{ marginTop: "10px", fontSize: "25px" }}>Charlotte</figcaption>
    <img 
      src={cat1}
      alt="charlotte"
      style={{ width: "650px", height: "650px", objectFit: "cover" }}
      onClick={navToCharlotte}
    />
  </figure>

  <figure style={{ textAlign: "center" }}>
    <figcaption style={{ marginTop: "10px", fontSize: "25px" }}>Mia</figcaption>
    <img 
      src={cat2}
      alt="mia"
      style={{ width: "650px", height: "650px", objectFit: "cover" }}
      onClick={navToMia}
    />
  </figure>
</div>


    </div>
}