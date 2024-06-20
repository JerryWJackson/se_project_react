import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  name,
  isOpen,
  onSubmit,
  altButton,
  altButtonText,
  logIn,
  handleAltButton,
}) => {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__content ${logIn ? "modal_content_login" : ""}`}>
        <button
          className="modal__button-close"
          type="button"
          onClick={onClose}
        />
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit}>
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
