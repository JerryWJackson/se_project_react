import { useState, useEffect } from "react";
import { getForecastWeather } from "../utils/weatherApi";

export function useWeather() {
  const [temp, setTemp] = useState({ F: 0, C: 0 });
  const [weather, setWeather] = useState("");
  const [isDay, setIsDay] = useState(false);

  useEffect(() => {
    getForecastWeather()
      .then((conditions) => {
        setTemp(conditions?.temperature?.temps);
        setWeather(conditions?.cond);
        setIsDay(
          conditions?.time > conditions?.sunrise &&
            conditions?.time < conditions?.sunset,
        );
      })
      .catch(console.error);
  }, []); // Depend on nothing, run once? Original App depended on [weather]? No, original App expected infinite loop if [weather]. Wait.

  return { temp, weather, isDay };
}
