import "./ItemCard.css";
import PropTypes from "prop-types";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import { getToken } from "../../utils/token";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    item.likes &&
    item.likes.some((id) => String(id) === String(currentUser?._id));

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked }, getToken());
  };

  return (
    <div className="card">
      <div className="card__header">
        <div className="card_name">{item.name}</div>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
          />
        )}
      </div>
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
    likes: PropTypes.array,
  }).isRequired,
  onSelectCard: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};

export default ItemCard;
