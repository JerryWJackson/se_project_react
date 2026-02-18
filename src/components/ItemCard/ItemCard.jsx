import "./ItemCard.css";
import PropTypes from "prop-types";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <div className="card_name">{item.name}</div>
      <img
        className="card_image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => onSelectCard(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelectCard(item);
          }
        }}
      />
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    _id: PropTypes.string,
    weather: PropTypes.string,
  }).isRequired,
  onSelectCard: PropTypes.func.isRequired,
};

export default ItemCard;
