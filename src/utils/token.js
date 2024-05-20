const TOKEN_KEY = "jwt";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const handleToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    return token;
  } else {
    return;
  }
};