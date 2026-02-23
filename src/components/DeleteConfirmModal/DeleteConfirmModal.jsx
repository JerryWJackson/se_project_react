import "./DeleteConfirmModal.css";
import PropTypes from "prop-types";

const DeleteConfirmModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const buttonConfirmText = "Yes, delete item";
  const buttonCancelText = "Cancel";
  return (
    <div className={`modal modal_opened`}>
      <div className="modal__content">
        <button
          className="modal__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal__delete-confirmation_container">
          <p className="modal__delete-confirmation_text">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__delete-confirmation_warning">
            This action is irreversible.
          </p>
          <button
            className="modal__button-delete"
            type="button"
            onClick={onDeleteItem}
          >
            {buttonConfirmText}
          </button>
          <button
            className="modal__button-cancel"
            type="button"
            onClick={onClose}
          >
            {buttonCancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmModal.propTypes = {
  selectedCard: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default DeleteConfirmModal;
