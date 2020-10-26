import React, { FormEvent, useState } from 'react';
import { RiSearchLine, RiDropFill }  from 'react-icons/ri';
import { WiCloudy, WiStrongWind }  from 'react-icons/wi';

import '../styles/global.css'
import '../styles/pages/Landing.css';

import climateLogo from '../assets/images/climateLogo.png';

import inicialFigure from '../assets/images/landing_svgs/inicial.svg';
import rainFigure from '../assets/images/landing_svgs/rain.svg';
import sunFigure from '../assets/images/landing_svgs/sun.svg';
import snowFigure from '../assets/images/landing_svgs/snow.svg';
import thunderFigure from '../assets/images/landing_svgs/thunder.svg';
import cloudyFigure from '../assets/images/landing_svgs/cloudy.svg';

import initialIcon from '../assets/images/icons/04.svg';

import dayBg from '../assets/images/day_bg.png';
import nightBg from '../assets/images/night_bg.jpg';

import api from '../services/api';

interface WeatherData {
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

function Landing() {
  const dadosInicias: WeatherData = {
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

  //clear, clouds, thunderstorm, rain, drizzle, snow

  let LandingImg = inicialFigure

  switch (data?.weather[0].main) {
    case 'Clear':
      LandingImg = sunFigure;
      break

    case 'Clouds':
      LandingImg = cloudyFigure;
      break

    case 'Haze':
      LandingImg = thunderFigure;
      break

    case 'Thunderstorm':
      LandingImg = thunderFigure;
      break
      
    case 'Rain':
      LandingImg = rainFigure;
      break

    case 'Drizzle':
      LandingImg = rainFigure;
      break

    case 'Snow':
      LandingImg = snowFigure;
      break

    default:
      LandingImg = inicialFigure
      break
  }

  const icons = require.context( '../assets/images/icons', true, /\.(png|jpe?g|svg)$/);
  const paths = icons.keys ()
  const images = paths.map( path => icons ( path ) )

  let icon = initialIcon

  switch (data?.weather[0].icon) {
    case '01d':
      icon = images[0].default
      break

    case '01n':
      icon = images[1].default
      break

    case '02d':
      icon = images[2].default
      break

    case '02n':
      icon = images[3].default
      break

    case '03d' || '03n' || '04d' || '04n':
      icon = images[4].default
      break

    case '09d':
      icon = images[5].default
      break

    case '09n':
      icon = images[6].default
      break

    case '10d' || '10n':
      icon = images[7].default
      break

    case '11d':
      icon = images[8].default
      break
    
    case '11n':
      icon = images[9].default
      break

    case '13d':
      icon = images[10].default
      break

    case '13n':
      icon = images[11].default
      break

    case '50d':
      icon = images[12].default
      break

    case '50n':
      icon = images[13].default
      break
  }

  let background = dayBg

  switch (data?.weather[0].icon.slice(2)) {
    case 'n':
      background = nightBg
  }

  function handleCity(e: FormEvent) {
    e.preventDefault();
    
    api.get(`?q=${city}&appid=13e1cd524d80dabc2435ce6035f78427&lang=pt_br&units=metric`).then(response => {
      setData(response.data)
      console.log(response.data)
    })
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
      <div className="content">
        <div className="principal">
          <div className="header">
            <form onSubmit={handleCity}>
              <input
                placeholder="Digite uma cidade"
                type="text"
                name="city"
                value={city}
                onChange={event => {setCity(event.target.value)}}
                className="cityInput"
                autoComplete="off"
              />

              <button type="submit" className="searchButton">
                <RiSearchLine />
              </button>
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

            <span className="local">{`${data?.name}, ${data?.sys.country}`}</span>
          </div>

          <div className="other-results">
            <div className="other">
              Sensação térmica: <br/>
              <span>{data?.main.feels_like.toFixed(0)} ºC</span>
            </div>
            <div className="other">
              Temp. Mínima: <br/>
              <span>{data?.main.temp_min.toFixed(0)} ºC</span>
            </div>
            <div className="other">
              Temp. Máxima: <br/>
              <span>{data?.main.temp_max.toFixed(0)} ºC</span>
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
              {data?.wind.speed.toFixed(1)} km/h</p>
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
          
        </div>
      </div> {/*content*/}
      <div className="credits">
        by&nbsp;<a href="https://github.com/joaovictornsv"><strong>João Victor</strong></a>
      </div>
      </div>
     
    </div> // main
  )
}

export default Landing;