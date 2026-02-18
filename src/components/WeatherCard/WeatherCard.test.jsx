import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WeatherCard from "./WeatherCard";
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";
import { weatherOptions } from "../../utils/constants";

describe("WeatherCard", () => {
  it("renders correctly with temperature and correct image", () => {
    const weatherOption = weatherOptions[0]; // clear day
    render(
      <UserPreferencesContext.Provider
        value={{ temperatureUnit: "F" }}
      >
        <WeatherCard
          day={weatherOption.day}
          weather={weatherOption.weather}
          temp={75}
        />
      </UserPreferencesContext.Provider>
    );

    expect(screen.getByText("75°F")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", weatherOption.url);
  });
});
