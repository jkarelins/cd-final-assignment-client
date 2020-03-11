import axios from "axios";
const baseUrl = "http://localhost:4000";

const CREATE_NEW_EVENT = "CREATE_NEW_EVENT";
const FETCH_ALL_EVENTS = "FETCH_ALL_EVENTS";
const FETCH_ONE_EVENT = "FETCH_ONE_EVENT";
const CREATE_NEW_TICKET = "CREATE_NEW_TICKET";
const FETCH_ONE_TICKET = "FETCH_ONE_TICKET";
const UPDATE_TICKET = "UPDATE_TICKET";

const eventCreateSuccess = event => ({
  type: CREATE_NEW_EVENT,
  event
});

export const createEvent = data => (dispatch, getState) => {
  const { userReducer } = getState();
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

const eventFetchSuccess = event => ({
  type: FETCH_ONE_EVENT,
  event
});

export const fetchEvent = id => dispatch => {
  axios
    .get(`${baseUrl}/event/${id}`)
    .then(res => {
      dispatch(eventFetchSuccess(res.data));
    })
    .catch(console.error);
};

// _______________ Tickets:_________________________________
const ticketCreateSuccess = ticket => ({
  type: CREATE_NEW_TICKET,
  ticket
});

export const createTicket = (ticketId, data) => (dispatch, getState) => {
  const { userReducer } = getState();
  // console.log(data, " from creation......");
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .post(`${baseUrl}/event/${ticketId}/ticket`, {
      ...data
    })
    .then(response => {
      dispatch(ticketCreateSuccess(response.data));
    })
    .catch(console.error);
};

// FETCH SINGLE TICKET
const ticketFetchSuccess = ticket => ({
  type: FETCH_ONE_TICKET,
  ticket
});

export const fetchTicket = ticketId => (dispatch, getState) => {
  axios
    .get(`${baseUrl}/ticket/${ticketId}`)
    .then(res => {
      dispatch(ticketFetchSuccess(res.data));
    })
    .catch(console.error);
};

// UPDATE TICKET
const ticketUpdateSuccess = ticket => ({
  type: UPDATE_TICKET,
  ticket
});

export const updateTicket = data => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .post(`${baseUrl}/ticket/${data.id}`, {
      ...data
    })
    .then(async response => {
      await fetchTicket(response.data.id);
      dispatch(ticketUpdateSuccess(response.data));
    })
    .catch(console.error);
};
