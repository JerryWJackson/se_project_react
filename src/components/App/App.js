import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState("");
  const [isDay, setIsDay] = useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather().then((conditions) => {
      setTemp(conditions?.temp);
      setWeather(conditions?.cond);
      if (
        conditions?.time > conditions?.sunrise &&
        conditions?.time < conditions?.sunset
      ) {
        setIsDay(true);
      } else {
        setIsDay(false);
      }
    });
  });

  return (
    <>
      <div>
        <Header onCreateModal={handleCreateModal} />
        <Main
          day={isDay}
          weather={weather}
          temp={temp}
          onSelectCard={handleSelectedCard}
        />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm title="New Garment" onClose={handleCloseModal}>
            <label>
              Name
              <input
                type="text"
                name="name"
                minLength="1"
                maxLength="30"
                placeholder="Enter name of garment"
              />
            </label>
            <label>
              Image
              <input type="url" name="link" placeholder="Enter link to image" />
            </label>
            <p>Select the weather type:</p>
            <div>
              <div>
                <input type="radio" id="hot" value="hot" />
                <label>Hot</label>
              </div>
              <div>
                <input type="radio" id="warm" value="warm" />
                <label>Warm</label>
              </div>
              <div>
                <input type="radio" id="cold" value="cold" />
                <label>Cold</label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
}

export default App;
