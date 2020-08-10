const initialState = {
    user: localStorage.user,
};

const user = (state = initialState, action) => {
  localStorage.user = action.payload
  switch (action.type) {
      case "LOGIN":
        return {
          ...state,
            user: localStorage.user,
        };
      default:
        return state;
    }
  };
  
export default user;