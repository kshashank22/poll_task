import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload };
    },
    resetReducers(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export function deletePoll(id) {
  return async () => {
    dispatch(deleteSlice.actions.startLoading());
    try {
      const response = await axiosInstance.delete(`delete_poll?id=${id}`, {
        id,
      });
      dispatch(deleteSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(deleteSlice.actions.hasError(e));
    }
  };
}

export const { startLoading, hasError, loginSuccess, resetReducers } =
  deleteSlice.actions;
export default deleteSlice.reducer;
