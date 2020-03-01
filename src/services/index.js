import { SET_TOKEN, RESPONSE } from "../actions";
import { handleError, handleResponse, fetchOptions } from "./handles";

// there could be a request thunk that delegates dispatches based on the response message
export const tRequest = (endPoint, headerData, dispatch) => {
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, headerData);
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then(data => {
      if (data.message === "verified" && token) {
        dispatch({
          type: SET_TOKEN,
          token
        });
      }
      dispatch({
        type: RESPONSE,
        response: data.message
      });
    })
    .catch(error => handleError(error, dispatch));
};

export const getToken = (dispatch, hash) => {
  const endPoint = "new_token";
  const options = fetchOptions("POST", null, { hash });
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then(data => {
      const { token } = data;
      localStorage.setItem("token", token);
      dispatch({ type: SET_TOKEN, token });
    })
    .catch(error => handleError(error, dispatch));
};

export const getRequest = () => {
  fetch(`${process.env.REACT_APP_SERVER}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(handleResponse)
    .then(console.log);
};
