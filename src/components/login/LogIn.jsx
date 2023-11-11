import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "../../redux/store/store";
import { login, resetReducer } from "../../redux/reducers/loginSlice";
import { TextField, CircularProgress, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import { basicSchema } from "../../utilities/utilities";
import "./LogIn.css";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { jwtDecode } from "jwt-decode";

function LogIn() {
  const loginSlice = useSelector((state) => state.loginSlice);
  const status = useSelector((state) => state.loginSlice.isLoading);
  const error = useSelector((state) => state.loginSlice.isError);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSlice.isSuccess && loginSlice.data.token) {
      const decoded = jwtDecode(loginSlice.data.token);
      if (decoded.role === "Admin") {
        const items = [decoded.role, loginSlice.data.token];
        localStorage.setItem("key", items);
        dispatch(resetReducer());
        navigate("/adminpoll");
      }
    }
  }, [loginSlice.isSuccess]);

  const formikData = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      try {
        if (!loginSlice.data.token) {
          dispatch(resetReducer());
        }
        dispatch(login(values));
      } catch (error) {}
    },
    validationSchema: basicSchema,
  });

  if (error) {
    return <Snackbar open={true} autoHideDuration={6000} message={error} />;
  }

  return (
    <div className="pollPageContainer">
      <div className="formContainer">
        <h1>Log In</h1>
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
          {!loginSlice.data.token && (
            <p className="user">{loginSlice.data.data}</p>
          )}
          <div className="button">
            {status ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <Button
                  value={"Log In"}
                  classname={"buttonStyle"}
                  type={"submit"}
                />
                <NavLink to="/signup">
                  <Button
                    value={"Sign Up"}
                    classname={"buttonStyle"}
                    type={"submit"}
                  />
                </NavLink>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
