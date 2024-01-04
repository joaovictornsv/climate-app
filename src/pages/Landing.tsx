import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { RiSearchLine, RiDropFill }  from 'react-icons/ri';
import { WiCloudy, WiStrongWind }  from 'react-icons/wi';

import '../styles/global.css'
import '../styles/pages/Landing.css';

import climateLogo from '../assets/images/climateLogo.svg';

import inicialFigure from '../assets/images/landing_svgs/inicial.svg';
import rainFigure from '../assets/images/landing_svgs/rain.svg';
import sunFigure from '../assets/images/landing_svgs/sun.svg';
import snowFigure from '../assets/images/landing_svgs/snow.svg';
import thunderFigure from '../assets/images/landing_svgs/thunder.svg';
import cloudyFigure from '../assets/images/landing_svgs/cloudy.svg';

import initialIcon from '../assets/images/icons/04.svg';

import dayBg from '../assets/images/Backgrounds/day_bg.jpg';
import nightBg from '../assets/images/Backgrounds/night_bg.jpg';
import snowyBg from '../assets/images/Backgrounds/snowy_day_bg.webp';
import thunderstormBg from '../assets/images/Backgrounds/thunderstorm_bg.jpg';
import hazeNightBg from '../assets/images/Backgrounds/haze_night_bg.jpg';
import hazeDayBg from '../assets/images/Backgrounds/haze_day_bg.jpg';
import cloudyDayBg from '../assets/images/Backgrounds/cloudy_day_bg.png';
import cloudyNightBg from '../assets/images/Backgrounds/cloudy_night_bg.jpg';
import rainyBg from '../assets/images/Backgrounds/rainy_bg.webp';



import api from '../services/api';
import search from '../services/search';
import { LocationContext } from '../contexts/LocationContext';
import { DebounceInput } from 'react-debounce-input';
import { MotionBox } from '../components/MotionBox';


const icons = require.context( '../assets/images/icons', true, /\.(png|jpe?g|svg)$/);
const paths = icons.keys ()
const images = paths.map( path => icons ( path ) )


interface WeatherData {
  coord: {
    lon: number,
    lat: number
  },
  weather: Array<{
    main: string,
    description: string,
    icon: string
  }>,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  wind: {
    speed: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    country: string
  },
  timezone: number,
  name: string
}

interface SearchData {
  list: Array<{
    name: string,
    coord: {
      lat: number,
      lon: number
    },
    sys: {
      country: string
    }
  }>
}

