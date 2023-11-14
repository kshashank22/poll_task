import React, { useEffect } from "react";
import LogIn from "../components/login/LogIn";
import SignUp from "../components/signup/SignUp";
import { Route, Routes } from "react-router-dom";
import AdminPoll from "../components/adminpoll/AdminPoll";
import EachDataPoll from "../components/eachdatapoll/EachDataPoll";
import EditPoll from "../components/editpoll/EditPoll";
import AddOptionPoll from "../components/addoptionpoll/AddOptionPoll";
import AddPoll from "../components/addpoll/AddPoll";
import UserPoll from "../components/userpoll/UserPoll";
import Private from "./PrivateRoute";
import { useSelector } from "react-redux";

function AllRoutes() {
  const loginSlice = useSelector((state) => state.loginSlice);

  useEffect(() => {
    localStorage.getItem("token");
    localStorage.getItem("role");
  }, [loginSlice.isSuccess]);
  return (
    <Routes>
      <Route path="/" element={<LogIn />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route
        exact
        path="/adminpoll"
        element={
          <Private
            login={
              localStorage.getItem("token") &&
              localStorage.getItem("role") === "Admin"
            }
          >
            <AdminPoll />
          </Private>
        }
      ></Route>
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
      <Route
        exact
        path="/userpoll"
        element={
          <Private
            login={
              localStorage.getItem("token") &&
              localStorage.getItem("role") === "Guest"
            }
          >
            <UserPoll />
          </Private>
        }
      ></Route>
    </Routes>
  );
}

export default AllRoutes;
