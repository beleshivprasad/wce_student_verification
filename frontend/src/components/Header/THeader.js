import React from "react";
import { NavDropdown, Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const TopHeader = () => {
  const userInfo = localStorage.getItem("userInfo");
  const history = useHistory();
  const data = JSON.parse(userInfo)
  



  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          WCE Student Information Verification Services
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          {userInfo && (
            <NavDropdown
              title={data.name}
              id="collapsible-nav-dropdown"
              style={{ color: "black" }}
            >
              <NavDropdown.Item>
                <Link
                  to=""
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    history.push("/login");
                    window.location.reload(true);
                  }}
                >
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {!userInfo && (
            <Nav>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/register">Register</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopHeader;
