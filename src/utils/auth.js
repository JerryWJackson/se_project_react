// authorization/registration middleware

import { checkServerResponse, makeServerRequest } from "./api";
import { baseUrl, defaultHeaders } from "./constants";

export const signup = ({ name, avatar, email, password }) => {
  return makeServerRequest(`${baseUrl}/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkServerResponse);
};

export const signin = ({ email, password }) => {
  return makeServerRequest(`${baseUrl}/signin`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  }).then(checkServerResponse);
};

export const update = ({ name, avatar }, token) => {
  return makeServerRequest(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkServerResponse);
};

export const checkToken = (token) => {
  return makeServerRequest(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
};

export const getUserData = (token) => {
  return makeServerRequest(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
};
