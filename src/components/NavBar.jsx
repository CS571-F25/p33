import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar
      bg="white"
      expand="md"
      fixed="top"
      className="shadow-sm py-3"
    >
      <Container className="justify-content-center">

        <Nav className="gap-4">
          <Nav.Link as={NavLink} to="/Home" end>Home</Nav.Link>
          <Nav.Link as={NavLink} to="/About">About</Nav.Link>
          <Nav.Link as={NavLink} to="/Profile">Profile</Nav.Link>
          <Nav.Link as={NavLink} to="/DrinkChoice">Drink Search</Nav.Link>
          <Nav.Link as={NavLink} to="/CommunityBulletin">Community Bulletin Board</Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
}
