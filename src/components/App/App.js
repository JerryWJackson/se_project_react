import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect, useState } from "react";
import { getForecastWeather } from "../../utils/weatherApi";

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
      <div className="page">
        <Header onCreateModal={handleCreateModal} />
        <Main
          day={isDay}
          weather={weather}
          temp={temp}
          onSelectCard={handleSelectedCard}
        />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            title="New Garment"
            name='addGarment'
            onClose={handleCloseModal}
          >
            <div>
              <label className="modal__form_item">
                <p>Name</p>
                <input
                  className="modal__form_input"
                  type="text"
                  name="name"
                  minLength="1"
                  maxLength="30"
                  placeholder="Name"
                />
              </label>
              <label className="modal__form_item">
                <p>Image</p>
                <input
                  className="modal__form_input"
                  type="url"
                  name="link"
                  placeholder="Image URL"
                />
              </label>
              <div className="radio-container">
                <p>Select the weather type:</p>
                <div className="radio-button">
                  <input type="radio" id="hot" value="hot" />
                  <label className="radio-button_label">Hot</label>
                </div>
                <div className="radio-button">
                  <input type="radio" id="warm" value="warm" />
                  <label className="radio-button_label">Warm</label>
                </div>
                <div className="radio-button">
                  <input type="radio" id="cold" value="cold" />
                  <label className="radio-button_label">Cold</label>
                </div>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            name='previewGarment'
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
}

export default App;
