import './ItemModal.css'

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className="modal">
      <div className="modal__content">
      <button className='modal__button-close' type="button" onClick={onClose}></button>
        <img className='modal__item-image' src={selectedCard.link} alt={selectedCard.name} />
        <h3 className='modal__item-name'>{selectedCard.name}</h3>
        <div className='modal__item-weather'>Weather: {selectedCard.weather}</div>
      </div>
    </div>
  );
};
export default ItemModal;
