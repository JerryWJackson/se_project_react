// nonmodal component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
// modal component imports
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// context imports
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  CurrentUserProvider,
  PassCurrentUserProvider,
} from "../../contexts/CurrentUserContext.jsx";
// utility imports
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getForecastWeather } from "../../utils/weatherApi";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import { getToken, handleToken, checkToken } from "../../utils/token";
// css imports
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weather, setWeather] = useState("");
  const [isDay, setIsDay] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                                User Methods                                */
  /* -------------------------------------------------------------------------- */
  const handleRegistration = ({ user }) => {
    auth
      .register({ user })
      .then((res) => {
        console.log("registration response is ", res);
        // console.log("app.jsx/L52 user is ", user);
        PassCurrentUserProvider.setCurrentUser(res);
        setIsLoggedIn(true);
        console.log("logging user in");
        handleLogin(res.email, res.password);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleLogin = (email, password) => {
    setIsLoading(true);
    console.log("attempting to log in user", email);
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          handleToken(data.token);
          auth.getUserData(data.token).then((user) => {
            PassCurrentUserProvider.setCurrentUser(user.email, user.password);
          });
          setIsLoggedIn(true);
          handleCloseModal();
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkLoggedIn = (tokenToCheck) => {
    const tokenStatus = checkToken(tokenToCheck);
    // console.log("tokenStatus", tokenStatus);
    if (tokenStatus) {
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  const handleUpdateUser = (values) => {
    const jwt = localStorage.getItem("jwt");
    auth
      .updateUserProfile(values, jwt)
      .then((res) => PassCurrentUserProvider.setCurrentUser(res));
  };

  const handleSignOut = () => {
    handleToken();
    PassCurrentUserProvider.setCurrentUser({});
    setIsLoggedIn(false);
    handleCloseModal();
    navigate.push("/");
  };

  /* -------------------------------------------------------------------------- */
  /*                                Item Methods                                */
  /* -------------------------------------------------------------------------- */
  const onAddItem = (values, token) => {
    console.log("new item values", values);
    api
      .addNewItem(values, token)
      .then((item) => {
        const newItemList = Array.from(clothingItems);
        newItemList.push(item);
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch((err) => console.log("Error:", err));
  };

  const onDeleteItem = (e) => {
    e.preventDefault();
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        const newItemList = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch((err) => console.log("Error:", err));
  };

  /* -------------------------------------------------------------------------- */
  /*                                Modal Methods                               */
  /* -------------------------------------------------------------------------- */

  const handleCloseModal = () => {
    setActiveModal("");
  };

  // available modals are =>
  //   login, (login existing user)
  //   register, (register new user)
  //   preview, (card preview)
  //   confirm, (confirm deletion)
  //   edit, (edit profile)
  //   create (create item)
  const handleOpenModal = (modal) => {
    if (modal === "preview") {
      setSelectedCard(EventTarget);
    }
    setActiveModal(modal);
  };

  /* -------------------------------------------------------------------------- */
  /*                                Other Methods                               */
  /* -------------------------------------------------------------------------- */

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  /* -------------------------------------------------------------------------- */
  /*                              useEffect methods                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    getForecastWeather()
      .then((conditions) => {
        // console.log("conditions are", conditions);
        setTemp(conditions?.temperature?.temps);
        setWeather(conditions?.cond);
        setIsDay(
          conditions?.time > conditions?.sunrise &&
            conditions?.time < conditions?.sunset
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err);
      });
  }, []);

  useEffect(() => {
    api
      .fetchAllClothing()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error: An error occurred", error);
      });
  }, []);

  useEffect(() => {
    const jwt = getToken();
    let tokenCheckStatus = checkLoggedIn(jwt);
    if (tokenCheckStatus === true) {
      handleToken(jwt);
      auth
        .getUserData(jwt)
        .then((data) => {
          PassCurrentUserProvider.setCurrentUser(data);
        })
        .catch((err) => {
          if (err.response && err.resonse.status === 401) {
            console.error("Token invalid or expired. Logging you out...");
            handleSignOut();
          } else {
            console.error("Error fetching user data:", err);
          }
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [handleSignOut]);

  return (
    <div className="page">
      <CurrentUserProvider>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onCreateModal={() => handleOpenModal("create")}
            onRegister={() => handleOpenModal("register")}
            onLogin={() => handleOpenModal("login")}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    isLoggedIn={isLoggedIn}
                    handleCloseModal={handleCloseModal}
                    onActiveModal={() => handleOpenModal("create")}
                    onEditProfile={() => handleOpenModal("edit")}
                    onAddItem={onAddItem}
                    onDeleteItem={() => handleOpenModal("confirm")}
                    onSelectCard={() => handleOpenModal("preview")}
                    setClothingItems={clothingItems}
                    onEditUser={handleUpdateUser}
                    onSignOut={handleSignOut}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              exact
              path="/"
              element={
                <Main
                  day={isDay}
                  weather={weather}
                  temp={temp}
                  onSelectCard={() => handleOpenModal("preview")}
                  setClothingItems={clothingItems}
                  // onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              name="previewGarment"
              onClose={handleCloseModal}
              handleOpenConfirmationModal={() => handleOpenModal("confirm")}
            />
          )}
          {activeModal === "confirm" && (
            <DeleteConfirmModal
              selectedCard={selectedCard}
              name="deleteConfirm"
              onClose={handleCloseModal}
              onDeleteItem={onDeleteItem}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              onClose={handleCloseModal}
              handleLogin={handleLogin}
              onSecondButtonClick={() => handleOpenModal("register")}
              setActiveModal={setActiveModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              onClose={handleCloseModal}
              onRegistration={handleRegistration}
              onLogin={handleLogin}
              onSecondButtonClick={() => handleOpenModal("login")}
              setActiveModal={setActiveModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              isOpen={() => handleOpenModal("edit")}
              onClose={handleCloseModal}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
