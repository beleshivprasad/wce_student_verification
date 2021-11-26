import React from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loading from "../../components/Loading";

const VerifyStudent = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [prn, setPrn] = useState("");
  const [cpi, setCpi] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  const userData = JSON.parse(userInfo);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userInfo) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
        setLoading(true);

        const { data } = await axios.post(
          "/verification/verify",
          {
            fname,
            lname,
            prn,
            cpi,
          },
          config
        );
        if (data.isVerified) {
          saveVerificationHistory();
          setStatus(data.isVerified);
          setSuccess("Student Verification Successful");
          setTimeout(() => {
            setSuccess(false);
            setError(false);
          }, 3000);
        } else {
          saveVerificationHistory();
          setStatus(data.isVerified);

          setError("Student Verification Failed");
          setTimeout(() => {
            setSuccess(false);
            setError(false);
          }, 3000);
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
    } else {
      setError("Login First");
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
    }
  };

  const saveVerificationHistory = async () => {
    console.log(status);
    if (userInfo) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
        setLoading(true);

        const { data } = await axios.post(
          "/verification/savehistory",
          {
            fname,
            lname,
            prn,
            cpi,
            status,
          },
          config
        );
        console.log(data);

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
    } else {
      setError("Login First");
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
    }
  };

  return (
    <MainScreen title="Verify Student " student="Diploma">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Text>Please Enter Data Carefully</Form.Text>
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

export default VerifyStudent;
