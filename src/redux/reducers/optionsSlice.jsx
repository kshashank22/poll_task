import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const optionsSlice = createSlice({
  name: "addOptions",
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
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export function optionsAdd(value, id) {
  return async () => {
    dispatch(optionsSlice.actions.startLoading());
    try {
      const response = await axiosInstance.post(
        `add_new_option?id=${id}&option_text=${value.option}`,
        { value, id }
      );
      dispatch(optionsSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(optionsSlice.actions.hasError(e));
    }
  };
}

export function updateTitle(value, id) {
    return async () => {
      dispatch(optionsSlice.actions.startLoading());
      try {
        const response = await axiosInstance.put(
          `update_poll_title?id=${id}&title=${value.title}`,
          { value, id }
        );
        dispatch(optionsSlice.actions.loginSuccess(response.data));
      } catch (e) {
        dispatch(optionsSlice.actions.hasError(e));
      }
    };
  }

export const { startLoading, hasError, loginSuccess, resetReducer } =
  optionsSlice.actions;
export default optionsSlice.reducer;
