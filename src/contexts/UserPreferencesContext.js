import React from "react";

export const UserPreferencesContext = React.createContext({
  temperatureUnit: "F",
  theme: "light",
  toggleTemperatureUnit: () => {},
  toggleTheme: () => {},
});
