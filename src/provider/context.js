import React, { useState, useContext, useRef, useEffect } from 'react'

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const CORS = 'https://cors-anywhere-venky.herokuapp.com/'
    const CITY_URL = `https://nominatim.openstreetmap.org/search/?city=`
    const WEATHER_URL = `${CORS}https://www.metaweather.com/api/location/`
    const COORDS_URL = `${CORS}https://www.metaweather.com//api/location/search/?lattlong=`
    const [loading, setLoading] = useState(true)
    const [location, setLocation] = useState('')
    const [weather, setWeather] = useState({})
    const [forcast, setForcast] = useState([])
    const [unit, setUnit] = useState('C')
    const [userInput, setUserInput] = useState('')
    const [defaultLocation, setDefaultLocation] = useState('Lagos')
    const [coords, setCoords] = useState({})
    const searchFormRef = useRef()

    const toggleSearchForm = () => searchFormRef.current.classList.toggle('toggle_sidenav')
    const onInputChange = (data) => setUserInput(data)

    const getLocation = () => {
        try {
            // if(userInput){
            //    setDefaultLocation(userInput)
            // }
            // fetch(`${LOCATION_URL}`+ defaultLocation)
            // .then((res) => res.json())
            // .then((data) =>{
            //     setLocation(data)
            // })
            fetch(`${CITY_URL}`+ userInput + '&format=json')
            .then((res) => res.json())
            .then((data) =>{
                setLocation(data)
            })
        } catch (error) {
            return error
        }
    }

    const getWeather = (data) => {
        setLoading(true)
        if(searchFormRef.current.classList.contains('toggle_sidenav') && !loading ){
            toggleSearchForm()
        }
        try {
           
            // fetch(`${WEATHER_URL}`+ woeid)
            fetch(`${COORDS_URL}`+ data.lat+','+data.lon)
            .then((res) => res.json())
            .then((data) =>{
                fetch(`${WEATHER_URL}`+ data[0].woeid)
                .then((res) => res.json())
                .then((data)=>{

                    setWeather(data)
                    data.consolidated_weather.shift()
                    const new_forcast = data.consolidated_weather
                    setForcast(new_forcast)
                    setLoading(false)
                })
            })
        } catch (error) {
            return error
        }
    }

    const getUnit = (type) => setUnit(type)

    const getCoords = () => {
        const success = (res) => {
            setCoords({
                latitude: res.coords.latitude,
                longitude: res.coords.longitude
            })
        }
        const failure = () => {
            console.log('falied')
        }
        window.navigator.geolocation.getCurrentPosition(success, failure)
    }

    useEffect(() =>{
        fetch(`${CITY_URL}`+ defaultLocation + '&format=json')
            .then((res) => res.json())
            .then((data) =>{
            setLocation(data)
        })
    },[])

    useEffect(() => {
        if(loading && location[0]){
            const latlong = {
                lat: location[0].lat,
                lon: location[0].lon
            }
            getWeather(latlong);
           }
    }, [location])

    useEffect(() => {
        getLocation()
    }, [userInput])

    useEffect(()=>{
        const latlong = {
            lat: coords.latitude,
            lon: coords.longitude
        }
        if(latlong.lat || latlong.lon){
            getWeather(latlong)
        }
    },[coords])
    return (
        <AppContext.Provider value={{
            searchFormRef,
            toggleSearchForm,
            onInputChange,
            getWeather,
            getUnit,
            getCoords,
            weather,
            forcast,
            unit,
            userInput,
            location,
            loading
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);
export {AppProvider, AppContext}


