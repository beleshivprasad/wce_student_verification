import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Table } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/errorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";

const VerificationStatus = () => {
  const [verification, setVerification] = useState([]);
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

      const { data } = await axios.post("/verification/gethistory", {}, config);

      setVerification(data);
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
            {userData.isAdmin ? <th>User</th> : <></>}
            <th>Student First Name</th>
            <th>Student Last Name</th>
            <th>PRN</th>
            <th>CPI</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {verification.map((it, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                {userData.isAdmin ? <td>{it.user}</td> : <></>}
                <td>{it.fname}</td>
                <td>{it.lname}</td>
                <td>{it.prn}</td>
                <td>{it.cpi}</td>
                <td>{it.status ? "Successful" : "Failed"}</td>
              </tr>
            );
          })}
          <td></td>
        </tbody>
      </Table>
    </MainScreen>
  );
};

export default VerificationStatus;
