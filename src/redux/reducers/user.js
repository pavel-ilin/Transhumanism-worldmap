const initialState = {
    user: false,
};

const user = (state = initialState, action) => {
  // localStorage.user = action.payload
  switch (action.type) {
      case "LOGIN":
        return {
          ...state,
            user: action.payload,
        };
      default:
        return state;
    }
  };
  
export default user;