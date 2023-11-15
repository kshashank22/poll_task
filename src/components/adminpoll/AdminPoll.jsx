import React, { useState, useEffect } from "react";
import { dispatch } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { fetchedData } from "../../redux/reducers/pollSlice";
import { eachData } from "../../redux/reducers/eachPollSlice";
import "./AdminPoll.css";
import DataLists from "../datalists/DataLists";
import Button from "../button/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Snackbar } from "@mui/material";
import AddPoll from "../addpoll/AddPoll";
import Pagination from "../pagination/Pagination";

function AdminPoll() {
  const listItems = useSelector((state) => state.pollSlice.data);
  const status = useSelector((state) => state.pollSlice.isLoading);
  const error = useSelector((state) => state.pollSlice.isError);
  const navigate = useNavigate();

  const [addNewPoll, setAddNewPoll] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOptions, setNewOptions] = useState([{ option: "" }]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState([5, 10, 15]);

  useEffect(() => {
    dispatch(fetchedData());
  }, []);

  const handleAdd = () => {
    setAddNewPoll(!addNewPoll);
  };

  const handleEachItem = (id) => {
    dispatch(eachData(id));
    navigate("/eachpoll");
  };

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
      <h1 className="heading">Admin Poll</h1>
      <div className="addIcon">
        <Button value={`AddPoll + `} classname={"button"} onclick={handleAdd} />
      </div>
      {addNewPoll ? (
        <AddPoll
          onstatus={status}
          addNewPoll={addNewPoll}
          setAddNewPoll={setAddNewPoll}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newOptions={newOptions}
          setNewOptions={setNewOptions}
        />
      ) : (
        <>
          {status ? (
            <div className="loader">
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <ul className="adminPollData">
              {listItems
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .map((each) => (
                  <DataLists
                    key={each._id}
                    values={each}
                    onclick={() => handleEachItem(each._id)}
                  />
                ))}
            </ul>
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
        </>
      )}
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          message={listItems.message}
        />
      )}
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

export default AdminPoll;
