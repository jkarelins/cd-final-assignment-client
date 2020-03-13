import { combineReducers } from "redux";
import userReducer from "./user";
import eventReducer from "./events";
import errorReducer from "./error";

export default combineReducers({
  userReducer,
  eventReducer,
  errorReducer
});
