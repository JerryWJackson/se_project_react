// authorization/registration middleware

import { makeServerRequest } from "./api";
import { baseUrl, defaultHeaders } from "./constants";

export const register = ({ user }) => {
  return makeServerRequest(`${baseUrl}/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ user }),
  });
};

export const login = (email, password) => {
  console.log("starting login process for", email);
  return makeServerRequest(`${baseUrl}/signin`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(email, password),
  });
};

export const updateUserProfile = ({ name, avatar }, token) => {
  return makeServerRequest(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export const checkToken = (token) => {
  return makeServerRequest(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserData = (token) => {
  return makeServerRequest(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
