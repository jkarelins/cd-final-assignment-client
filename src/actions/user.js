import axios from "axios";
const SIGN_UP_USER = "SIGN_UP_USER";
const LOG_IN_USER = "LOG_IN__USER";

const baseUrl = "http://localhost:4000";

const userCreateSuccess = user => ({
  type: SIGN_UP_USER,
  user
});

export const createUser = data => dispatch => {
  axios
    .post(`${baseUrl}/user/create`, { ...data })
    .then(response => {
      dispatch(userCreateSuccess(response.data));
    })
    .catch(console.error);
};

const userLoginSuccess = user => ({
  type: LOG_IN_USER,
  user
});

export const loginUser = data => dispatch => {
  axios
    .post(`${baseUrl}/user/login`, { ...data })
    .then(response => {
      dispatch(userLoginSuccess(response.data));
    })
    .catch(console.error);
};
