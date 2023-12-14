import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { getForecastWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { fetchAllClothing, addNewItem, deleteItem } from "../../utils/api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weather, setWeather] = useState("");
  const [isDay, setIsDay] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const onAddItem = (values) => {
    addNewItem(values)
      .then((res) => {
        console.log(res);
        console.log(clothingItems);
        // setClothingItems(res);
        // clothingItems.append(res);
        handleCloseModal();
        window.location.reload();
      })
      .catch((err) => console.log("Error:", err));
  };

  const openConfirmationModal = (e) => {
    console.log('fired delete confirmation modal!')
    onDeleteItem(e);
    handleCloseModal();
  };

  const onDeleteItem = (e) => {
    e.preventDefault();
    deleteItem(selectedCard._id)
      .then((res) => {
        console.log(res);
        handleCloseModal();
        window.location.reload();
      })
      .catch((err) => console.log("Error:", err));
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getForecastWeather()
      .then((conditions) => {
        setTemp(conditions?.temperature?.temps);
        setWeather(conditions?.cond);
        if (
          conditions?.time > conditions?.sunrise &&
          conditions?.time < conditions?.sunset
        ) {
          setIsDay(true);
        } else {
          setIsDay(false);
        }
      })
      .catch((err) => {
        console.error("An error occurred:", err);
      });
    fetchAllClothing().then((res) => {
      console.log(res);
      setClothingItems(res);
    });
  }, []);

  // console.log('App.js --', currentTemperatureUnit);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Switch>
          <Route exact path="/profile">
            <Profile
              handleCloseModal={handleCloseModal}
              onCreateModal={handleCreateModal}
              onAddItem={onAddItem}
              onDeleteItem={onDeleteItem}
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
        {activeModal == "confirm" && (
          <DeleteConfirmModal
            selectedCard={selectedCard}
            name="deleteConfirm"
            onClose={handleCloseModal}
            onDeleteItem={onDeleteItem}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
