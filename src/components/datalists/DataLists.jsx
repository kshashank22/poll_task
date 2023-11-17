import React, { useState } from "react";
import "./DataLists.css";
import { dispatch } from "../../redux/store/store";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteOption } from "../../redux/reducers/deleteOptionSlice";
import { deletePoll } from "../../redux/reducers/deleteSlice";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const DataLists = ({ values, onclick }) => {
  const deleteOptionLoading = useSelector(
    (state) => state.deleteOptionSlice.isLoading
  );
  const deleteLoading = useSelector((state) => state.deleteSlice.isLoading);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteOptionId, setDeleteOptionId] = useState(null);
  const handleDeleteOption = (id, opt, i) => {
    if (values.options.length < 2) {
      setDeleteId(id);
      dispatch(deletePoll(id));
    } else {
      setDeleteOptionId(i);
      dispatch(deleteOption(id, opt));
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
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
            <NavLink to={`/addoption/${values._id}`} state={values}>
              <AddIcon className="icons" />
            </NavLink>
          )}
          <NavLink to={`/edittitle/${values._id}`} state={values.title}>
            <EditIcon className="icons" />
          </NavLink>
          {deleteLoading && deleteId ? (
            <CircularProgress size="1rem" color="inherit" />
          ) : (
            <DeleteIcon
              className="icons"
              onClick={() => handleDelete(values._id)}
            />
          )}
        </div>
      </div>

      <ul className="options">
        {values.options.map((each, i) => (
          <div key={each.option} className="optionContainer">
            <li className="option">{each.option}</li>
            <div className="voteContainer">
              <label className="vote">votes:{each.vote}</label>
              <div>
                {deleteOptionLoading && deleteOptionId === i ? (
                  <CircularProgress size="1rem" color="inherit" />
                ) : (
                  <DeleteIcon
                    className="deleteIcon"
                    onClick={() =>
                      handleDeleteOption(values._id, each.option, i)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </li>
  );
};

export default DataLists;
