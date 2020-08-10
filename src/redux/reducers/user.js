const initialState = {
    user: null,
};

const user = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
            user: action.user,
        };
      default:
        return state;
    }
  };
  
export default user;