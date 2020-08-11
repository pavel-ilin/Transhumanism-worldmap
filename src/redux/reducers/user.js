const initialState = {
    user: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
      case "LOGIN":
        return {
          ...state,
            user: action.payload,
        };
        case "LOGOUT":
        return {
          ...state,
            user: action.payload,
        };
        case "LOAD_DATA":
        return {
          ...state,
            user: action.payload,
        };
      default:
        return state;
    }
  };
  
export default user;