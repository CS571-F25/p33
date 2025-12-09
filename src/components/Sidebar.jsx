import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
    return ( 
        <>
            <div
                className={'sidebar-overlay ${isOpen ? "open" : ""}'}
                onClick={onClose}
            />
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <h2>Menu</h2>
                <nav>
                    <Link to="/Home" onClick={onClose}>Home</Link>
                    <Link to="/About" onClick={onClose}>About</Link>
                    <Link to="/Profile" onClick={onClose}>Profile</Link>
                    <Link to="/DrinkChoice" onClick={onClose}>Drink Search</Link>
                    <Link to="/CommunityBulletin" onClick={onClose}>Community Bulletin Board</Link>
                </nav>
            </div>
        </>
    );
}