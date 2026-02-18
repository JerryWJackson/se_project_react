import React from "react";
import "./ToggleSwitch.css";
import { useContext } from "react";
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";

const ToggleSwitch = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useContext(
    UserPreferencesContext
  );
  const currentTemperatureUnit = temperatureUnit;
  const handleToggleSwitchChange = toggleTemperatureUnit;



  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__isActive"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__isActive"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
