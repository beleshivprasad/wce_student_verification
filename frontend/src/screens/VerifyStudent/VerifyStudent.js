import React from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect,useState } from "react";


const VerifyStudent = () => {
  const [data, setData] = useState([]);

  const getStudent = async () => {
    let { info } = await axios.get("/verify");
    console.log(info);
    setData(info)
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <MainScreen title="Verify Student " student="Diploma">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter First Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>PRN</Form.Label>
          <Form.Control type="text" placeholder="PRN" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>CPI</Form.Label>
          <Form.Control type="text" placeholder="Enter CGPA" />
        </Form.Group>

        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </MainScreen>
  );
};

export default VerifyStudent;
