export const TOKEN_KEY = "jwt";

/**
 * getToken
 * returns token if one is present in local storage.
 *
 * @returns token
 */

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * handleToken
 * ! if called without passing any params, handleToken will remove the
 * ! entire jwt token array from local storage.
 *
 * @param {*} token
 * @returns token value, if any
 */
export const handleToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    return token;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
};

/**
 * checkToken
 * this is a helper function to check if a token matches any tokens
 * within the jwt token array held in local storage.
 *
 * @param {*} tokenToCheck
 * @returns boolean
 */

export const checkToken = (tokenToCheck) => {
  const token = getToken();
  if (tokenToCheck && tokenToCheck === token) {
    return true;
  } else {
    return false;
  }
};
