import Thunderstorm from '../assets/images/Thunderstorm.svg'
import HeavyRain from '../assets/images/HeavyRain.svg'
import Shower from "../assets/images/Shower.svg"
import Hail from '../assets/images/Hail.svg'
import LightCloud from '../assets/images/LightCloud.svg'
import HeavyCloud from '../assets/images/HeavyCloud.svg'
import Sleet from '../assets/images/Sleet.svg'
import Snow from '../assets/images/Snow.svg'
import LightRain from '../assets/images/LightRain.svg'
import Clear from '../assets/images/Clear.svg'

export const getWeatherIcon = (type) => {
    switch(type){
        case 'Heavy Rain':
            return HeavyRain
        case 'Thunderstorm':
            return Thunderstorm
        case 'Shower':
            return Shower
        case 'Hail':
            return Hail
        case 'Light Cloud':
            return LightCloud
        case 'Heavy Cloud':
            return HeavyCloud
        case 'Sleet':
            return Sleet
        case 'Snow':
            return Snow
        case 'Light Rain':
            return LightRain
        case 'Clear':
            return Clear
        default:
            return Thunderstorm
    }
}
export const Ceil = (value) => {
    return Math.ceil(value)
}

export const unitConverter = (value,type) => {
    if(type === 'F'){
        return (value * 1.8) + 32
    }else if(type === 'C'){
        return (value - 32) / 1.8
    }
    return value
}

const mapData = (data, unit) => {
    return data.map((d) => {
        return {...d, 
         the_temp: unitConverter(d.the_temp, unit),
         max_temp: unitConverter(d.max_temp, unit),
         min_temp: unitConverter(d.min_temp, unit),
         }
    }) 
}

export const converterHandler = (weatherData, unit) => {
    const isValid = 'consolidated_weather' in weatherData
    if(isValid){
        const newData = mapData(weatherData.consolidated_weather, unit)
        return {...weatherData, consolidated_weather: newData}   
    }else{
        return mapData(weatherData, unit)
    }
}
