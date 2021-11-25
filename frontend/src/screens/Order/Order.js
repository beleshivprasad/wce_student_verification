import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";

const Order = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [prn, setPrn] = useState("");
  const [cpi, setCpi] = useState("");
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
        "/transcript/ordertranscript",
        {
          fname,
          lname,
          prn,
          dob,
          cpi,
        },
        config
      );

      if (data) {
        setSuccess("Order Initiated");
      }
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
    <MainScreen title="Order Transcript" student="">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={fname}
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lname}
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>PRN</Form.Label>
          <Form.Control
            type="text"
            placeholder="PRN"
            value={prn}
            onChange={(e) => {
              setPrn(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="DOB"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>CPI</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CGPA"
            value={cpi}
            onChange={(e) => {
              setCpi(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </MainScreen>
  );
};

export default Order;
