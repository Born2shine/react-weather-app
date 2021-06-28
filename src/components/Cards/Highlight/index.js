import React from 'react'
import { FaTelegramPlane } from "react-icons/fa"
import { useGlobalContext } from '../../../provider/context'

const HighlightCard = () => {
    const { forcast, loading } = useGlobalContext();
    const Today = forcast[0];
    return (
        <div className="cards">
                        <div className="single-card ">
                           { !loading &&
                           <>
                            <label>Wind status</label>
                            <h2>
                                { Math.floor(Today.wind_speed) }
                                <span> mph</span>
                            </h2>
                            <footer> 
                                <span className="icon"><FaTelegramPlane/> </span> 
                                { Today.wind_direction_compass } 
                            </footer>
                            </>
                            }
                        </div>
                        <div className="single-card ">
                            {!loading &&
                                <>
                                    <label>Humidity</label>
                                    <h2> { Today.humidity } <span>%</span></h2>
                                    <footer> 
                                        <div className="progress-bar">
                                            <ul>
                                                <li>0</li>
                                                <li>50</li>
                                                <li>100</li>
                                            </ul>
                                            <div className="progress">
                                                <div className="percent" style={{width: Today.humidity+'%'}}></div>
                                            </div>
                                            <li className="percentage">%</li>
                                        </div>
                                    </footer>
                                </>
                            }
                        </div>
                        <div className="single-card">
                            {
                                !loading && (
                                    <>
                                    <label>Visibility</label>
                                    <h2>{ Today.visibility.toFixed(1) } <span>miles</span></h2>
                                    </>
                                )
                            }
                        </div>
                        <div className="single-card ">
                           {
                               !loading && (
                                   <>
                                    <label>Air pressure</label>
                                    <h2>{ Math.floor(Today.air_pressure) } <span>mb</span></h2>
                                   </>
                               )
                           }
                        </div>
                     </div>
    )
}

export default HighlightCard
