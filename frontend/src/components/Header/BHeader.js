import React from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const userInfo = localStorage.getItem("userInfo");
  const data = JSON.parse(userInfo) || {};
  const admin = data.isAdmin;

  return (
    <>
      {!admin ? (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto">
                <Nav.Link>
                  <Link to="/">Home</Link>
                </Nav.Link>

                <NavDropdown
                  title="Verification Services"
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link to="/verify">Verify Degree </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/verificationhistory">Verification History </Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Transcript Services"
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link to="/order">Order Transcript </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/orderstatus">Transcript Order Status</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link>
                  <Link to="/about">About Us</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/contact"> Contact Us </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto">
                <Nav.Link>
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link></Nav.Link>
                <NavDropdown
                  title="Transcript and Verification"
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link to="/transcriptstatus">Transcript Status</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/verificationhistory">Verification Status</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="View Student" id="collapsible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/viewstudentlist">View Student Data</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/viewstudentcourse">
                      View Student Course Data
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Manage Student Details"
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link to="/addstudent">Add Student</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/delete">Delete Student </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Manage Course Details "
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link to="/addcourse">Add Course </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/update">Update Course</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/deletecourse">Delete Course </Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link>
                  <Link to="/about">About Us</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/contact"> Contact Us </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
