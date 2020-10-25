import React from 'react';
import { RiSearchLine, RiDropFill }  from 'react-icons/ri';
import { WiCloudy, WiStrongWind }  from 'react-icons/wi';

import '../styles/pages/Landing.css';
import inicialFigure from '../assets/images/landing_svgs/inicial.svg';
import dayBg from '../assets/images/day_bg.png';
import '../styles/global.css'

function Landing() {
  return (
    <div id="main" >
      <div className="background">
        <img src={dayBg} alt="" className="img-background"/>
      </div>
      <div className="content">


        <div className="principal">
          <div className="header">
            <input type="text" name="city" className="cityInput"/>

            <button type="submit" className="searchButton">
              <RiSearchLine />
            </button>
          </div>
          <div className="result">
            <img
              src="https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/sun-256.png"
              alt="Clima"
              className="weather-icon"
            />
            <h1 className="temperature">
              21<span>ºC</span>
            </h1>

            <span className="description">Céu claro</span>

            <span className="local">Campina Grande, BR</span>
          </div>

          <div className="other-results">
            <div className="other">
              Sensação térmica: <br/>
              <span>23 ºC</span>
            </div>
            <div className="other">
              Temp. Mínima: <br/>
              <span>18 ºC</span>
            </div>
            <div className="other">
              Temp. Máxima: <br/>
              <span>26 ºC</span>
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
              30%</p>
            </div>
            
            <div className="other-secondary-results">
              <div className="icon-secondary-results">
                <WiStrongWind />
              </div>
              <p>Vento: <br/>
              47km/h</p>
            </div>

            <div className="other-secondary-results">
              <div className="icon-secondary-results">
                <WiCloudy />
              </div>
              <p>Nuvens: <br/>
              48% </p>
            </div>

          </div>
          <div className="landing-figure">
            <img src={inicialFigure} alt="Landing Image"/>
          </div>
          
        </div>
      </div> {/*content*/}
    </div> // main
  )
}

export default Landing;