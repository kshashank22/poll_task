import React, { useState } from "react";
import "../datalists/DataLists.css";
import { dispatch } from "../../redux/store/store";
import { vote } from "../../redux/reducers/votePollSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const DataLists = ({ values, onclick, setGuestId }) => {
  const votePoll = useSelector((state) => state.votePollSlice);

  const handleClick = (id, option) => {
    const token = localStorage.getItem("token");
    const header = {
      headers: {
        access_token: token,
      },
    };
    dispatch(vote(id, option, header));
    setGuestId(id);
    toast.success("Thank you for voting", {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });
  };

  return (
    <li className="listContainer">
      <div className="titleContainer">
        <h1 className="title" onClick={onclick}>
          {values.title}
        </h1>
      </div>
      <ul className="options">
        {values.options.map((each) => (
          <div key={each.option} className="optionContainer">
            <li className="option">{each.option}</li>
            <div className="voteContainer">
              <ToastContainer />
              <input
                className="radio"
                type="radio"
                name={values._id}
                onClick={() => handleClick(values._id, each.option)}
                disabled={JSON.parse(localStorage.getItem(`${values._id}`))}
              />
            </div>
          </div>
        ))}
      </ul>
    </li>
  );
};

export default DataLists;
