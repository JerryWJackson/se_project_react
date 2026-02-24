import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import * as api from "../../utils/api";
import * as weatherApi from "../../utils/weatherApi";
import * as auth from "../../utils/auth";
import * as token from "../../utils/token";

// Mock the modules
vi.mock("../../utils/api");
vi.mock("../../utils/weatherApi");
vi.mock("../../utils/auth");
vi.mock("../../utils/token");

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    weatherApi.getForecastWeather.mockResolvedValue({
      temperature: { F: 75, C: 24, temps: 75 },
      cond: "clear",
      time: Date.now(),
      sunrise: Date.now() - 1000,
      sunset: Date.now() + 1000,
    });

    api.fetchAllClothing.mockResolvedValue([]);
    token.getToken.mockReturnValue("fake-token");
    auth.checkToken.mockResolvedValue({ status: true });
    auth.getUserData.mockResolvedValue({
      name: "Test User",
      avatar: "avatar.png",
    });
  });

  it("renders main page routes", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
      );
    });
    // Expect header logo or text to be present
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});

export { App };
