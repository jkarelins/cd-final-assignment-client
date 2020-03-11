const initialState = {};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_NEW_EVENT": {
      return { ...state, lastAddedEvent: action.event };
    }
    case "FETCH_ALL_EVENTS": {
      return { ...state, allEvents: action.events };
    }
    case "FETCH_ONE_EVENT": {
      return { ...state, selectedEvent: action.event };
    }
    case "CREATE_NEW_TICKET": {
      return { ...state, lastTicketAdded: action.ticket };
    }
    case "FETCH_ONE_TICKET": {
      return { ...state, selectedTicket: action.ticket };
    }
    case "FETCH_USER_TICKETS": {
      return { ...state, userTickets: action.tickets };
    }
    case "UPDATE_TICKET": {
      const { ticket } = action;
      const { selectedTicket } = state;
      return {
        ...state,
        selectedTicket: { ...selectedTicket, ...ticket }
      };
    }
    default: {
      return state;
    }
  }
}
