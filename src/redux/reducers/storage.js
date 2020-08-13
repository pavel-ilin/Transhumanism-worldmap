const initialState = {
    geoData: false,
};

const storage = (state = initialState, action) => {
    switch (action.type) {
        case "GET_GEO_DATA":
          return {
            ...state,
              geoData: action.payload,
          };
        default:
          return state;
      }
    };
    
  export default storage;