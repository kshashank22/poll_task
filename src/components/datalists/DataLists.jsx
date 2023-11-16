import React from "react";
import "./DataLists.css";
import { dispatch } from "../../redux/store/store";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteOption } from "../../redux/reducers/deleteOptionSlice";
import { deletePoll } from "../../redux/reducers/deleteSlice";
import { NavLink } from "react-router-dom";

const DataLists = ({ values, onclick }) => {
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
