import React, { useState } from "react";
import "../datalists/DataLists.css";
import { dispatch } from "../../redux/store/store";
import { vote } from "../../redux/reducers/votePollSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataLists = ({ values, onclick }) => {
  const [userId, setUserId] = useState(null);

  const handleClick = (id, option) => {
    const token = localStorage.getItem("token");
    const header = {
      headers: {
        access_token: token,
      },
    };
    dispatch(vote(id, option, header));
    setUserId(id);
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
                disabled={values._id === userId}
              />
            </div>
          </div>
        ))}
      </ul>
    </li>
  );
};

export default DataLists;
