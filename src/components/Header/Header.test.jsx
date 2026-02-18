import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { ModalContext } from "../../contexts/ModalContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";

describe("Header", () => {
  it("renders correctly when not logged in", () => {
    const handleOpenModal = vi.fn();
    render(
      <MemoryRouter>
        <ModalContext.Provider value={{ handleOpenModal }}>
          <UserPreferencesContext.Provider value={{ temperatureUnit: "F", toggleTemperatureUnit: vi.fn(), theme: "light" }}>
            <CurrentUserContext.Provider value={null}>
              <Header isLoggedIn={false} />
            </CurrentUserContext.Provider>
          </UserPreferencesContext.Provider>
        </ModalContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  it("renders correctly when logged in", () => {
    const handleOpenModal = vi.fn();
    const currentUser = { name: "Test User", avatar: "http://example.com/avatar.png" };
    render(
      <MemoryRouter>
        <ModalContext.Provider value={{ handleOpenModal }}>
          <UserPreferencesContext.Provider value={{ temperatureUnit: "F", toggleTemperatureUnit: vi.fn(), theme: "light" }}>
            <CurrentUserContext.Provider value={currentUser}>
              <Header isLoggedIn={true} />
            </CurrentUserContext.Provider>
          </UserPreferencesContext.Provider>
        </ModalContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Test User/i })).toHaveAttribute("src", currentUser.avatar);
  });
});
