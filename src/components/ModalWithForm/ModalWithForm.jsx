import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  closeActiveModal,
  modalName,
  formName,
  isOpen,
  onSubmit,
  altButton,
  altButtonText,
  handleAltButton,
}) => {
  return (
    <div
      className={`modal modal_type_${modalName} ${
        isOpen ? "modal_opened" : ""
      }`}
    >
      <div className={"modal__content"}>
        <button
          className="modal__button-close"
          type="button"
          onClick={closeActiveModal}
        />
        <h3 className="modal__title">{title}</h3>
        <form name={formName} onSubmit={onSubmit}>
          {children}
          <p className="button__container">
            <button
              className={`modal__button modal__button-submit ${
                altButton ? "modal__submit-button-v2" : ""
              }`}
              type="submit"
            >
              {buttonText}
            </button>
            {altButton ? (
              <button
                className="modal__button modal__button-login"
                type="button"
                onClick={handleAltButton}
              >
                {altButtonText}
              </button>
            ) : (
              <></>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
