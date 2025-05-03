import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="md"
      bg="primary"
      data-bs-theme="dark"
      fixed="top"
      collapseOnSelect={true}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("")}>FinMan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" size="sm" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate("")}
              active={window.location.pathname === "/"}
              eventKey="dashboard"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("categoryList")}
              active={window.location.pathname === "/categoryList"}
              eventKey="categoryList"
            >
              Categories
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
