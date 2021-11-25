import React from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./student.css";
import SuccessMessage from "../../components/SuccessMessage";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/Loading";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";

const ReadStudentCourse = () => {
  const [prn, setPrn] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const userInfo = localStorage.getItem("userInfo");
  const userData = JSON.parse(userInfo);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.post("/student/getcourse", { prn }, config);
      setLoading(false);
      setStudent(data);
      console.log(data)
      setShow(true);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
    }
  };

  var renderCourse = (it, ind) => {
    return (
      <tr>
        <td>{ind + 1}</td>
        <td>{it.year}</td>
        <td> {it.coursecode} </td>
        <td> {it.coursename} </td>
        <td> {it.credit} </td>
        <td> {it.grade} </td>
      </tr>
    );
  };

  return (
    <MainScreen title="Student Course Data">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Enter PRN"
            value={prn}
            onChange={(e) => {
              setPrn(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="button">
          Get Student Course Data
        </Button>
      </Form>
      <br></br>
      {show && (
        <>
          <Container>
            <Row>
              First Name : <Col>Shivprasad</Col>
              Last Name : <Col>Bele</Col>
            </Row>
            <Row>
              PRN : <Col>2018BTECS00092</Col>
            </Row>
            <Row>
              Branch : <Col>Computer Science and Engineering</Col>
            </Row>
            <Row>
              Program : <Col>Bachelor of Technology</Col>
            </Row>
            <Row>
              Date of Birth : <Col>04/01/2000</Col>
            </Row>
          </Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr. NO.</th>
                <th>Year</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>{student?.map(renderCourse)}</tbody>
          </Table>
        </>
      )}
    </MainScreen>
  );
};

export default ReadStudentCourse;
