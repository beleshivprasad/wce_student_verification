import React from "react";
import { Form, Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loading from "../../components/Loading";
import axios from "axios";
import { useState } from "react";

const DeleteCourse = () => {
  const [prn, setPrn] = useState("");
  const [coursecode, setCoursecode] = useState("");
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
        "/student/deletecourse",
        {
          prn,
          coursecode,
        },
        config
      );
      setLoading(false);
      console.log(data[0]);

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
    <MainScreen title="Delete Student Course">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="">
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
        <Button variant="dark" type="submit">
          Delete
        </Button>
      </Form>
    </MainScreen>
  );
};

export default DeleteCourse;
