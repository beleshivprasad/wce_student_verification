import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <MainScreen title="">
      <Container className="about">
        <Row>
          <h1>Our Mission</h1>
          <h4>To provide correct and useful information about the students</h4>
        </Row>
        <Row>
          <h1>About</h1>
          <h5>
            We are WCE Student Verification Services.We provide services to for
            verifying student information i.e. academic details.This platform is
            very useful to Recruiters, Universities, Banks , Governments who
            need student's data for their purpose which may be of candidate
            hiring or giving admission to student or giving loan to student for
            further education or Governments for the scholarship purpose
          </h5>

          <hr></hr>
        </Row>
        <Row className="items">
          <Col className="item">
            <i className="icons fas fa-poll-h fa-10x"></i>
            <h4>We Provide Transcript of Students</h4>
          </Col>
          <Col className="item">
            <i className="icons fas fa-user-check fa-10x"></i>
            <h4>We Verify the Student Information</h4>
          </Col>
          <Col className="item">
            <i className="icons fas icons fa-lock fa-10x"></i>
            <h4>We Provide Fast and Secure Platform</h4>
          </Col>
        </Row>
      </Container>
    </MainScreen>
  );
};

export default AboutUs;
