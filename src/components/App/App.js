import Header from "../Header/Header";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Header />
        <main className="main">
          <WeatherCard day={false} type={"storm"} />
          <section id="card-section"></section>
        </main>
      </div>
    </>
  );
}

export default App;
