import { ERROR } from "../actions";

export const fetchOptions = (method, token, body) => ({
  method,
  headers: token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    : { "Content-Type": "application/json" },
  body: method === "POST" ? JSON.stringify({ ...body }) : null
});

export const handleResponse = response => {
  if (response.status !== 200) {
    return response.json().then(error => {
      throw new Error(error.error);
    });
  }
  return response.json();
};

export const handleError = (error, dispatch) => {
  const { message } = error;
  dispatch({ type: ERROR, error: message });
};
