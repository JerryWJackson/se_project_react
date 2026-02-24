import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToggleSwitch from "./ToggleSwitch";
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";

describe("ToggleSwitch", () => {
  it("renders correctly", () => {
    render(
      <UserPreferencesContext.Provider
        value={{ temperatureUnit: "F", toggleTemperatureUnit: vi.fn() }}
      >
        <ToggleSwitch />
      </UserPreferencesContext.Provider>,
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("calls toggleTemperatureUnit when clicked", () => {
    const toggleTemperatureUnit = vi.fn();
    render(
      <UserPreferencesContext.Provider
        value={{ temperatureUnit: "F", toggleTemperatureUnit }}
      >
        <ToggleSwitch />
      </UserPreferencesContext.Provider>,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(toggleTemperatureUnit).toHaveBeenCalled();
  });
});

export { ToggleSwitch };
