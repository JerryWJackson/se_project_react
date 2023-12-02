import { defaultClothingItems } from "../../utils/constants"
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css';

function Main({ weatherTemp, onSelectCard}) {
  return <main className="main">
    <WeatherCard day={false} type={"storm"} weatherTemp={weatherTemp} />
    <section className="card_section" id="card-section">
      <p className="card_section-title">Today is {weatherTemp} / You may want to wear:</p>
      <div className="card_items">
        {defaultClothingItems.map((item) => {
          return <ItemCard item={item} key={item._id} onSelectCard={onSelectCard} />;
        })}
      </div>
    </section>
  </main>;
}

export default Main