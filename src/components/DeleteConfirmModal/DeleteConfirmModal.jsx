import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const buttonConfirmText = "Yes, delete item";
  const buttonCancelText = "Cancel";
  return (
    <div className="modal">
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
          <p className="modal__item-id">{selectedCard._id}</p>
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmModal;
