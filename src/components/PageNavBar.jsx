import styles from "./PageNavBar.module.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function PageNavBar({ location }) {
  let [weatherData, setWeatherData] = useState();
  let [cityName, setCityName] = useState("");
  const [hasError, setHasError] = useState(false);

  // refs for debounce and last-request tracking
  const debounceRef = useRef(null);
  const useEffectLastRef = useRef({ lat: null, lon: null });

  async function getData(lat, lon) {
    // lat/lon should be strings (toFixed) passed from the caller
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_mean&current=temperature_2m,weather_code&timezone=auto&forecast_days=2`;
    const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    console.log(`Fetching weather from: ${weatherUrl}`);
    console.log(`Fetching geo data from: ${geoUrl}`);

    setHasError(false);
    try {
      // Fetch Weather
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) {
        throw new Error(`Weather response status: ${weatherResponse.status}`);
      }
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);
      console.log(weatherResult);

      // Fetch City Name
      const geoResponse = await fetch(geoUrl);
      if (geoResponse.ok) {
        const geoResult = await geoResponse.json();
        // Try to find the most relevant name: city, locality, or principalSubdivision
        const name = geoResult.city || geoResult.locality || geoResult.principalSubdivision || "";
        setCityName(name);
      }
    } catch (error) {
      console.error(error.message);
      setHasError(true);
    }
  }

  // Fetch weather on mount and whenever `location` changes
  useEffect(() => {
    // Debounce rapid `location` updates (e.g. from watchPosition)
    const lat =
      location && location.coords && typeof location.coords.latitude === "number"
        ? location.coords.latitude.toFixed(4)
        : null;
    const lon =
      location && location.coords && typeof location.coords.longitude === "number"
        ? location.coords.longitude.toFixed(4)
        : null;

    // If no lat/lon yet, still try with defaults once on mount
    const finalLat = lat ?? "49.2663";
    const finalLon = lon ?? "-122.9526";

    // skip duplicate requests for the same coords
    if (!useEffectLastRef.current) useEffectLastRef.current = { lat: null, lon: null };

    // clear previous debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const last = useEffectLastRef.current;
      if (last.lat === finalLat && last.lon === finalLon) {
        // same coords as last request, skip
        return;
      }
      // update last requested
      useEffectLastRef.current = { lat: finalLat, lon: finalLon };
      console.log(`PageNavBar: Using coords lat=${finalLat}, lon=${finalLon}`);
      getData(finalLat, finalLon);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [location]);

  // Map open-meteo weather codes to descriptions + emoji
  function weatherCodeInfo(code) {
    if (code == null) return { desc: "--", emoji: "❓" };
    const c = Number(code);
    if (Number.isNaN(c)) return { desc: "--", emoji: "❓" };

    const mapping = [
      { codes: [0], desc: "Clear Sky", emoji: "☀️" },
      { codes: [1], desc: "Mainly Clear", emoji: "🌤️" },
      { codes: [2], desc: "Partly Cloudy", emoji: "⛅" },
      { codes: [3], desc: "Overcast", emoji: "☁️" },
      { codes: [45, 48], desc: "Fog", emoji: "🌫️" },
      { codes: [51, 53, 55, 56, 57], desc: "Drizzle", emoji: "🌦️" },
      { codes: [61, 63, 65, 66, 67], desc: "Rain", emoji: "🌧️" },
      { codes: [71, 73, 75], desc: "Snow Fall", emoji: "❄️" },
      { codes: [77], desc: "Snow Grains", emoji: "❄️" },
      { codes: [80, 81, 82], desc: "Rain Showers", emoji: "🌧️" },
      { codes: [85, 86], desc: "Snow Showers", emoji: "❄️" },
      { codes: [95], desc: "Thunderstorm", emoji: "⛈️" },
      { codes: [96, 99], desc: "Thunderstorm with Hail", emoji: "⛈️🧊" },
    ];

    for (const g of mapping) {
      if (g.codes.includes(c)) return { desc: g.desc, emoji: g.emoji };
    }

    return { desc: "Unknown", emoji: "❓" };
  }

  // compute current weather code/info
  const currentCode = weatherData?.current?.weather_code ?? null;
  const currentInfo = weatherData ? weatherCodeInfo(currentCode) : null;

  // compute tomorrow weather code/info
  // daily.weather_code is an array, index 1 is tomorrow (index 0 is today)
  const tomorrowCode = weatherData?.daily?.weather_code?.[1] ?? null;
  const tomorrowInfo = weatherData ? weatherCodeInfo(tomorrowCode) : null;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <div className={styles.container}>
      <div className={styles.weatherSection}>
        {hasError ? (
          "No weather data available."
        ) : weatherData ? (
          <div className={styles.weatherContainer}>
            <div>{cityName || "Unknown"}</div>
            <div className={styles.weatherInfo}>
              {formatDate(today)} {currentInfo ? currentInfo.emoji : ""}{" "}
              {currentInfo ? currentInfo.desc : "--"}
              <span className={styles.temperature}>
                {typeof weatherData.current?.temperature_2m === "number"
                  ? Math.round(weatherData.current.temperature_2m)
                  : "--"}
                °C
              </span>
              <br />
              {formatDate(tomorrow)} {tomorrowInfo ? tomorrowInfo.emoji : ""}{" "}
              {tomorrowInfo ? tomorrowInfo.desc : "--"}
              <span className={styles.temperature}>
                {typeof weatherData.daily?.temperature_2m_mean?.[1] === "number"
                  ? Math.round(weatherData.daily.temperature_2m_mean[1])
                  : "--"}
                °C
              </span>
            </div>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
      <div className={styles.navContainer}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
          }
        >
          Plans
        </NavLink>
        <NavLink
          to="/checklist"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
          }
        >
          Trip Checklist
        </NavLink>
      </div>
    </div>
  );
}
