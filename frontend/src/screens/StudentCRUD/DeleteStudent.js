import React from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loading from "../../components/Loading";

const DeleteStudent = () => {
  const [prn, setPrn] = useState("");
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
        "/student/delete",
        {
          prn,
        },
        config
      );
      setLoading(false);
      setSuccess(data.msg)

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
    <MainScreen title="Delete Student">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
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

        <Button variant="dark" type="submit">
          Delete
        </Button>
      </Form>
    </MainScreen>
  );
};

export default DeleteStudent;
