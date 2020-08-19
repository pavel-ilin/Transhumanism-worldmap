const initialState = {
    geoData: false,
    allCountries: [],
    allStates: [],
};

const storage = (state = initialState, action) => {
    switch (action.type) {
        case "GET_GEO_DATA":
          return {
            ...state,
              geoData: action.payload,
              allCountries: action.allCountries,
              allStates: action.allStates
          };
        default:
          return state;
      }
    };
  
  export default storage;