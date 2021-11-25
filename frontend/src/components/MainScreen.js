import React from "react";
import { Container, Row } from "react-bootstrap";
import './MainScreen.css'

const MainScreen = ({ title, student,children }) => {
  return (
    <div className="mainBack">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title} {student}</h1>
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
