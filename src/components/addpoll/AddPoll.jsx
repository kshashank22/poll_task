import React, { useState } from "react";
import { dispatch } from "../../redux/store/store";
import { TextField, CircularProgress } from "@mui/material";
import Button from "../button/Button";
import "./AddPoll.css";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { fetchedData } from "../../redux/reducers/pollSlice";
import { addPoll, resetReducer } from "../../redux/reducers/addPollSlice";
import { useNavigate } from "react-router-dom";

const AddPoll = ({
  addNewPoll,
  setAddNewPoll,
  newTitle,
  setNewTitle,
  newOptions,
  setNewOptions,
}) => {
  const loading = useSelector((state) => state.addPollSlice.isLoading);
  const status = useSelector((state) => state.addPollSlice.isSuccess);

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (newOptions.length > 3) {
      setError(true);
    } else {
      setNewOptions([...newOptions, { option: "" }]);
    }
  };

  const newOptionsList = [];

  if (status) {
    setNewOptions([{ option: "" }]);
    setNewTitle("");
    setAddNewPoll(!addNewPoll);
    dispatch(fetchedData());
    dispatch(resetReducer());
    navigate("/adminpoll");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const condition = newOptions.every((each) => each.option !== "");
    if (newTitle !== "" && condition) {
      newOptions.map((each) => newOptionsList.push(each.option));
      dispatch(addPoll(newTitle, newOptionsList));
    }
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const onChangeValue = [...newOptions];
    onChangeValue[index][name] = value;
    setNewOptions(onChangeValue);
  };

  const updatedInput = (event) => {
    if (event.target.value !== " ") {
      setNewTitle(event.target.value);
    }
  };

  const handleClose = () => {
    setError(false);
  };

  const handleHome = () => {
    setNewOptions([{ option: "" }]);
    setNewTitle("");
    setAddNewPoll(!addNewPoll);
  };

  return (
    <div className="addPollContainer">
      <div className="pollContainer">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <p className="addText">Title:</p>
            <TextField
              type="text"
              className="text"
              name="newTitle"
              id="newTitle"
              value={newTitle}
              onChange={updatedInput}
            />
          </div>

          {newOptions.map((each, index) => (
            <div key={index} className="optionsContainer">
              <p className="addText">option {index+1}:</p>
              <TextField
                className="text"
                name="option"
                type="text"
                value={each.option}
                onChange={(event) => handleChange(event, index)}
              />
            </div>
          ))}

          <AddIcon onClick={handleClick} className="addOption" />

          {error && (
            <div className="error">
              <p>Maximum 4 options are allowed!</p>
              <CloseIcon className="close" onClick={handleClose} />
            </div>
          )}

          <div className="buttonContainer">
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Button
                value={"submit"}
                type={"submit"}
                classname={"buttonStyle"}
                onclick={handleSubmit}
              />
            )}
          </div>
          <div className="buttonContainer">
            <Button
              value={"Back to home"}
              classname={"buttonStyle"}
              onclick={handleHome}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPoll;
