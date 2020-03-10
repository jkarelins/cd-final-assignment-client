const initialState = null;

export default function userReducer(state = initialState, action) {
  console.log(action.user);
  switch (action.type) {
    case "SIGN_UP_USER": {
      return action.user;
    }
    case "LOG_IN__USER": {
      return action.user;
    }
    default: {
      return state;
    }
  }
}
