const BASE = "https://api.openweathermap.org/data/2.5";
const KEY = import.meta.env.VITE_WEATHER_API_KEY;

async function get(endpoint, city, units) {
  const res = await fetch(
    `${BASE}/${endpoint}?q=${encodeURIComponent(city)}&units=${units}&appid=${KEY}`
  );
  if (!res.ok) {
    throw new Error(res.status === 404 ? "City not found" : "Something went wrong");
  }
  return res.json();
}

export async function fetchWeather(city, units = "metric") {
  const [current, forecast] = await Promise.all([
    get("weather", city, units),
    get("forecast", city, units),
  ]);

  const daily = forecast.list.filter((item) => item.dt_txt.includes("12:00:00"));
  const hourly = forecast.list.slice(0, 8);

  return { current, daily, hourly };
}