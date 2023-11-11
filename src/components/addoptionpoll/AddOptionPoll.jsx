import React from "react";
import { dispatch } from "../../redux/store/store";
import { useFormik } from "formik";
import { optionsAdd, resetReducer } from "../../redux/reducers/optionsSlice";
import { TextField, CircularProgress } from "@mui/material";
import Button from "../button/Button";
import "../editpoll/EditPoll.css";
import { optionSchema } from "../../utilities/utilities";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AddOptionPoll = () => {
  const loading = useSelector((state) => state.optionsSlice.isLoading);
  const status = useSelector((state) => state.optionsSlice.isSuccess);
  const navigate = useNavigate();
  const { addoptionId } = useParams();
  const location = useLocation();

  if (status) {
    dispatch(resetReducer());
    navigate("/adminpoll");
  }

  const formikData = useFormik({
    initialValues: {
      option: "",
    },
    onSubmit: (values) => {
      try {
        dispatch(optionsAdd(values, addoptionId));
      } catch (error) {}
    },
    validationSchema: optionSchema,
  });

  const handleHome = () => {
    navigate("/adminpoll");
  };

  return (
    <div className="adminPollContainer editContainer">
      <div className="editBox">
        <form autoComplete="off" onSubmit={formikData.handleSubmit}>
          <div className="textfieldContainer">
            <p className="text">Title</p>
            <TextField
              className="textUpdate"
              type="text"
              value={location.state}
              disabled
            />
          </div>
          <div className="textfieldContainer">
            <p className="text">Add Option</p>
            <TextField
              className="textUpdate"
              type="text"
              name="option"
              id="option"
              value={formikData.values.option}
              onChange={formikData.handleChange}
            />
          </div>
          <div className="button">
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Button
                value={"Submit"}
                classname={"buttonStyle"}
                type={"submit"}
              />
            )}
          </div>
          <div className="button">
            <Button
              value={"Back To Home"}
              classname={"buttonStyle"}
              type={"button"}
              onclick={handleHome}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOptionPoll;
