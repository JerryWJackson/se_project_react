import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div className="card">
        <img className="card_image" src={item.link} onClick={() => onSelectCard(item)} />
      </div>
      <div className="card_name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
