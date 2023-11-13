import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const votePollSlice = createSlice({
  name: "voteslice",
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

export function vote(id, option, headers) {
  return async () => {
    dispatch(votePollSlice.actions.startLoading());
    try {
      const response = await axiosInstance.post(
        `do_vote?id=${id}&option_text=${option}`,

        { id, option },
        headers
      );
      console.log(response);
      dispatch(votePollSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(votePollSlice.actions.hasError(e));
    }
  };
}

export const { startLoading, hasError, loginSuccess, resetReducer } =
  votePollSlice.actions;
export default votePollSlice.reducer;
