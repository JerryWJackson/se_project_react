const TOKEN_KEY = "jwt";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const handleToken = (token) => {
  if (token) {
    // console.log("got token, adding to local storage");
    localStorage.setItem(TOKEN_KEY, token);
    return token;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
};

export const checkToken = (tokenToCheck) => {
  const token = getToken();
  if (tokenToCheck && tokenToCheck === token) {
    console.log("token is a match!");
    return true;
  } else {
    return false;
  }
};
