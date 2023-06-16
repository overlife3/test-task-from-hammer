const {
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_SUCCESS,
  CLIENT_LIST_FAILURE,
} = require("redux/constants/Clietns");

const initialState = {
  clients: [],
  loading: false,
  error: null,
};

const clients = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_LIST_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CLIENT_LIST_SUCCESS:
      return {
        ...state,
        clients: action.clients,
        loading: false,
      };
    case CLIENT_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default clients;
