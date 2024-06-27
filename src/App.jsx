import { useState } from 'react';
import './App.css';
import SearchIcon from './assets/search.png';
import ClearIcon from './assets/cloud.png';
import CloudIcon from './assets/cloud.png';
import DrizzleIcon from './assets/drizzle.png';
import RainIcon from './assets/rain.png';
import WindIcon from './assets/wind.png';
import SnowIcon from './assets/snow.png';
import HumidityIcon from './assets/humidity.png';
import Bg from './assets/weatherbg.jpg';

function App() {
  const [text, setText] = useState('');
  const [icon, setIcon] = useState(ClearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [error, setError] = useState(null);

  const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
    return (
      <>
        <div className="image">
          <img src={icon} alt="Image" />
        </div>
        <div className="temp">{temp}°C</div>
        <div className="city">{city}</div>
        <div className="country">{country}</div>
        <div className="cord">
          <div>
            <span className="lat">Latitude</span>
            <span>{lat}</span>
          </div>
          <div>
            <span className="log">Longitude</span>
            <span>{log}</span>
          </div>
        </div>
        <div className="data-container">
          <div className="element">
            <img src={HumidityIcon} alt="humidity" className="icon" />
            <div className="data">
              <div className="humidity-percent">{humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={WindIcon} alt="wind" className="icon" />
            <div className="data">
              <div className="wind-percent">{wind}km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const weatherIconmap = {
    '01d': ClearIcon,
    '01n': ClearIcon,
    '02d': CloudIcon,
    '02n': CloudIcon,
    '03d': DrizzleIcon,
    '03n': DrizzleIcon,
    '04d': DrizzleIcon,
    '04n': DrizzleIcon,
    '09d': RainIcon,
    '09n': RainIcon,
    '10d': RainIcon,
    '10n': RainIcon,
    '13d': SnowIcon,
    '13n': SnowIcon,
  };

  const search = async () => {
    setLoading(true);
    setCityNotFound(false);
    setError(null);
    let api_key = '40c3839da72fad86f2df2bdc34d7b70f';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod === '404') {
        setLoading(false);
        setCityNotFound(true);
        console.error('City Not found');
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp - 273.15)); // Converting Kelvin to Celsius
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconcode = data.weather[0].icon;
      setIcon(weatherIconmap[weatherIconcode] || ClearIcon);
    } catch (error) {
      console.log('error occurred:', error.message);
      setError('An error occurred while fetching the weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    search();
  };

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <>
      <div className="background-color"></div>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search City"
            className="city-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeydown}
          />
          <div className="search-icon" onClick={handleClick}>
            <img src={SearchIcon} alt="Search" />
          </div>
        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}
        {!loading && !cityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            humidity={humidity}
            wind={wind}
          />
        )}
        <p className="copyright">
          Designed by <span><a href="https://github.com/vaigai138">Vaigai</a></span>
        </p>
      </div>
    </>
  );
}

export default App;
