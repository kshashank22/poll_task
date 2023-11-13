import React from "react";
import { useSelector } from "react-redux";
import { TextField, CircularProgress, Snackbar } from "@mui/material";
import "../../components/login/LogIn.css";
import { useFormik } from "formik";
import { basicSchema } from "../../utilities/utilities";
import { dispatch } from "../../redux/store/store";
import { signup } from "../../redux/reducers/signupSlice";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";

function SignUp() {
  const signupSlice = useSelector((state) => state.signupSlice);
  const status = useSelector((state) => state.signupSlice.isLoading);
  const error = useSelector((state) => state.signupSlice.isError);

  const formikData = useFormik({
    initialValues: { id: uuidv4(), username: "", password: "", role: "Guest" },
    onSubmit: (values, actions) => {
      try {
        dispatch(signup(values));
      } catch (error) {}
      actions.resetForm();
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
          {!signupSlice.data.token && (
            <p className="user">{signupSlice.data.message}</p>
          )}
          <div className="button">
            {status ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <Button
                  value={"Sign Up"}
                  classname={"buttonStyle"}
                  type={"submit"}
                />
                <NavLink to="/">
                  <Button
                    value={"Sign In"}
                    classname={"buttonStyle"}
                    type={"submit"}
                  />
                </NavLink>
              </>
            )}
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
