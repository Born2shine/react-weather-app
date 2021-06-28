import React, { useEffect, useState } from 'react'
import Moment from "react-moment"
import { useGlobalContext } from '../../../provider/context'
import { Ceil, converterHandler, getWeatherIcon } from "../../../helpers"

const Weather = () => {
    
    const { forcast, loading, unit } = useGlobalContext();
    const [weather, setWeather] = useState(forcast)
    
    useEffect(() => {
        (unit === 'C') ? setWeather(forcast) : setWeather(converterHandler(weather, unit))
    }, [forcast, unit])

    return (
        <div className="weather-card">
                { weather.length > 0 ?
                    weather.map(({id, applicable_date, weather_state_name, max_temp, min_temp}, i) => {
                        return (
                            !loading ?
                            <div className="single-card" key={id}>
                                <label>
                                    {i === 0 ? 'Tomorrow' : <Moment format="ddd, DD MMM" date={applicable_date}/> }
                                </label>
                                <div className="card-img">
                                    <img src={getWeatherIcon(weather_state_name)} alt="shower-img" />
                                </div>
                                <ul>
                                    <li>
                                        <label>{Ceil(min_temp)} <sup>o</sup>{unit}</label>
                                        <label>{Ceil(max_temp)} <sup>o</sup>{unit}</label>
                                    </li>
                                </ul>
                            </div> : <div key={id} className='single-card'>
                            
                            </div>
                        )
                    })
                    : 
                     <>
                         <div className="single-card"></div>
                         <div className="single-card"></div>
                         <div className="single-card"></div>
                         <div className="single-card"></div>
                         <div className="single-card"></div>
                          {/* <div className="single-card">
                          {
                                 !loading && 
                                 <>
                                   <label>Tomorrow</label>
                                    <div className="card-img">
                                        <img src={HeavyRain} alt="shower-img" />
                                    </div>
                                    <ul>
                                        <li>
                                            <label>16 <sup>o</sup>C</label>
                                            <label>11 <sup>o</sup>C</label>
                                        </li>
                                    </ul>
                                 </>
                             }
                         </div>
                          <div className="single-card">
                            {
                                !loading && 
                                <>
                                    <label>Tomorrow</label>
                                    <div className="card-img">
                                        <img src={Thunderstorm} alt="shower-img" />
                                    </div>
                                    <ul>
                                        <li>
                                            <label>16 <sup>o</sup>C</label>
                                            <label>11 <sup>o</sup>C</label>
                                        </li>
                                    </ul>
                                </>
                            }
                         </div>
                         <div className="single-card">
                             {
                                 !loading && 
                                 <>
                                    <label>Tomorrow</label>
                                    <div className="card-img">
                                        <img src={Thunderstorm} alt="shower-img" />
                                    </div>
                                    <ul>
                                        <li>
                                            <label>16 <sup>o</sup>C</label>
                                            <label>11 <sup>o</sup>C</label>
                                        </li>
                                    </ul>
                                 </>
                             }
                         </div> */}
                     </>
                        }
                     </div>
    )
}

export default Weather
