import React from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";

const AddStudent = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [prn, setPrn] = useState("");
  const [branch, setBranch] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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
        "/student/add",
        {
          fname,
          lname,
          prn,
          dob,
          branch,
        },
        config
      );
      if (data.prn === prn) {
        setSuccess("Student Added Successfully");
      }
      localStorage.setItem("studentInfo", JSON.stringify(data));
      setLoading(false);
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
    <MainScreen title="Add Student">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={fname}
            onChange={(e) => {
              setFname(e.target.value);
            }}
            placeholder="Enter First Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lname}
            onChange={(e) => {
              setLname(e.target.value);
            }}
            placeholder="Enter Last Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>PRN</Form.Label>
          <Form.Control
            type="text"
            value={prn}
            onChange={(e) => {
              setPrn(e.target.value);
            }}
            placeholder="PRN"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Branch</Form.Label>
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
        </Form.Group>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>DOB</Form.Label>
          <Form.Control
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
            placeholder="Enter Date of Birth"
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Add Student
        </Button>
      </Form>
    </MainScreen>
  );
};

export default AddStudent;
