import { defaultHeaders, authHeaders, baseUrl } from "./constants";
import { getToken } from "../utils/token";

export function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function makeServerRequest(url, options) {
  return fetch(url, options).then(checkServerResponse);
}

export function fetchAllClothing() {
  return makeServerRequest(`${baseUrl}/items`, {
    headers: defaultHeaders,
  });
}

export function addNewItem(item) {
  return makeServerRequest(baseUrl, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    }),
  });
}

export function deleteItem(id) {
  const token = getToken();
  return makeServerRequest(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: authHeaders,
  });
}
