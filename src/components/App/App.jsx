// nonmodal component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
// context imports
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";
// modal component imports
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// utility imports
import { useEffect, useState } from "react";
import { Navigate, Route, Switch, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getForecastWeather } from "../../utils/weatherApi";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import { handleOpenModal, handleCloseModal } from "../../utils/modals";
import { getToken, handleToken, checkToken } from "../../utils/token";
// css imports
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [activeModalIndex, setActiveModalIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState([]);
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
        setCurrentUser(res);
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
    // const reRender = () => {
    //   setIsLoggedIn((isLoggedIn) => ++isLoggedIn);
    // };
    console.log("attempting to log in user", email);
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          handleToken(data.token);
          auth.getUserData(data.token).then((user) => {
            setCurrentUser(user);
            let currentUser = user;
            console.log("currentUser is ", currentUser);
            setIsLoggedIn(true);
          });
          api
            .fetchAllClothing()
            .then((items) => {
              setClothingItems(items);
              console.log("setting clothing items array to ", clothingItems);
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
    console.log("tokenStatus", tokenStatus);
    if (tokenStatus) {
      setIsLoggedIn(true);
      api
        .fetchAllClothing()
        .then((items) => {
          setClothingItems(items);
          console.log("setting clothing items array to ", clothingItems);
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
    const jwt = localStorage.getItem("jwt");
    auth.updateUserProfile(values, jwt).then((res) => setCurrentUser(res));
  };

  const handleSignOut = () => {
    handleToken();
    setCurrentUser(currentUser === null);
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
        console.log("setting clothing items array to ", clothingItems);
      })
      .catch((error) => {
        console.error("Error: An error occurred", error);
      });
  };

  const onAddItem = (values) => {
    // console.log("new item values", values);
    api
      .addNewItem(values)
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
  // const modalList = [
  //   ""
  //   "login",
  //   "register",
  //   "preview",
  //   "confirm",
  //   "edit",
  //   "create"
  // ]

  // pass these in to any Component using the methods found in modals.js
  //     activeModal={modal === activeModal}
  //     onShow={() => setActiveModal(modal)}

  // pass these in to any Component using the handleOpenModal method found in modals.js
  //     selectedCard={item === card}
  //     onSelectCard={(card) => setSelectedCard(card)}

  const handleOpenModal = (modal) => {
    if (modal === "preview") {
      setSelectedCard(EventTarget);
    }
    setActiveModal(modal);
    console.log("active modal is ", modal);
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
  }, [weather]);

  useEffect(() => {
    console.log("isLoggedIn state: ", isLoggedIn);
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
          console.log("currentUser updated to ", currentUser);
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
      <CurrentUserProvider>
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
          <Switch>
            <Route exact path="/">
              <Main
                day={isDay}
                weather={weather}
                temp={temp}
                onSelectCard={() => handleOpenModal("preview")}
                setClothingItems={clothingItems}
                // onCardLike={handleCardLike}
                isLoggedIn={isLoggedIn}
              />
            </Route>
            <Route path="/profile">
              <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  clothingItems={clothingItems}
                  handleCloseModal={handleCloseModal}
                  handleOpenModal={handleOpenModal}
                  onEditProfile={() => handleOpenModal("edit")}
                  activeModal={activeModal}
                  onAddItem={onAddItem}
                  onDeleteItem={() => handleOpenModal("confirm")}
                  onSelectCard={() => handleOpenModal("preview")}
                  handleUpdateUser={handleUpdateUser}
                  onSignOut={handleSignOut}
                  temp={temp}
                />
              </ProtectedRoute>
            </Route>
          </Switch>
          <Footer />
          {activeModal === "addGarment" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              modalName={"addGarment"}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              name="previewGarment"
              modalName={"previewGarment"}
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
              name="login"
              modalName={"login"}
              isOpen={activeModal === "login" ? "true" : "false"}
              closeActiveModal={handleCloseModal}
              handleLogin={handleLogin}
              onSecondButtonClick={() => handleOpenModal("register")}
              setActiveModal={setActiveModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              name="register"
              modalName={"register"}
              isOpen={activeModal === "register" ? "true" : "false"}
              closeActiveModal={handleCloseModal}
              onRegistration={handleRegistration}
              onLogin={handleLogin}
              onSecondButtonClick={() => handleOpenModal("login")}
              setActiveModal={setActiveModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
