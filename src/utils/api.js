const baseUrl = "http://localhost:3001/items";
const defaultHeaders = { "Content-Type": "application/json" };

function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // if the server returns an error, reject the promise
  return Promise.reject(`Error: ${res.status}`);
}

function makeServerRequest(url, options) {
  return fetch(url, options).then(checkServerResponse);
}

export function fetchAllClothing() {
  return makeServerRequest(baseUrl, {
    headers: defaultHeaders,
  });
}

export function addNewItem(item) {
  return makeServerRequest(baseUrl, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    }),
  });
}

export function deleteItem(id) {
  console.log('id to delete', id);
  return makeServerRequest(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
}
