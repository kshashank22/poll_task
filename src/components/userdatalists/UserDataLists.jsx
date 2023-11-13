import React, { useState } from "react";
import "../datalists/DataLists.css";
import { Radio } from "@mui/material";
import { dispatch } from "../../redux/store/store";
import { vote } from "../../redux/reducers/votePollSlice";

const DataLists = ({ values, onclick }) => {
  const [userId, setUserId] = useState(null);

  const handleClick = (id, option) => {
    const token = localStorage.getItem("token");
    const headers = {
      access_token: token,
    };
    console.log(headers)
    dispatch(vote(id, option, headers));
    setUserId(id);
    // alert("Thank you for voting")
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
              <input
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

//userOption size="small"
