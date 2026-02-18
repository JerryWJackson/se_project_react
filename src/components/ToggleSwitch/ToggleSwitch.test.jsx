import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToggleSwitch from "./ToggleSwitch";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

describe("ToggleSwitch", () => {
  it("renders correctly", () => {
    render(
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit: "F", handleToggleSwitchChange: vi.fn() }}
      >
        <ToggleSwitch />
      </CurrentTemperatureUnitContext.Provider>
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("calls handleToggleSwitchChange when clicked", () => {
    const handleToggleSwitchChange = vi.fn();
    render(
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit: "F", handleToggleSwitchChange }}
      >
        <ToggleSwitch />
      </CurrentTemperatureUnitContext.Provider>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleToggleSwitchChange).toHaveBeenCalled();
  });
});
