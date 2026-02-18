import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Profile from "./Profile";
import { MemoryRouter } from "react-router-dom";
import { ModalContext } from "../../contexts/ModalContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";

describe("Profile", () => {
  it("renders correctly with user info and clothes section", () => {
    const handleOpenModal = vi.fn();
    const currentUser = { name: "Test User", avatar: "http://example.com/avatar.png" };
    const clothingItems = [
      { _id: "1", name: "Shirt", imageUrl: "url1", weather: "hot" },
      { _id: "2", name: "Jacket", imageUrl: "url2", weather: "cold" }
    ];
    const temp = { F: 86, C: 30 }; // Hot weather

    render(
      <MemoryRouter>
        <ModalContext.Provider value={{
          activeModal: "",
          handleOpenModal,
          handleCloseModal: vi.fn(),
          modalPayload: null
        }}>
          <UserPreferencesContext.Provider value={{ temperatureUnit: "F", toggleTemperatureUnit: vi.fn(), theme: "light" }}>
            <CurrentUserContext.Provider value={currentUser}>
              <Profile
                currentUser={currentUser}
                isLoggedIn={true}
                clothingItems={clothingItems}
                onAddItem={vi.fn()}
                onDeleteItem={vi.fn()}
                handleUpdateUser={vi.fn()}
                onSignOut={vi.fn()}
                temp={temp}
              />
            </CurrentUserContext.Provider>
          </UserPreferencesContext.Provider>
        </ModalContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Shirt")).toBeInTheDocument();
    // Jacket might be filtered out if weather logic applies?
    // ClothesSection logic: if temp >= 86 (hot), shows hot items.
    // Shirt is hot. Jacket is cold.
    // So Shirt should be visible. Jacket should NOT be visible?
    // Wait, let's verify ClothesSection logic.
  });
});
