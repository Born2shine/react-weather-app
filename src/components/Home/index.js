import React, { useEffect, useState } from 'react'
import Moment from "react-moment"
import bg_img from "../../assets/images/Cloud-background.png"  

import SearchForm from "../SearchForm"
import WeatherCard from "../Cards/Weather"
import HighlightCard from "../Cards/Highlight"

import { BiCurrentLocation } from "react-icons/bi"
import { FaMapMarkerAlt } from "react-icons/fa"
import { ImSpinner2 } from "react-icons/im"
import { useGlobalContext } from '../../provider/context'
import { Ceil, converterHandler, getWeatherIcon } from "../../helpers"



const Home = () => {
    const { toggleSearchForm, weather, getUnit, unit, loading, getCoords } = useGlobalContext()
    const [weatherData, setWeatherData] = useState(weather)
    const { time, consolidated_weather, title } = weatherData


    useEffect(()=>{
        setWeatherData(weather)
    },[weather])
    
    useEffect(() => {
        setWeatherData(() =>{
            if(weatherData.consolidated_weather){
                return converterHandler(weatherData, unit)
            }
            return weatherData
        })
    }, [unit])
    return ( 
        <main>
          <section className="wrapper">
              <SearchForm/>
              <aside className="left-aside">
                <nav>
                    <div className="btn btn-search" onClick={toggleSearchForm}>Search for places</div>
                    <span className="search-icon" onClick={getCoords}><BiCurrentLocation/></span>
                </nav>
                {!loading ? <div className="shower">
                    <img className="shower_logo" src={getWeatherIcon(consolidated_weather[0].weather_state_name)} alt="shower-logo" />
                    <h1>{weatherData ? Ceil(consolidated_weather[0].the_temp) : '15'}<span><sub><sup>o</sup>{unit ? unit : 'C'}</sub></span></h1>
                    <h4>{weatherData ? consolidated_weather[0].weather_state_name : 'Shower'}</h4>
                    <div className="info">
                        <span>Today . {time ? <Moment format="ddd, DD MMM" date={time}/> : 'Fri. 5 Jun'} </span>
                        <div className="location">
                            <span><FaMapMarkerAlt/></span> {title ? title : 'Helsinki'}
                        </div>
                    </div>
                </div> : <h2 className='loader'>
                        <div className='spinner'>
                        <ImSpinner2/>
                        </div>
                    </h2>}
                <div className="bg_logo">
                    <img src={bg_img} alt="bg-logo" />
                </div>
              </aside>
              <aside className="right-aside">
                 <div className="hero-icons">
                     <span className={`celcius-icon ${unit === 'C' ? 'dark-bg' : ''}`} onClick={() => getUnit('C')}> <sup>o</sup>C</span>
                     <span className={`fahrenheit-icon ${unit === 'F' ? 'dark-bg' : ''}`} onClick={() => getUnit('F')}> <sup>o</sup>F</span>
                 </div>
                 <section className="cards">
                     <WeatherCard/>
                 </section>
                 <section className="highlights">
                     <h2>Today's Highlights</h2>
                  <HighlightCard/>
                 </section>

                 <footer>
                    <div>Created by SpiderTech - devChallenges.io</div>
                </footer>
              </aside>
          </section>
         
        </main> 
    )
}

export default Home
