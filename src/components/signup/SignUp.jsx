import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField, CircularProgress, Snackbar } from "@mui/material";
import "../../components/login/LogIn.css";
import { useFormik } from "formik";
import { basicSchema } from "../../utilities/utilities";
import { dispatch } from "../../redux/store/store";
import { signup, resetReducers } from "../../redux/reducers/signupSlice";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { resetReducer } from "../../redux/reducers/loginSlice";

function SignUp() {
  const signupSlice = useSelector((state) => state.signupSlice);
  const status = useSelector((state) => state.signupSlice.isLoading);
  const error = useSelector((state) => state.signupSlice.isError);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      dispatch(resetReducer());
    }
  }, [location.state]);

  useEffect(() => {
    if (signupSlice.isSuccess && !signupSlice.data.message) {
      alert("Successfully Signed Up");
      navigate("/");
      dispatch(resetReducers());
    } else if (signupSlice.data.message) {
      setMessage(signupSlice.data.message);
    }
  }, [signupSlice.isSuccess]);

  const formikData = useFormik({
    initialValues: { id: uuidv4(), username: "", password: "", role: "Guest" },
    onSubmit: (values) => {
      try {
        dispatch(signup(values));
      } catch (error) {}
      if (status) {
        dispatch(resetReducers());
      }
    },
    validationSchema: basicSchema,
  });

  return (
    <div className="pollPageContainer">
      <div className="formContainer">
        <h1>Sign Up</h1>
        <form autoComplete="off" onSubmit={formikData.handleSubmit}>
          <div className="label">
            <label className="labelText">UserName</label>
            <TextField
              type="text"
              className="text"
              name="username"
              id="username"
              value={formikData.values.username}
              onBlur={formikData.handleBlur}
              onChange={formikData.handleChange}
            />
          </div>
          {formikData.errors.username && formikData.touched.username ? (
            <p className="error">{formikData.errors.username}</p>
          ) : (
            ""
          )}
          <div className="label">
            <label className="labelText">Password</label>
            <TextField
              type="password"
              className="text"
              name="password"
              id="password"
              value={formikData.values.password}
              onBlur={formikData.handleBlur}
              onChange={formikData.handleChange}
            />
            {formikData.errors.password && formikData.touched.password ? (
              <p className="error">{formikData.errors.password}</p>
            ) : (
              ""
            )}
          </div>

          <div className="label">
            <label>Role</label>
            <select
              name="role"
              className="role"
              onChange={formikData.handleChange}
              onBlur={formikData.handleBlur}
            >
              <option value="Guest">Guest</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {message && <p className="user">{signupSlice.data.message}</p>}
          <div className="button">
            <div className="buttonContainer">
              <Button
                value={
                  status ? (
                    <CircularProgress size="1rem" color="inherit" />
                  ) : (
                    "Sign Up"
                  )
                }
                classname={"buttonStyle"}
                type={"submit"}
              />
            </div>
            <div>
              <NavLink to="/" state={message}>
                <p className="link">Already have account? Login</p>
              </NavLink>
            </div>
          </div>
        </form>
        {error && (
          <Snackbar open={true} autoHideDuration={6000} message={error} />
        )}
      </div>
    </div>
  );
}

export default SignUp;
