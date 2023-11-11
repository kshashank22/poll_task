import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

const eachPollSlice = createSlice({
  name: "eachPollList",
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
      state.data = { ...action.payload.data };
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = action.payload;
    },
  },
});

export function eachData(id) {
  return async () => {
    dispatch(eachPollSlice.actions.startLoading());
    try {
      const response = await axiosInstance.get(`list_poll?id=${id}`);
      dispatch(eachPollSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(eachPollSlice.actions.hasError(e));
    }
  };
}

export const { startLoading, hasError, loginSuccess } = eachPollSlice.actions;

export default eachPollSlice.reducer;
