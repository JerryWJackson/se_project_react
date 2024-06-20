import { createContext } from "react";

const CurrentUserContext = createContext({
  currentUser: "",
  avatar: "",
});

export { CurrentUserContext };
