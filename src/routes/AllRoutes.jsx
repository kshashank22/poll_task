import React from "react";
import LogIn from "../components/login/LogIn";
import SignUp from "../components/signup/SignUp";
import { Route, Routes } from "react-router-dom";
import AdminPoll from "../components/adminpoll/AdminPoll";
import EachDataPoll from "../components/eachdatapoll/EachDataPoll";
import EditPoll from "../components/editpoll/EditPoll";
import AddOptionPoll from "../components/addoptionpoll/AddOptionPoll";
import AddPoll from "../components/addpoll/AddPoll";
import UserPoll from "../components/userpoll/UserPoll";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route exact path="/adminpoll" element={<AdminPoll />}></Route>
      <Route exact path="/addpoll" element={<AddPoll />}></Route>
      <Route exact path="/eachpoll" element={<EachDataPoll />}></Route>
      <Route
        exact
        path="/edittitle/:edittitleId"
        element={<EditPoll />}
      ></Route>
      <Route
        exact
        path="/addoption/:addoptionId"
        element={<AddOptionPoll />}
      ></Route>
      <Route exact path="/userpoll" element={<UserPoll />}></Route>
    </Routes>
  );
}

export default AllRoutes;
