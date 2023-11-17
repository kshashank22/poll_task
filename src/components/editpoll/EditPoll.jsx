import React from "react";
import { dispatch } from "../../redux/store/store";
import { useFormik } from "formik";
import { updateTitle, resetReducer } from "../../redux/reducers/optionsSlice";
import { TextField, CircularProgress } from "@mui/material";
import Button from "../button/Button";
import "./EditPoll.css";
import { titleSchema } from "../../utilities/utilities";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const EditPoll = () => {
  const loading = useSelector((state) => state.optionsSlice.isLoading);
  const status = useSelector((state) => state.optionsSlice.isSuccess);
  const navigate = useNavigate();
  const { edittitleId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (status) {
      dispatch(resetReducer());
      navigate("/adminpoll");
    }
  });

  const formikData = useFormik({
    initialValues: {
      title: location.state,
    },
    onSubmit: (values) => {
      try {
        dispatch(updateTitle(values, edittitleId));
      } catch (error) {}
    },
    validationSchema: titleSchema,
  });

  const handleHome = () => {
    navigate("/adminpoll");
  };
  return (
    <div className="adminPollContainer editContainer">
      <div className="editBox">
        <form autoComplete="off" onSubmit={formikData.handleSubmit}>
          <div className="textfieldContainer">
            <p className="text">Update Title</p>
            <TextField
              className="textUpdate"
              type="text"
              name="title"
              id="updateTitle"
              value={formikData.values.title}
              onChange={formikData.handleChange}
            />
          </div>
          <div className="buttonsContainer">
            <div className="button">
              <Button
                value={
                  loading ? (
                    <CircularProgress size="1rem" color="inherit" />
                  ) : (
                    "Submit"
                  )
                }
                classname={"buttonStyle"}
                type={"submit"}
              />
            </div>
            <div className="button">
              <Button
                value={"Back To Home"}
                classname={"buttonStyle"}
                type={"button"}
                onclick={handleHome}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPoll;
