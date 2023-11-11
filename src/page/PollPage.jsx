import React from "react";
import "./PollPage.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "../routes/AllRoutes";

function PollPage() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default PollPage;
