import React, { useState, useEffect } from "react";
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

  const [newOptionsList, setNewOptionsList] = useState([]);
  const [error, setError] = useState(false);
  const [optionError, setOptionError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      setNewOptions([{ option: "" }]);
      setNewTitle("");
      setAddNewPoll(!addNewPoll);
      dispatch(fetchedData());
      dispatch(resetReducer());
      navigate("/adminpoll");
    }
  }, [status]);

  const handleClick = () => {
    if (newOptions.length > 3) {
      setError(true);
    } else {
      setNewOptions([...newOptions, { option: "" }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = newOptions.map((e) => e.option);
    const setData = [...new Set(data)];
    const condition = newOptions.every((each) => each.option !== "");
    if (data.length === setData.length) {
      if (newTitle !== "" && condition) {
        newOptions.map((each) =>
          setNewOptionsList(newOptionsList.push(each.option))
        );
        dispatch(addPoll(newTitle, newOptionsList));
      }
    } else {
      setOptionError(true);
    }
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const onChangeValue = [...newOptions];
    onChangeValue[index][name] = value.trim();
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

  const handleCloseOption = () => {
    setOptionError(false);
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
              <p className="addText">option {index + 1}:</p>
              <TextField
                className="text"
                name="option"
                type="text"
                value={each.option}
                onChange={(event) => handleChange(event, index)}
                error={!each.option}
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
            <Button
              value={
                loading ? (
                  <CircularProgress size="1rem" color="inherit" />
                ) : (
                  "Submit"
                )
              }
              type={"submit"}
              classname={"buttonStyle"}
              onclick={handleSubmit}
            />
          </div>
          <div className="buttonContainer">
            <Button
              value={"Back To Home"}
              classname={"buttonStyle"}
              onclick={handleHome}
            />
          </div>
          {optionError && (
            <div className="error">
              <p>Duplicate option is not allowed!!</p>
              <CloseIcon className="close" onClick={handleCloseOption} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPoll;
