import React from "react";
import "./DataLists.css";
import { dispatch } from "../../redux/store/store";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteOption } from "../../redux/reducers/deleteOptionSlice";
import { deletePoll } from "../../redux/reducers/deleteSlice";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchedData } from "../../redux/reducers/pollSlice";
import { resetReducer } from "../../redux/reducers/deleteOptionSlice";
import { resetReducers } from "../../redux/reducers/deleteSlice";

const DataLists = ({ values, onclick }) => {
  const optionSuccess = useSelector(
    (state) => state.deleteOptionSlice.isSuccess
  );
  const pollSuccess = useSelector((state) => state.deleteSlice.isSuccess);

  if (optionSuccess) {
    dispatch(fetchedData());
    dispatch(resetReducer());
  }

  if (pollSuccess) {
    dispatch(fetchedData());
    dispatch(resetReducers());
  }

  const handleDeleteOption = (id, opt) => {
    if (values.options.length < 2) {
      dispatch(deletePoll(id));
    } else {
      dispatch(deleteOption(id, opt));
    }
  };

  const handleDelete = (id) => {
    dispatch(deletePoll(id));
  };

  return (
    <li className="listContainer">
      <div className="titleContainer">
        <h1 className="title" onClick={onclick}>
          {values.title}
        </h1>
        <div className="iconsContainer">
          {values.options.length < 4 && (
            <NavLink to={`/addoption/${values._id}`} state={values.title}>
              <AddIcon className="icons" />
            </NavLink>
          )}
          <NavLink to={`/edittitle/${values._id}`} state={values.title}>
            <EditIcon className="icons" />
          </NavLink>

          <DeleteIcon
            className="icons"
            onClick={() => handleDelete(values._id)}
          />
        </div>
      </div>

      <ul className="options">
        {values.options.map((each) => (
          <div key={each.option} className="optionContainer">
            <li className="option">{each.option}</li>
            <div className="voteContainer">
              <label className="vote">votes:{each.vote}</label>
              <div>
                <DeleteIcon
                  className="deleteIcon"
                  onClick={() => handleDeleteOption(values._id, each.option)}
                />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </li>
  );
};

export default DataLists;
