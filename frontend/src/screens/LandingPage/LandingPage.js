import React from "react";
import { Carousel, Container } from "react-bootstrap";
import Carousel1 from "./carousel1.jpg";
import Carousel2 from "./carousel2.jpg";
import Carousel3 from "./carousel3.jpg";
import "./LandingPage.css";

const LandingPage = () => {

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");

  //   if (userInfo) {
  //     history.push("/register");
  //   }
  // }, [history]);




  return (
    <div className="main">
      <Container fluid className="carousel">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={Carousel3} alt="First slide" />
            <Carousel.Caption>
              <h2>WCE Student Verification Services</h2>
              <p>Welcome to our Website.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={Carousel2} alt="Second slide" />

            <Carousel.Caption>
              <h2>WCE Student Verification Services</h2>
              <p>One safe place to verify student information.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={Carousel1} alt="Third slide" />

            <Carousel.Caption>
              <h2>WCE Student Verification Services</h2>
              <p>You can order transcript of student very quick.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Container fluid></Container>
      </Container>
    </div>
  );
};

export default LandingPage;
