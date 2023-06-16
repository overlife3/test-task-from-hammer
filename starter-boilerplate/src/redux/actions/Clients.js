import {
  CLIENT_LIST_FAILURE,
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_SUCCESS,
} from "redux/constants/Clietns";

export const clientListRequest = (clients) => {
  return { type: CLIENT_LIST_REQUEST };
};

export const clientListSuccess = (clients) => {
  return { type: CLIENT_LIST_SUCCESS, clients };
};

export const clientListFailure = (error) => {
  return { type: CLIENT_LIST_FAILURE, error };
};
