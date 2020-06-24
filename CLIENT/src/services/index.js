import { SET_TOKEN, RESPONSE, dDelay } from "../actions";
import { handleError, handleResponse, fetchOptions } from "./handles";

// there could be a request thunk that delegates dispatches based on the response message
export const tRequest = (endPoint, headerData, dispatch) => {
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, headerData);
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => {
      if (data.message === "verified" && token) {
        dispatch({
          type: SET_TOKEN,
          token,
        });
      }
      if (data.message === "new_device_created") {
        dispatch({ type: SET_TOKEN, token: data.token });
      }
      dispatch({
        type: RESPONSE,
        response: data.message,
      });
    })
    .catch((error) => handleError(error, dispatch));
};

export const getToken = (dispatch, hash) => {
  const endPoint = "new_token";
  const options = fetchOptions("POST", null, { hash });
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => {
      const { token } = data;
      localStorage.setItem("token", token);
      dispatch({ type: SET_TOKEN, token });
    })
    .catch((error) => handleError(error, dispatch));
};

export const seriesReady = (dispatch, id) => {
  const endPoint = "series_ready";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, { id });
  dispatch({ type: "MAP_LOADING" });
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => {
      const { ready } = data;
      if (ready) dispatch({ type: "MAP_READY" });
      dispatch(dDelay("MAP_DONE", 1000));
    })
    .catch((error) => handleError(error, dispatch));
};

export const getSeries = (seriesId) => {
  const endPoint = "get_series";
  const token = localStorage.getItem("token");
  const options = fetchOptions("GET", token, null);
  return fetch(
    `${process.env.REACT_APP_SERVER}/${endPoint}?seriesId=${seriesId}`,
    options
  )
    .then(handleResponse)
    .then((data) => data);
};
export const getAllSeries = () => {
  const endPoint = "all_series";
  const token = localStorage.getItem("token");
  const options = fetchOptions("GET", token, null);
  return fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => data);
};

export const getAllUserSeries = (dispatch) => {
  const endPoint = "all_user_series";
  const token = localStorage.getItem("token");
  const options = fetchOptions("GET", token, null);
  return fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => handleError(error, dispatch));
};

export const createHunt = async ({ seriesId, email }) => {
  const endPoint = "create_hunt";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, { id: seriesId, email });
  await fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

export const sendSeries = async ({ cat, description, name }) => {
  const endPoint = "send_series";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, { cat, description, name });
  await fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => {
      console.log(data);
    });
};

export const createMarker = async (marker) => {
  const endPoint = "create_marker";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, marker);
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => console.log(data));
};

export const getPlace = async (hunt) => {
  const endPoint = "get_place";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, { id: hunt });
  const place = await fetch(
    `${process.env.REACT_APP_SERVER}/${endPoint}`,
    options
  )
    .then(handleResponse)
    .then((data) => data);
  return place;
};

export const createRsvp = async (seriesId) => {
  const endPoint = "create_rsvp";
  const token = localStorage.getItem("token");
  const options = fetchOptions("POST", token, { seriesId });
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => data);
};

export const releaseDevice = async () => {
  const endPoint = "release_device";
  const token = localStorage.getItem("token");
  const options = fetchOptions("DELETE", token, null);
  return fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, options)
    .then(handleResponse)
    .then((data) => data);
};
