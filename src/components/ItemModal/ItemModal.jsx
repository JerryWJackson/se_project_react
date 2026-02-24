import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import PropTypes from "prop-types";

const ItemModal = ({ selectedCard, onClose, handleOpenConfirmationModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser?._id;
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;
  return (
    <div className={`modal modal_opened`}>
      <div className="modal__content">
        <button
          className="modal__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal__image-container">
          <img
            className="modal__item-image"
            src={selectedCard.imageUrl}
            alt={selectedCard.name}
          />
        </div>
        <div className="modal__item-info_container">
          <div className="modal__item-header">
            <p className="modal__item-name">{selectedCard.name}</p>
            {isOwn && (
              <button
                className={itemDeleteButtonClassName}
                type="button"
                onClick={handleOpenConfirmationModal}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__item-weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
};

ItemModal.propTypes = {
  selectedCard: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleOpenConfirmationModal: PropTypes.func.isRequired,
};

export default ItemModal;
