import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, handleOpenConfirmationModal }) => {
  const buttonText = "Delete Item";
  return (
    <div className="modal">
      <div className="modal__content">
        <button
          className="modal__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__item-image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <h3 className="modal__item-name">{selectedCard.name}</h3>
        <div className="modal__item-info_container">
          <div className="modal__item-weather">
            Weather: {selectedCard.weather}
          </div>
          <button
            className="modal__button-delete"
            type="button"
            onClick={handleOpenConfirmationModal}
          >
            {buttonText}
          </button>
          <p className="modal__item-id">{selectedCard._id}</p>
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
