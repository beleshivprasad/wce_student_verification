import React from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <MainScreen className="contact" title="Contact">
      <Card>
        <Card.Header>Get in Touch</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Text>
                  <i class="fas fa-envelope"></i>
                  shivprasadoctomusprime@gmail.com
                </Card.Text>
                <Card.Text>
                  <i class="fas fa-map-marker-alt"></i>WCE Sangli
                </Card.Text>
              </Col>
              <Col>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={2} />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="dark" type="submit">
                      Submit
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default ContactUs;
