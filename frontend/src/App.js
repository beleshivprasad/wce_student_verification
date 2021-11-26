import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import BHeader from "./components/Header/BHeader";
import THeader from "./components/Header/THeader";
import LandingPage from "./screens/LandingPage/LandingPage";
import VerifyStudent from "./screens/VerifyStudent/VerifyStudent";
import AboutUs from "./screens/AboutUs/AboutUs";
import ContactUs from "./screens/ContactUs/ContactUs";
import Order from "./screens/Order/Order";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import AddStudentCourse from "./screens/StudentCRUD/AddStudentCourse";
import AddStudent from "./screens/StudentCRUD/AddStudent";
import ReadStudentCourse from "./screens/StudentCRUD/ReadStudentCourse";
import ReadStudentList from "./screens/StudentCRUD/ReadStudentList";
import UpdateStudent from "./screens/StudentCRUD/UpdateStudent";
import DeleteStudent from "./screens/StudentCRUD/DeleteStudent";
import TranscriptStatus from "./screens/TranscriptStatus/TranscriptStatus";
import OrderStatus from "./screens/Order/OrderStatus";
import DeleteCourse from "./screens/StudentCRUD/DeleteCourse";
import VerificationStatus from "./screens/VerifyStudent/VerificationStatus";

const App = () => {
  return (
    <BrowserRouter>
      <THeader></THeader>
      <BHeader></BHeader>
      <main>
        <Route path="/" exact>
          <LandingPage></LandingPage>
        </Route>
        <Route path="/verify" exact>
          <VerifyStudent></VerifyStudent>
        </Route>
        <Route path="/verificationhistory">
          <VerificationStatus></VerificationStatus>
        </Route>
        <Route path="/order" exact>
          <Order></Order>
        </Route>
        <Route path="/orderstatus" exact>
          <OrderStatus></OrderStatus>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="/about">
          <AboutUs></AboutUs>
        </Route>
        <Route path="/contact" exact>
          <ContactUs></ContactUs>{" "}
        </Route>
        <Route path="/addstudent" exact>
          <AddStudent></AddStudent>{" "}
        </Route>
        <Route path="/addcourse" exact>
          <AddStudentCourse></AddStudentCourse>{" "}
        </Route>
        <Route path="/deletecourse" exact>
          <DeleteCourse></DeleteCourse>{" "}
        </Route>
        <Route path="/update" exact>
          <UpdateStudent></UpdateStudent>{" "}
        </Route>
        <Route path="/delete" exact>
          <DeleteStudent></DeleteStudent>{" "}
        </Route>
        <Route path="/viewstudentlist" exact>
          <ReadStudentList></ReadStudentList>{" "}
        </Route>
        <Route path="/viewstudentcourse" exact>
          <ReadStudentCourse></ReadStudentCourse>{" "}
        </Route>
        <Route path="/transcriptstatus" exact>
          <TranscriptStatus></TranscriptStatus>{" "}
        </Route>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
