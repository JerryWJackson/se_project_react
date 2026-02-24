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
 * server-side validation is the source of truth.
 * this helper remains for legacy calls but relies on server check in useAuth.
 */
export const checkToken = () => {
  return true;
};
