import React, { useEffect } from "react";
import { dispatch } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { fetchedData } from "../../redux/reducers/pollSlice";
import "../adminpoll/AdminPoll.css";
import UserDataLists from "../userdatalists/UserDataLists";
import Button from "../button/Button";
import { NavLink } from "react-router-dom";
import { CircularProgress, Snackbar } from "@mui/material";

function UserPoll() {
  const listItems = useSelector((state) => state.pollSlice.data);
  const status = useSelector((state) => state.pollSlice.isLoading);
  const error = useSelector((state) => state.pollSlice.isError);

  useEffect(() => {
    dispatch(fetchedData());
  }, []);

  return (
    <div className="adminPollContainer">
      <h1 className="heading">User Poll</h1>
      {status ? (
        <div className="loader">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <ul className="adminPollData">
          {listItems.map((each) => (
            <UserDataLists key={each._id} values={each} />
          ))}
        </ul>
      )}
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          message={listItems.message}
        />
      )}

      <div className="button">
        <NavLink to="/">
          <Button value={"Log Out"} classname={"buttonStyle"} type={"submit"} />
        </NavLink>
      </div>
    </div>
  );
}

export default UserPoll;
