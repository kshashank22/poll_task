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
import Backdrop from "@mui/material/Backdrop";

function UserPoll() {
  const listItems = useSelector((state) => state.pollSlice.data);
  const status = useSelector((state) => state.pollSlice.isLoading);
  const error = useSelector((state) => state.pollSlice.isError);

  const [page, setPage] = useState(0);
  const [rowsPerPageOption, setRowsPerPageOption] = useState([5, 10, 15]);

  const row = () => {
    if (localStorage.getItem("rowpage")) {
      return JSON.parse(localStorage.getItem("rowpage"));
    }
    return 5;
  };

  const [rowPerPage, setRowPerPage] = useState(row());

  useEffect(() => {
    dispatch(fetchedData());
    const data = JSON.parse(localStorage.getItem("page"));
    if (data) {
      setPage(parseInt(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("rowpage", rowPerPage);
  }, [page, rowPerPage]);

  const handleLogout = () => {
    localStorage.clear();
  };

  const handleChangePage = (event, updatePage) => {
    setPage(updatePage);
  };

  const handleRowPerPage = (event) => {
    setRowPerPage(event.target.value);
    setPage(0);
  };

  return (
    <div className="adminPollContainer">
      <h1 className="heading">User Poll</h1>
      {status ? (
        <div className="loader">
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
          >
            <CircularProgress size="1rem" color="inherit" />
          </Backdrop>
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
            value={
              status ? (
                <CircularProgress size="1rem" color="inherit" />
              ) : (
                "Log Out"
              )
            }
            classname={"buttonStyle"}
            type={"submit"}
            onclick={handleLogout}
          />
        </NavLink>
      </div>
      <div className="paginationContainer">
        <Pagination
          rowsPerPageOptions={rowsPerPageOption}
          count={listItems.length}
          page={!listItems.length || listItems.length <= 0 ? 0 : page}
          rowsPerPage={rowPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowPerPage}
        />
      </div>
    </div>
  );
}

export default UserPoll;
