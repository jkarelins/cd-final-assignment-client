const initialState = {};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_NEW_EVENT": {
      return {
        ...state,
        lastAddedEvent: action.event,
        allEvents: [...state.allEvents, action.event],
        eventsCount: state.eventsCount + 1
      };
    }
    case "FETCH_ALL_EVENTS": {
      const { data, count } = action.events.data;
      if (state.allEvents) {
        return {
          ...state,
          allEvents: [...state.allEvents, ...data],
          eventsCount: count
        };
      }
      return {
        ...state,
        allEvents: data,
        eventsCount: count
      };
    }
    case "FETCH_ONE_EVENT": {
      return { ...state, selectedEvent: action.event };
    }
    case "CREATE_NEW_TICKET": {
      action.ticket.comments = [];
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          tickets: [...state.selectedEvent.tickets, action.ticket]
        }
      };
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
        selectedTicket: {
          restTickets: [...selectedTicket.restTickets],
          ticket: {
            ...ticket,
            user: state.selectedTicket.ticket.user,
            event: state.selectedTicket.ticket.event,
            comments: state.selectedTicket.ticket.comments
          }
        }
      };
    }
    case "CREATE_NEW_COMMENT": {
      const { ticket } = state.selectedTicket;
      return {
        ...state,
        selectedTicket: {
          ...state.selectedTicket,
          ticket: {
            ...ticket,
            comments: [...ticket.comments, action.data]
          }
        }
      };
    }
    default: {
      return state;
    }
  }
}
