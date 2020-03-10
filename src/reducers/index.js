import { combineReducers } from "redux";
import userReducer from "./user";
import eventReducer from "./events";

export default combineReducers({
  userReducer,
  eventReducer
});
