import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import signupSlice from "./signupSlice";
import pollSlice from "./pollSlice";
import eachPollSlice from "./eachPollSlice";
import optionsSlice from "./optionsSlice";
import deleteOptionSlice from "./deleteOptionSlice";
import addPollSlice from "./addPollSlice";
import deleteSlice from "./deleteSlice";

const rootReducer = combineReducers({
  loginSlice: loginSlice,
  signupSlice: signupSlice,
  pollSlice: pollSlice,
  eachPollSlice: eachPollSlice,
  optionsSlice: optionsSlice,
  deleteOptionSlice: deleteOptionSlice,
  deleteSlice: deleteSlice,
  addPollSlice: addPollSlice,
});

export default rootReducer;
