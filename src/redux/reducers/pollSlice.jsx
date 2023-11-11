import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

const pollSlice = createSlice({
  name: "pollList",
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
      state.data = action.payload.data.reverse();
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = action.payload;
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export function fetchedData() {
  return async () => {
    dispatch(pollSlice.actions.startLoading());
    try {
      const response = await axiosInstance.get("list_polls");
      dispatch(pollSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(pollSlice.actions.hasError(e));
    }
  };
}

export const { startLoading, hasError, loginSuccess } = pollSlice.actions;

export default pollSlice.reducer;
