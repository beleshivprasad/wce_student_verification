import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./student.css";
import SuccessMessage from "../../components/SuccessMessage";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/Loading";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ReadStudentList = () => {
  const [branch, setBranch] = useState("");
  const [prn, setPrn] = useState("");
  const [error, setError] = useState(false);
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
      const { data } = await axios.post(
        "/student/view",
        {
          branch,
          prn,
        },
        config
      );
      setLoading(false);
      setStudent(data);
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


  return (
    <MainScreen title="All Student Data">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setBranch(e.target.value);
              }}
            >
              <option>Select Branch</option>
              <option value="Computer Science and Engineering">
                Computer Science and Engineering
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Electronics Engineering">
                Electronics Engineering
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
            </Form.Select>
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Button variant="dark" type="submit" className="button">
            Get Students
          </Button>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr. NO.</th>
            <th>PRN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>
          {student.map((item, index) => {
            return (
              <tr>
                <td>{index}</td>
                <td>
                  <Link
                    to={`/viewstudentcourse/${item.prn}`}
                  >
                    {item.prn}
                  </Link>
                </td>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.branch}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </MainScreen>
  );
};

export default ReadStudentList;
