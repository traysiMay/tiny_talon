import { SET_TOKEN, ERROR, RESPONSE } from "../actions";

// ERROR SERVICE COULD RUN OFF A MIDDLWARE FUNCTION AND BASICALLY PICKS OFF THE MESSAGE
// AND DOES A PARTICULAR ACTION

export const tRequest = (endPoint, headerData, dispatch) => {
  const token = localStorage.getItem("token");

  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token && `Bearer ${token}`}`
    },
    body: JSON.stringify({ ...headerData })
  })
    .then(response => {
      if (response.status !== 200) {
        return response.json().then(error => {
          throw new Error(error.error);
        });
      }
      return response.json();
    })
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
    .catch(error => {
      const { message } = error;
      console.log(error);
      dispatch({ type: ERROR, message });
    });
};

export const getToken = (dispatch, hash) => {
  console.log({ hash });
  const endPoint = "new_token";
  fetch(`${process.env.REACT_APP_SERVER}/${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ hash })
  })
    .then(response => {
      if (response.status !== 200) {
        return response.json().then(error => {
          throw new Error(error.error);
        });
      }
      return response.json();
    })
    .then(data => {
      const { token } = data;
      localStorage.setItem("token", token);
      dispatch({ type: SET_TOKEN, token });
    })
    .catch(error => {
      const { message } = error;
      dispatch({ type: ERROR, message });
    });
};

export const getRequest = () => {
  fetch(`${process.env.REACT_APP_SERVER}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(response => response.json())
    .then(console.log);
};
