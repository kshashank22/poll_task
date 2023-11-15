import React, { useState, useEffect } from "react";
import { dispatch } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { fetchedData } from "../../redux/reducers/pollSlice";
import "../adminpoll/AdminPoll.css";
import UserDataLists from "../userdatalists/UserDataLists";
import Button from "../button/Button";
import { NavLink } from "react-router-dom";
import { CircularProgress, Snackbar } from "@mui/material";
import Pagination from "../pagination/Pagination";

function UserPoll() {
  const listItems = useSelector((state) => state.pollSlice.data);
  const status = useSelector((state) => state.pollSlice.isLoading);
  const error = useSelector((state) => state.pollSlice.isError);

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState([5, 10, 15]);

  useEffect(() => {
    dispatch(fetchedData());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
  };

  const handleChangePage = (event, updatePage) => {
    setPage(updatePage);
  };

  const handleRowPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="adminPollContainer">
      <h1 className="heading">User Poll</h1>
      {status ? (
        <div className="loader">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <ul className="adminPollData">
          {listItems
            .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
            .map((each) => (
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
          <Button
            value={"Log Out"}
            classname={"buttonStyle"}
            type={"submit"}
            onclick={handleLogout}
          />
        </NavLink>
      </div>
      <div className="paginationContainer">
        <Pagination
          rowsPerPageOptions={rowsPerPageOption}
          page={page}
          count={listItems.length}
          rowsPerPage={rowPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowPerPage}
        />
      </div>
    </div>
  );
}

export default UserPoll;
