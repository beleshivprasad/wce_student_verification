import Loading from "../../components/Loading";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";

const AddStudentCourse = () => {
  const [prn, setPrn] = useState("");
  const [year, setYear] = useState("");
  const [found, setFound] = useState(false);
  const [coursecode, setCoursecode] = useState("");
  const [coursename, setCoursename] = useState("");
  const [grade, setGrade] = useState("");
  const [credit, setCredit] = useState("");
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
        "/student/addcourse",
        {
          prn,
          year,
          coursecode,
          coursename,
          grade,
          credit,
        },
        config
      );
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
      setLoading(false);
      console.log(data[0]);
      if (data[0].length !== 0) {
        setSuccess("Added Successfully");
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
    }
  };

  const checkStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await axios.post("/student/check", { prn }, config);
      if (data[0].length !== 0) {
        setFound(true);
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
    <MainScreen title="Add Student Course">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="PRN">
          <Form.Label>PRN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PRN to Continue"
            value={prn}
            onChange={(e) => {
              setPrn(e.target.value);
            }}
          />
        </Form.Group>
        {!found && (
          <>
            <Button variant="dark" onClick={checkStudent}>
              Continue
            </Button>
          </>
        )}
        {found && (
          <>
            {" "}
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setYear(e.target.value);
                }}
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
              <Form.Label>Course Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setCoursename(e.target.value);
                }}
              >
                <option>Select Course Name</option>
                <option value="Chemistry for Computer Professionals">
                  Chemistry for Computer Professionals
                </option>
                <option value="Engineering Mathematics I">
                  Engineering Mathematics I
                </option>
                <option value="Introduction to Engineering Mechanics">
                  Introduction to Engineering Mechanics
                </option>
                <option value="Basic Civil Engineering">
                  Basic Civil Engineering
                </option>
                <option value="Engineering Graphics">
                  Engineering Graphics
                </option>
                <option value="Elective on Basic Sciences">
                  Elective on Basic Sciences
                </option>
                <option value="Engineering ChemistryLaboratory">
                  Engineering ChemistryLaboratory
                </option>
                <option value="Civil and Mechanics Laboratory">
                  Civil and Mechanics Laboratory
                </option>
                <option value="Workshop Practice">Workshop Practice</option>
                <option value="Physics for Computer Professionals">
                  Physics for Computer Professionals
                </option>
                <option value="Engineering Mathematics II">
                  Engineering Mathematics II
                </option>
                <option value="Basic Mechanical Engineering">
                  Basic Mechanical Engineering
                </option>
                <option value="Basic Electric Engineering">
                  Basic Electric Engineering
                </option>
                <option value="Basic Electronics Engineering">
                  Basic Electronics Engineering
                </option>
                <option value="English for Professional Communication">
                  English for Professional Communication
                </option>
                <option value="Engineering Physics Laboratory">
                  Engineering Physics Laboratory
                </option>
                <option value="Electronics Engineering Laboratory">
                  Electronics Engineering Laboratory
                </option>
                <option value="Computer Programming">
                  Computer Programming
                </option>
                <option value="Applied Mathematics for Computer Science and Engineering">
                  Applied Mathematics for Computer Science and Engineering
                </option>
                <option value="Discrete Mathematics">
                  Discrete Mathematics
                </option>
                <option value="Data Structures">Data Structures</option>
                <option value="Data Communication">Data Communication</option>
                <option value="Computer Organization and Architecture">
                  Computer Organization and Architecture
                </option>
                <option value="Environmental Science">
                  Environmental Science
                </option>
                <option value="Data Structures Laboratory">
                  Data Structures Laboratory
                </option>
                <option value="Computer Organization and Architecture Lab">
                  Computer Organization and Architecture Lab
                </option>
                <option value="Programming Laboratory 1">
                  Programming Laboratory 1
                </option>
                <option value="Development of Societies/Philosophy">
                  Development of Societies/Philosophy
                </option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Formal Language and Automata Theory">
                  Formal Language and Automata Theory
                </option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Database Engineering">
                  Database Engineering
                </option>
                <option value="Computer Network">Computer Network</option>
                <option value="Database Engineering Laboratory">
                  Database Engineering Laboratory
                </option>
                <option value="Computer Network Laboratory">
                  Computer Network Laboratory
                </option>
                <option value="Programming Laboratory 2">
                  Programming Laboratory 2
                </option>
                <option value="Open Elective 1">Open Elective 1</option>
                <option value="Fundamentals of Management and Economics for Engineers">
                  Fundamentals of Management and Economics for Engineers
                </option>
                <option value="Compiler Design">Compiler Design</option>
                <option value="Design and Analysis of Algorithms">
                  Design and Analysis of Algorithms
                </option>
                <option value="Professional Elective 1">
                  Professional Elective 1
                </option>
                <option value="Design and Analysis of Algorithms Laboratory">
                  Design and Analysis of Algorithms Laboratory
                </option>
                <option value="Computer Graphics Laboratory">
                  Computer Graphics Laboratory
                </option>
                <option value="Mini Project 1 ">Mini Project 1 </option>
                <option value="Programming Laboratory 3 ">
                  Programming Laboratory 3{" "}
                </option>
                <option value="Open Elective 2">Open Elective 2</option>
                <option value="Elective Foundation Course in Humanities">
                  Elective Foundation Course in Humanities
                </option>
                <option value="Distributed System and Cloud Computing">
                  Distributed System and Cloud Computing
                </option>
                <option value="Advanced Database System">
                  Advanced Database System
                </option>
                <option value="Professional Elective 2">
                  Professional Elective 2
                </option>
                <option value="Professional Electives 1 Laboratory">
                  Professional Electives 1 Laboratory
                </option>
                <option value="Advanced Database System Laboratory">
                  Advanced Database System Laboratory
                </option>
                <option value="Mini Project 2">Mini Project 2</option>
              </Form.Select>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Credit</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setCredit(e.target.value);
                }}
              >
                <option>Select Course Credit</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>

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
            <Form.Group>
              <Row>
                <Col>
                  <Button variant="dark" type="submit">
                    Add Course
                  </Button>
                </Col>
                <Col>
                  <Button variant="dark">
                    <Link to="/">Exit</Link>
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </>
        )}
      </Form>
    </MainScreen>
  );
};

export default AddStudentCourse;
