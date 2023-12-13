import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({handleCloseModal, onAddItem, isOpen}) => {
  const [name, setName] = useState('');
  const handleNameChange = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
  }

  const [link, setUrl] = useState('');
  const handleURLChange = (e) => {
    console.log(e.target.value)
    setUrl(e.target.value)
  }

  const [weather, setWeather] = useState('');
  const handleWeatherChange = (e) => {
    console.log(e.target.value)
    setWeather(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather })
  }

  return(
    <ModalWithForm
            title="New Garment"
            name="addGarment"
            onClose={handleCloseModal}
            isOpen={isOpen}
            onSubmit={(e) => onAddItem(handleSubmit)}
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
                  name="link"
                  placeholder="Image URL"
                  value={link}
                  onChange={handleURLChange}
                />
              </label>
              <fieldset className="weather-type-selector"  value={weather} onChange={handleWeatherChange} >
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
  )
}

export default AddItemModal;