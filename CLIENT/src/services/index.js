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

export const getAllSeries = () => {
  const endPoint = "all_series";
  const token = localStorage.getItem("token");
  const options = fetchOptions("GET", token, null);
  console.log(options);
  return fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then(data => data);
};

export const createHunt = async ({ seriesId, email }) => {
  const endPoint = "create_hunt";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, { id: seriesId, email });
  await fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

export const sendSeries = async ({ cat, description, name }) => {
  const endPoint = "send_series";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, { cat, description, name });
  await fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then(data => {
      console.log(data);
    });
};

export const createMarker = async marker => {
  const endPoint = "create_marker";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, marker);
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then(data => console.log(data));
};
