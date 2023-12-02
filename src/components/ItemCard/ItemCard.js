import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div className="card">
      <div className="card_name">{item.name}</div>
        <img className="card_image" src={item.link} alt={item.name} onClick={() => onSelectCard(item)} />
      </div>
    </div>
  );
};

export default ItemCard;
