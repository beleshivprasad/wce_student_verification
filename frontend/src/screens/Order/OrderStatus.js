import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Table } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";
import jspdf from "jspdf";
import "jspdf-autotable";

const TranscriptStatus = () => {
  const [str, setStr] = useState("");
  const [str2, setStr2] = useState("");
  const [prn, setPrn] = useState("");
  const [year, setYear] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  const userData = JSON.parse(userInfo);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      setError("Login First");
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
        setLoading(true);

        const { data } = await axios.post(
          "/transcript/viewtranscript",
          {},
          config
        );
        setTranscript(data);

        setLoading(false);
        setTimeout(() => {
          setSuccess(false);
          setError(false);
        }, 3000);
      } catch (error) {
        setError(error.response.data.message);
        setTranscript([]);
        setLoading(false);
        setTimeout(() => {
          setSuccess(false);
          setError(false);
        }, 3000);
      }
    }
  };

  const deleteTranscript = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      setLoading(true);
      console.log(str, "shiv");

      const { data } = await axios.post(
        `/transcript/deletetranscript/${str}`,
        {},
        config
      );
      if (data.length === 0) {
        setSuccess("Order Canceled");
        setTranscript([]);
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

  const downloadTranscript = async () => {
    try {
      var p = str2.substring(0, 14);
      var y = str2.substring(15, 18);
      setPrn(p);
      setYear(y);
      console.log(prn, year);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.post("/student/getcourse", { prn }, config);
      setTimeout(() => {
        let course = [];
        let course_1 = [];
        data[0].forEach((item) => {
          if (item.year === year) {
            for (const [key, value] of Object.entries(item)) {
              // console.log(`${(key, value)}`);
              course_1.push(value);
            }
          }
          // console.log("outside");
          if (course_1.length !== 0) {
            course.push(course_1);
          }
          course_1 = [];
        });
        var dsum = 0;
        var nsum = 0;
        var cpi = 0;
        course.forEach((item) => {
          switch (item[4]) {
            case "AA":
              nsum = nsum + 10 * item[3];
              dsum = dsum + parseInt(item[3]);
              console.log(nsum, dsum);
              break;
            case "AB":
              nsum = nsum + 9 * item[3];
              dsum = dsum + parseInt(item[3]);
              console.log(nsum, dsum);
              break;
            case "BB":
              nsum = nsum + 8 * item[3];
              dsum = dsum + parseInt(item[3]);
              console.log(nsum, dsum);
              break;
            case "BC":
              nsum = nsum + 7 * item[3];
              dsum = dsum + parseInt(item[3]);
              console.log(nsum, dsum);
              break;
            case "CC":
              nsum = nsum + 6 * item[3];
              dsum = dsum + parseInt(item[3]);
              console.log(nsum, dsum);
              break;
            case "CD":
              nsum = nsum + 5 * item[3];
              dsum = dsum + parseInt(item[3]);
              console.log(nsum, dsum);
              break;
            case "DD":
              nsum = nsum + 4 * item[3];
              dsum = dsum + parseInt(item[3]);
              console.log(nsum, dsum);
              break;
            case "FF":
              nsum = nsum + 0 * item[3];
              dsum = dsum + parseInt(item[3]);
              console.log(nsum, dsum);
              break;
            default:
              break;
          }
        });
        cpi = nsum / dsum;
        cpi = cpi.toFixed(2);
        let cpi_data = ["", "", "", "CPI", `${cpi}`];
        let temp = [];
        course.push(temp);
        course.push(cpi_data);
        const doc = new jspdf();
        doc.autoTable({
          head: [
            [
              "Full Name : ",
              `${data[1][0].fname} ${data[1][0].lname}`,
              "PRN Number : ",
              `${prn}`,
              "",
            ],
            [
              "Branch : ",
              `${data[1][0].branch}`,
              "Programme : ",
              "Bachelor of Technology",
              "",
            ],
            ["Year", "Course Name", "Course Code", "Credit", "Grade"],
          ],
          body: course,
        });
        doc.save("table.pdf");
        setLoading(false);
      }, 2000);

      // console.log(data[0][0]);->course ->first course
      // console.log(data[1][0]); ->student->get first array with details like name

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
    <MainScreen title="Transcript Order Status">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Button variant="dark" className="button" onClick={submitHandler}>
        Refresh
      </Button>
      <Table striped bordered hover id="print">
        <thead>
          <tr>
            <th>Sr. NO.</th>
            <th>Student First Name</th>
            <th>Student Last Name</th>
            <th>Year</th>
            <th>Requested Student PRN</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transcript.map((it, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{it.fname}</td>
                <td>{it.lname}</td>
                <td>{it.year}</td>
                <td>{it.prn}</td>
                <td>{it.status ? "Approved" : "Pending"}</td>
                <td>
                  {it.status ? (
                    <Button
                      value={`${it.prn}/${it.year}`}
                      onClick={(e) => {
                        setStr2(e.target.value);
                        setTimeout(() => {
                          downloadTranscript();
                          setLoading(false);
                        }, 1000);
                      }}
                    >
                      Download
                    </Button>
                  ) : (
                    <Button
                      value={`${it.prn}/${it.year}`}
                      onClick={(e) => {
                        setLoading(true);
                        setStr(e.target.value);
                        setTimeout(() => {
                          deleteTranscript();
                          setLoading(false);
                        }, 100);
                      }}
                    >
                      Cancel Request
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
          <td></td>
        </tbody>
      </Table>
    </MainScreen>
  );
};

export default TranscriptStatus;
