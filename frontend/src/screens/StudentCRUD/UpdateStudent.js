import React from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";

const UpdateStudent = () => {
  const [prn, setPrn] = useState("");
  const [year, setYear] = useState("");
  const [coursecode, setCoursecode] = useState("");
  const [grade, setGrade] = useState("");
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
      const { data } = await axios.put(
        "/student/updatecourse",
        {
          prn,
          year,
          coursecode,
          grade,
        },
        config
      );
      setLoading(false)
      setSuccess(data.msg);
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
    <MainScreen title="Update Course">
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
        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setYear(e.target.value)}
          >
            <option>Select Year</option>
            <option value="FY">First Year</option>
            <option value="SY">Second Year</option>
            <option value="TY">Third Year</option>
            <option value="LY">Final Year</option>
          </Form.Select>
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label>Course Code</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setCoursecode(e.target.value);
            }}
          >
            <option>Select Course Code</option>
            <option value="4CH103">4CH103</option>
            <option value="4MA101">4MA101</option>
            <option value="4AM102">4AM102</option>
            <option value="4CV101">4CV101</option>
            <option value="4ME102">4ME102</option>
            <option value="4BS101">4BS101</option>
            <option value="4CH151">4CH151</option>
            <option value="4CV151">4CV151</option>
            <option value="4ME152">4ME152</option>
            <option value="4PH103">4PH103</option>
            <option value="4MA102">4MA102</option>
            <option value="4ME101">4ME101</option>
            <option value="4EL101">4EL101</option>
            <option value="4EN101">4EN101</option>
            <option value="4HS101">4HS101</option>
            <option value="4PH151">4PH151</option>
            <option value="4EN151">4EN151</option>
            <option value="4CS153">4CS153</option>
            <option value="4CS201">4CS201</option>
            <option value="4CS202">4CS202</option>
            <option value="4CS203">4CS203</option>
            <option value="4CS204">4CS204</option>
            <option value="4CS205">4CS205</option>
            <option value="4HS203">4HS203</option>
            <option value="4CS251">4CS251</option>
            <option value="4CS252">4CS252</option>
            <option value="4CS253">4CS253</option>
            <option value="4HS201">4HS201</option>
            <option value="4CS221">4CS221</option>
            <option value="4CS222">4CS222</option>
            <option value="4CS223">4CS223</option>
            <option value="4CS224">4CS224</option>
            <option value="4CS225">4CS225</option>
            <option value="4CS271">4CS271</option>
            <option value="4CS272">4CS272</option>
            <option value="4CS273">4CS273</option>
            <option value="4OE301">4OE301</option>
            <option value="4HS307">4HS307</option>
            <option value="4CS301">4CS301</option>
            <option value="4CS302">4CS302</option>
            <option value="4CS311">4CS311</option>
            <option value="4CS351">4CS351</option>
            <option value="4CS352">4CS352</option>
            <option value="4CS353 ">4CS353 </option>
            <option value="4CS354 ">4CS354</option>
            <option value="4OE312">4OE312</option>
            <option value="4HS313">4HS313</option>
            <option value="4CS321">4CS321</option>
            <option value="4CS322">4CS322</option>
            <option value="4CS322">4CS322</option>
            <option value="4CS323">4CS323</option>
            <option value="4CS371">4CS371</option>
            <option value="4CS341">4CS341</option>
          </Form.Select>
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label>Grade</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          >
            <option>Select Grade</option>
            <option value="AA">AA</option>
            <option value="AB">AB</option>
            <option value="BB">BB</option>
            <option value="BC">BC</option>
            <option value="CC">CC</option>
            <option value="CD">CD</option>
            <option value="DD">DD</option>
            <option value="FF">FF</option>
          </Form.Select>
        </Form.Group>
        <br></br>
        <Button variant="dark" type="submit">
          Update
        </Button>
      </Form>
    </MainScreen>
  );
};

export default UpdateStudent;
