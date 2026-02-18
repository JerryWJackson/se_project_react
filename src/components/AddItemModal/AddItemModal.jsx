import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ handleCloseModal, modalName, isOpen, onAddItem }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="addItem"
      isOpen={isOpen}
      modalName={modalName}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      buttonText="Add Item"
    >
      <div>
        <label className="modal__form_item">
          <p>Name</p>
          <input
            className="modal__input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label className="modal__form_item">
          <p>Image</p>
          <input
            className="modal__input"
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
          />
        </label>
        <fieldset className="weather-type-selector">
          <legend>Select the weather type:</legend>
          <div className="radio-button">
            <label className="radio-button_label">
              <input
                type="radio"
                id="hot"
                name="weather"
                value="hot"
                onChange={handleChange}
                checked={values.weather === "hot"}
              />
              Hot
            </label>
          </div>
          <div className="radio-button">
            <label className="radio-button_label">
              <input
                type="radio"
                id="warm"
                name="weather"
                value="warm"
                onChange={handleChange}
                checked={values.weather === "warm"}
              />
              Warm
            </label>
          </div>
          <div className="radio-button">
            <label className="radio-button_label">
              <input
                type="radio"
                id="cold"
                name="weather"
                value="cold"
                onChange={handleChange}
                checked={values.weather === "cold"}
              />
              Cold
            </label>
          </div>
        </fieldset>
      </div>
    </ModalWithForm>
  );
};

AddItemModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  modalName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default AddItemModal;
