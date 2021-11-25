import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Table } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";

const TranscriptStatus = () => {
  const [prn, setPrn] = useState("");
  const [transcript, setTranscript] = useState([]);
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
        "/transcript/viewtranscript",
        {},
        config
      );

      setPrn(data[0].prn);
      setTranscript(data);
      console.log(prn);
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

  const deleteTranscript = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        `/transcript/deletetranscript/${prn}`,
        {},
        config
      );
      if (data.length == 0) {
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
    
  }
  return (
    <MainScreen title="Transcript Order Status">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {success && <SuccessMessage variant="success">{success}</SuccessMessage>}
      {loading && <Loading></Loading>}
      <Button variant="dark" className="button" onClick={submitHandler}>
        Refresh
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr. NO.</th>
            <th>Requested By</th>
            <th>Requested Student Name</th>
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
                <td>{it.prn}</td>
                <td>{it.status ? "Approved" : "Pending"}</td>
                <td>
                  {it.status ? (
                    <Button onClick={() => {
                      downloadTranscript();
                    }}  >Download</Button>
                  ) : (
                    <Button
                      onClick={() => {
                        deleteTranscript();
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
