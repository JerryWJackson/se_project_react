import { useState, createContext } from "react";

const CurrentUserContext = createContext([{}, () => {}]);
const PassCurrentUserProvider = {};

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(CurrentUserContext);

  PassCurrentUserProvider.currentUser = currentUser;
  PassCurrentUserProvider.setCurrentUser = setCurrentUser;

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
export { CurrentUserContext, CurrentUserProvider, PassCurrentUserProvider };
