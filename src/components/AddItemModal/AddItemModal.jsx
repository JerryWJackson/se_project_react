import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem }) => {
  const buttonText = "Add Item";
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleURLChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="addGarment"
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      buttonText={buttonText}
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
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__form_item">
          <p>Image</p>
          <input
            className="modal__form_input"
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleURLChange}
          />
        </label>
        <fieldset
          className="weather-type-selector"
          value={weather}
          onChange={handleWeatherChange}
        >
          <legend>Select the weather type:</legend>
          <div className="radio-button">
            <label className="radio-button_label">
              <input type="radio" id="hot" name="type" value="hot" />
              Hot
            </label>
          </div>
          <div className="radio-button">
            <label className="radio-button_label">
              <input type="radio" id="warm" name="type" value="warm" />
              Warm
            </label>
          </div>
          <div className="radio-button">
            <label className="radio-button_label">
              <input type="radio" id="cold" name="type" value="cold" />
              Cold
            </label>
          </div>
        </fieldset>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
