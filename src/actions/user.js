import axios from "axios";
const SIGN_UP_USER = "SIGN_UP_USER";
const LOG_IN_USER = "LOG_IN__USER";
const FETCH_USER_TICKETS = "FETCH_USER_TICKETS";
const LOG_OUT_USER = "LOG_OUT_USER";

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

const userTicketsFetchSuccess = user => ({
  type: FETCH_USER_TICKETS,
  tickets: user.tickets
});

export const fetchUserTickets = userId => dispatch => {
  axios
    .get(`${baseUrl}/user/${userId}`)
    .then(response => {
      dispatch(userTicketsFetchSuccess(response.data));
    })
    .catch(console.error);
};

const userLogOutSuccess = () => ({
  type: LOG_OUT_USER,
  logout: true
});

export const logMeOut = () => dispatch => {
  dispatch(userLogOutSuccess());
};
