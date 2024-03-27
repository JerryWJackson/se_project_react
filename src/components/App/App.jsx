// nonmodal component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
// modal component imports
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
// import LoginModal from "../LogInModal/LoginModal";
// import RegisterModal from "../RegisterModal/RegisterModal";
// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// context imports
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// utility imports
import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { getForecastWeather } from "../../utils/weatherApi";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
// css imports
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [weather, setWeather] = useState("");
  const [isDay, setIsDay] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory("");
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = ({
    name,
    avatar,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .register(name, avatar, password, email)
        .then(() => {
          // TODO: handle succesful registration
        })
        .catch(console.error);
    }
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const onAddItem = (values) => {
    api.addNewItem(values)
      .then((item) => {
        const newItemList = Array.from(clothingItems);
        newItemList.push(item);
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch((err) => console.log("Error:", err));
  };

  const openConfirmationModal = (e) => {
    handleCloseModal();
    setActiveModal("confirm");
  };

  const onDeleteItem = (e) => {
    e.preventDefault();
    api.deleteItem(selectedCard._id)
      .then(() => {
        const newItemList = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch((err) => console.log("Error:", err));
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };


  function handleOpenItemModal() {
    setActiveModal("preview");
  }

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit");
  };

  const registerUser = (values) => {
    handleSubmit(() => register(values).then(() => loginUser(values)));
  };

  const loginUser = (user) => {
    setIsLoading(true);

    return login(user)
      .then((res) => {
        checkLoggedIn(res.token);
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
        handleCloseModal();
        history.push("/profile");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function checkLoggedIn(token) {
    return checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const updateUser = (values) => {
    const jwt = localStorage.getItem("jwt");
    handleSubmit(() =>
      update(values, jwt).then((res) => setCurrentUser(res))
    );
  };


  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setLoggedIn(false);
    setCurrentUser(null);
    history.push("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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
  }, []);

  useEffect(() => {
    api.fetchAllClothing()
      .then((items) => {
        console.log(items);
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error: An error occurred", error);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkLoggedIn(jwt)
        .then(() => {
          setToken(jwt);
          getUserData(jwt)
            .then((res) => {
              setCurrentUser(res.data);
            })
            .catch((err) => {
              if (err.response && err.resonse.status === 401) {
                console.error("Token invalid or expired. Logging you out...");
                onSignOut();
              } else {
                console.error("Error fetching user data:", err);
              }
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} />
          <Switch>
            <Route exact path="/register">
              <Register handleRegistration={handleRegistration} />
            </Route>
            <Route exact path="/profile">
              <Profile
                handleCloseModal={handleCloseModal}
                onCreateModal={handleCreateModal}
                onAddItem={onAddItem}
                onDeleteItem={openConfirmationModal}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
            <Route path="/">
              <Main
                day={isDay}
                weather={weather}
                temp={temp}
                onSelectCard={handleSelectedCard}
                setClothingItems={clothingItems}
              />
            </Route>
          </Switch>
          {activeModal === "login" && (
            <LoginModal
              onClose={handleCloseModal}
              loginUser={loginUser}
              openLoginModal={handleOpenLoginModal}
              openRegisterModal={handleOpenRegisterModal}
            />
          )}

          {activeModal === "register" && (
            <RegisterModal
              onClose={handleCloseModal}
              registerUser={registerUser}
              openLoginModal={handleOpenLoginModal}
              openRegisterModal={handleOpenRegisterModal}
            />
          )}
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              onAddItem={onAddItem}
              isOpen={activeModal === "create"}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              name="previewGarment"
              onClose={handleCloseModal}
              openConfirmationModal={openConfirmationModal}
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
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
