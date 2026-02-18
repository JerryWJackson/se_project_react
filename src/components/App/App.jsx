// nonmodal component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
// context imports
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
// modal component imports
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// utility imports
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getForecastWeather } from "../../utils/weatherApi";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import { getToken, handleToken, checkToken } from "../../utils/token";


function App() {
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
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

        setCurrentUser(res);
        setIsLoggedIn(true);

        handleLogin(res.email, res.password);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleLogin = (email, password) => {
    setIsLoading(true);
    // const reRender = () => {
    //   setIsLoggedIn((isLoggedIn) => ++isLoggedIn);
    // };

    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          handleToken(data.token);
          auth.getUserData(data.token).then((user) => {
            setCurrentUser(user);
            let currentUser = user;

            setIsLoggedIn(true);
          });
          api
            .fetchAllClothing()
            .then((items) => {
              setClothingItems(items);

            })
            .catch((error) => {
              console.error("Error: An error occurred", error);
            });
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

    if (tokenStatus) {
      setIsLoggedIn(true);
      api
        .fetchAllClothing()
        .then((items) => {
          setClothingItems(items);

        })
        .catch((error) => {
          console.error("Error: An error occurred", error);
        });
      return true;
    } else {
      return false;
    }
  };

  const handleUpdateUser = (values) => {
    const jwt = getToken();
    auth.updateUserProfile(values, jwt).then((res) => setCurrentUser(res));
  };

  const handleSignOut = () => {
    handleToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    handleCloseModal();
    navigate("/");
  };

  /* -------------------------------------------------------------------------- */
  /*                                Item Methods                                */
  /* -------------------------------------------------------------------------- */

  const fetchAllItems = () => {
    api
      .fetchAllClothing()
      .then((items) => {
        setClothingItems(items);

      })
      .catch((error) => {
        console.error("Error: An error occurred", error);
      });
  };

  const handleAddItem = (values) => {

    api
      .addNewItem(values)
      .then((item) => {
        const newItemList = Array.from(clothingItems);
        newItemList.push(item);
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleDeleteItem = (e) => {
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
      .catch((err) => console.error("Error:", err));
  };

  /* -------------------------------------------------------------------------- */
  /*                                Modal Methods                               */
  /* -------------------------------------------------------------------------- */

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleOpenModal = (modal) => {
    if (modal === "previewItem") {
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
  }, [weather]);

  useEffect(() => {

  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = getToken();
    let tokenCheckStatus = checkLoggedIn(jwt);
    if (tokenCheckStatus === true) {
      handleToken(jwt);

      auth
        .getUserData(jwt)
        .then((data) => {
          setCurrentUser(data);

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
  }, []);

  // useEffect(() => {
  //   let ignore = false;

  //   if (!ignore) fetchAllItems();
  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onCreateModal={() => handleOpenModal("create")}
            onRegister={() => handleOpenModal("register")}
            onLogin={() => handleOpenModal("login")}
            isLoggedIn={isLoggedIn}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route exact path="/" element={
              <Main
                day={isDay}
                weather={weather}
                temp={temp}
                onSelectCard={() => handleOpenModal("previewItem")}
                setClothingItems={clothingItems}
                // onCardLike={handleCardLike}
                isLoggedIn={isLoggedIn}
              />
            } />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  clothingItems={clothingItems}
                  handleCloseModal={handleCloseModal}
                  handleOpenModal={handleOpenModal}
                  onEditProfile={() => handleOpenModal("edit")}
                  activeModal={activeModal}
                  onAddItem={handleAddItem}
                  onDeleteItem={handleDeleteItem}
                  onSelectCard={() => handleOpenModal("previewItem")}
                  handleUpdateUser={handleUpdateUser}
                  onSignOut={handleSignOut}
                  temp={temp}
                />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
          {activeModal === "addItem" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "addItem"}
              onAddItem={handleAddItem}
            />
          )}
          {activeModal === "previewItem" && (
            <ItemModal
              selectedCard={selectedCard}
              name="previewItem"
              modalName={"previewItem"}
              onClose={handleCloseModal}
              handleOpenConfirmationModal={() => handleOpenModal("confirm")}
            />
          )}

          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
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
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
              onRegistration={handleRegistration}
              onLogin={handleLogin}
              onSecondButtonClick={() => handleOpenModal("login")}
              setActiveModal={setActiveModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {activeModal === "editProfile" && (
            <EditProfileModal
              isOpen={activeModal === "edit"}
              onClose={handleCloseModal}
              onSubmit={handleEditProfile}
              isLoading={isLoading}
              onCreateModal={handleEditModal}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
