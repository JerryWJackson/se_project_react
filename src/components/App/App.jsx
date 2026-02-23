// nonmodal component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
// context imports
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import { ModalContext } from "../../contexts/ModalContext";
// modal component imports
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// utility imports
import { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";
import { useWeather } from "../../hooks/useWeather";
import { useClothingItems } from "../../hooks/useClothingItems";

function App() {
  const { activeModal, handleOpenModal, handleCloseModal, modalPayload } =
    useContext(ModalContext);

  const {
    currentUser,
    isLoggedIn,
    authLoading,
    handleRegistration,
    handleLogin,
    handleUpdateUser,
    handleSignOut,
  } = useAuth();

  const { temp, weather, isDay } = useWeather();

  const {
    clothingItems,
    handleAddItem,
    handleDeleteItem,
    handleCardLike,
    itemsLoading,
  } = useClothingItems();

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [theme, setTheme] = useState("light");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleDeleteItemWrapper = (e) => {
    e.preventDefault();
    handleDeleteItem(modalPayload._id);
  };

  return (
    <div className="page" data-theme={theme}>
      <CurrentUserContext.Provider value={currentUser}>
        <UserPreferencesContext.Provider
          value={{
            temperatureUnit: currentTemperatureUnit,
            toggleTemperatureUnit: handleToggleSwitchChange,
            theme,
            toggleTheme,
          }}
        >
          <Header isLoggedIn={isLoggedIn} />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  day={isDay}
                  weather={weather}
                  temp={temp}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                    clothingItems={clothingItems}
                    onAddItem={handleAddItem}
                    onDeleteItem={handleDeleteItemWrapper}
                    handleUpdateUser={handleUpdateUser}
                    onSignOut={handleSignOut}
                    onCardLike={handleCardLike}
                    temp={temp}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          {activeModal === "addItem" && (
            <AddItemModal
              onClose={handleCloseModal}
              isOpen={activeModal === "addItem"}
              onAddItem={handleAddItem}
            />
          )}
          {activeModal === "previewItem" && (
            <ItemModal
              selectedCard={modalPayload || {}}
              name="previewItem"
              modalName={"previewItem"}
              onClose={handleCloseModal}
              handleOpenConfirmationModal={() =>
                handleOpenModal("confirm", modalPayload)
              }
            />
          )}
          {activeModal === "confirm" && (
            <DeleteConfirmModal
              selectedCard={modalPayload || {}}
              onClose={handleCloseModal}
              onDeleteItem={handleDeleteItemWrapper}
              isOpen={activeModal === "confirm"}
            />
          )}

          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              handleLogin={handleLogin}
              onSecondButtonClick={() => handleOpenModal("register")}
              isLoading={authLoading}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
              onRegistration={handleRegistration}
              onLogin={handleLogin}
              onSecondButtonClick={() => handleOpenModal("login")}
              isLoading={authLoading}
            />
          )}
          {activeModal === "editProfile" && (
            <EditProfileModal
              isOpen={activeModal === "editProfile"}
              closeActiveModal={handleCloseModal}
              handleUpdateUser={handleUpdateUser}
              isLoading={authLoading}
            />
          )}
        </UserPreferencesContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
