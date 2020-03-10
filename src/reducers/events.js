const initialState = {};

export default function eventReducer(state = initialState, action) {
  console.log(action.event);
  switch (action.type) {
    case "CREATE_NEW_EVENT": {
      return { ...state, lastaddedEvent: action.event };
    }
    case "FETCH_ALL_EVENTS": {
      return { ...state, allEvents: action.events };
    }
    default: {
      return state;
    }
  }
}
