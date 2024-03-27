// authorization/registration middleware


import { checkServerResponse, makeServerRequest } from "./api";
import { baseUrl,defaultHeaders } from './constants';

export const register = ({ name, avatar, email, password }) => {
  return makeServerRequest(`${baseUrl}/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkServerResponse);
};

export const login = ({ email, password }) => {
  return makeServerRequest(`${baseUrl}/signin`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  }).then(checkServerResponse);
};

export const update = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
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
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
};

export const getUserData = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponse);
};