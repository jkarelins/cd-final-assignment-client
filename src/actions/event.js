import axios from "axios";
const baseUrl = "http://localhost:4000";

const CREATE_NEW_EVENT = "CREATE_NEW_EVENT";
const FETCH_ALL_EVENTS = "FETCH_ALL_EVENTS";

const eventCreateSuccess = event => ({
  type: CREATE_NEW_EVENT,
  event
});

export const createEvent = data => (dispatch, getState) => {
  const { userReducer } = getState();
  console.log(data, " from creation......");
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .post(`${baseUrl}/event/create`, {
      ...data
    })
    .then(response => {
      dispatch(eventCreateSuccess(response.data));
    })
    .catch(console.error);
};

const eventsFetchSuccess = events => ({
  type: FETCH_ALL_EVENTS,
  events
});

export const fetchEvents = page => dispatch => {
  axios
    .get(`${baseUrl}/event`)
    .then(response => {
      dispatch(eventsFetchSuccess(response.data));
    })
    .catch(console.error);
};