function Landing() {
  const dadosInicias: WeatherData = {
    coord: {
      lon: 0,
      lat: 0
    },
    weather: [{
      main: 'initial',
      description: '-',
      icon: ''
    }],
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0
    },
    wind: {
      speed: 0
    },
    clouds: {
      all: 0
    },
    dt: 0,
    sys: {
      country: '-'
    },
    timezone: 0,
    name: '-'
  }

  const [city, setCity] = useState<string>()
  const [data, setData] = useState<WeatherData>(dadosInicias)
  const [results, setResults] = useState<SearchData>()
  const [valid, setValid] = useState(true)

  const {location, setLocation} = useContext(LocationContext);
  
  useEffect(() => {
    if(!location) {
      getLocation();
    } else {
      handleCityByCordinates(location.lat, location.lng);
    }
  }, []);

  function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLocation({
          lat: latitude,
          lng: longitude
        });

        handleCityByCordinates(latitude, longitude);
      });
    } else {
      alert('Browser does not support geolocation')
    }
  }

  let background = dayBg
  let day = true;

  switch (data?.weather[0].icon.slice(2)) {
    case 'n':
      day = false;
  }

  let LandingImg = inicialFigure
  
  switch (data?.weather[0].main) {
    case 'Clear':
      LandingImg = sunFigure;
      background = day ? dayBg : nightBg;
      break

    case 'Clouds':
      LandingImg = sunFigure;
      background = day ? cloudyDayBg : cloudyNightBg;
      break

    case 'Haze':
      LandingImg = cloudyFigure;
      background = day ? hazeDayBg : hazeNightBg;
      break

    case 'Thunderstorm':
      LandingImg = thunderFigure;
      background = thunderstormBg;
      break
      
    case 'Rain':
      LandingImg = rainFigure;
      background = rainyBg;
      break

    case 'Drizzle':
      LandingImg = rainFigure;
      background = rainyBg;
      break

    case 'Snow':
      LandingImg = snowFigure;
      background = snowyBg;
      break

    default:
      LandingImg = inicialFigure
      break
  }


  let icon = initialIcon
  switch (data?.weather[0].icon) {
    case '01d':
      icon = images[0]
      break

    case '01n':
      icon = images[1]
      break

    case '02d':
      icon = images[2]
      break

    case '02n':
      icon = images[3]
      break

    case '03d'|| '03n' || '04d' || '04n':
      icon = images[4]
      break

    case '09d':
      icon = images[5]
      break

    case '09n':
      icon = images[6]
      break

    case '10d' || '10n':
      icon = images[7]
      break

    case '11d':
      icon = images[8]
      break
    
    case '11n':
      icon = images[9]
      break

    case '13d':
      icon = images[10]
      break

    case '13n':
      icon = images[11]
      break

    case '50d':
      icon = images[12]
      break

    case '50n':
      icon = images[13]
      break
  }

  async function handleCity(e: FormEvent) {
    e.preventDefault();
    
    await api.get(`?q=${city}&appid=e81965343df414cbfb25d98c8741fe2a&lang=pt_br&units=metric`).then(response => {
      setData(response.data)
    }).catch(() => {setValid(false)})
    
    if (data.name !== '-') {
      setValid(true)
    }    
  }

  async function handleCityByCordinates (lat: number, lon: number) {
    await api.get(`?lat=${lat}&lon=${lon}&appid=e81965343df414cbfb25d98c8741fe2a&lang=pt_br&units=metric`).then(response => {
      setValid(true)
      setData(response.data)
    })
  }

  async function handleChangeValue(value: string) {
    try {
      setCity(value)
      const query = `?q=${value.trim()}&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=1604490628153`;

      await search.get(query).then(response => {
        setResults(response.data)
      });
      setValid(true);
    } catch(err) {
      setValid(false);
      console.error(err);
    }
  }

  function capitalizeString(string: string) {
    return string[0].toUpperCase() + string.slice(1)
  }

  return (
    <div id="main" >
      <div className="background">
        <img src={background} alt="Wallpaper" className="img-background"/>
      </div>
      <div className="main-grid">
      <div className="app-name">
        <img src={climateLogo} alt="Climate"/>
      </div>
      <MotionBox>
          <div className="content">
          <div className="principal">
            <div className="header">
              <form onSubmit={handleCity}>
                <div className="extras">
                  <div className="get-location" onClick={getLocation}>
                    <span className="get-location-button">
                      Minha localização
                    </span>
                  </div>
                  {!valid && (
                    <span className="snackbar">Cidade inválida</span>
                  )}
                </div>
                
                <div className="input-wrapper">
                  <DebounceInput
                    placeholder="Digite uma cidade"
                    type="text"
                    name="city"
                    value={city}
                    onChange={event => {handleChangeValue(event.target.value)}}
                    className="cityInput"
                    autoComplete="off"
                    debounceTimeout={300}
                  />

                  <div className="search-results">
                    {results && results.list.map(result => {
                      const country = result.sys.country
                      const flag = `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${country.toLowerCase()}.png`;

                      return (
                        <div key={result.coord.lat} className="result-item" onClick={() => handleCityByCordinates(result.coord.lat, result.coord.lon)}>
                          <img className="result-flag" src={flag} alt="bandeira"/>
                          <p><span className="result-city">{result.name}</span>, {country}</p>
                        </div>
                      )
                    })}

                  </div>

                  <button type="submit" className="searchButton">
                    <RiSearchLine />
                  </button>
                </div>
              </form>

              
            </div>
            <div className="result">
              <img
                src={icon}
                alt="Clima"
                className="weather-icon"
              />
              <h1 className="temperature">
                {data?.main.temp.toFixed(0)}<span>ºC</span>
              </h1>

              <span className="description">{capitalizeString(String(data?.weather[0].description))}</span>

              <span className="local">
                {`${data?.name}, ${data?.sys.country}`}&nbsp;&nbsp;
                {data?.sys.country !== '-' && <img src={`https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${data?.sys.country.toLowerCase()}.png`} alt="country"/>}
              </span>
            </div>

            <div className="other-results">
              <div className="other">
                Sensação térmica: <br/>
                <span>{data?.main.feels_like.toFixed(1)} ºC</span>
              </div>
              <div className="other">
                Temp. Mínima: <br/>
                <span>{data?.main.temp_min.toFixed(1)} ºC</span>
              </div>
              <div className="other">
                Temperatura Máxima: <br/>
                <span>{data?.main.temp_max.toFixed(1)} ºC</span>
              </div>
            </div>
          </div>

          <div className="secondary">
            <div className="secondary-results">
              <div className="other-secondary-results">
                <div className="icon-secondary-results humidity">
                  <RiDropFill />
                </div>
                <p>Umidade: <br/>
                {data?.main.humidity}%</p>
              </div>
              
              <div className="other-secondary-results">
                <div className="icon-secondary-results">
                  <WiStrongWind />
                </div>
                <p>Vento: <br/>
                {data?.wind.speed.toFixed(1)} m/s</p>
              </div>

              <div className="other-secondary-results">
                <div className="icon-secondary-results">
                  <WiCloudy />
                </div>
                <p>Nuvens: <br/>
                {data?.clouds.all}%</p>
              </div>

            </div>
            <div className="landing-figure">
              <img src={LandingImg} alt="Landing"/>
            </div>
            {data?.name !== '-' && (
              <div className="go-maps">
                <a
                  href={`https://www.google.com/maps/@${data?.coord.lat},${data?.coord.lon},12z`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir no Google Maps
                </a>
              </div>)
            }
          </div>
        </div> {/*content*/}
      </MotionBox>
      <div className="credits">
        by&nbsp;
        <a href="https://github.com/joaovictornsv" target="_blank" rel="noopener noreferrer">
          <strong>João Victor</strong>
        </a>
      </div>
      </div>
     
    </div> // main
  )
}

export default Landing;
