import { TablePagination } from "@mui/material";
import React from "react";

const Pagination = ({
  rowsPerPageOptions,
  page,
  count,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <div>
      <TablePagination
        component="div"
        rowsPerPageOptions={rowsPerPageOptions}
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      ></TablePagination>
    </div>
  );
};

export default Pagination;
