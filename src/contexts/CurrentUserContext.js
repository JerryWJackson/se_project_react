import { createContext } from 'react';

const CurrentUserContext = createContext({
  currentUser: '',
  handleToggleSwitchChange: () => {}
})

export {CurrentUserContext};
