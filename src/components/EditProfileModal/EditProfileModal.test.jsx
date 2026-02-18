import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditProfileModal from "./EditProfileModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

describe("EditProfileModal", () => {
  it("renders correctly and submits new data", () => {
    const handleUpdateUser = vi.fn();
    const currentUser = { name: "Old Name", avatar: "old-url" };
    
    // Mock the modal portal mechanism if necessary, or just render. 
    // ModalWithForm likely renders into portal or direct?
    // ModalWithForm implementation check? Usually direct render in tests unless portal.
    
    render(
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfileModal
          activeModal="editProfile"
          modalName="editProfile"
          isOpen={true}
          closeActiveModal={vi.fn()}
          handleUpdateUser={handleUpdateUser}
        />
      </CurrentUserContext.Provider>
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const avatarInput = screen.getByLabelText(/Avatar URL/i);

    expect(nameInput.value).toBe("Old Name");
    
    fireEvent.change(nameInput, { target: { value: "New Name" } });
    fireEvent.change(avatarInput, { target: { value: "new-url" } });
    
    fireEvent.click(screen.getByText("Save"));
    
    expect(handleUpdateUser).toHaveBeenCalledWith({ name: "New Name", avatar: "new-url" });
  });
});
