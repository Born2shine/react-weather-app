import React from 'react'
import { MdClose } from "react-icons/md"
import { AiOutlineSearch, AiOutlineRight } from "react-icons/ai"
import { useGlobalContext } from '../../provider/context'

const SearchForm = () => {
    const { 
        searchFormRef,
        toggleSearchForm,
        onInputChange,
        location,
        userInput,
        getWeather  
     } = useGlobalContext()
    return (
        <div ref={searchFormRef} className="side-nav">
            <span className="close-icon" onClick={toggleSearchForm}><MdClose className="icon"/></span>
            <div className="form-group">
                <div className="search-field">
                    <span className="search-icon"><AiOutlineSearch/></span>
                    <input type="text" value={userInput} onChange={(e) => onInputChange(e.target.value)} placeholder="search location" />
                </div>
                <button className="btn btn-primary">Search</button>
            </div>
            <div className="location">
                <ul>
                    {
                      location &&  location.map(({title, location_type, woeid,lat,lon,place_id, display_name}) => {
                          const coords = {
                              lat,lon
                          }
                            return (
                                <li key={place_id} onClick={() => getWeather(coords)}>
                                    {/* <span>{`${title + ' ' + location_type}`}</span> */}
                                    <span>{`${display_name}`}</span>
                                    <span className="icon"><AiOutlineRight/></span>
                                </li>
                            )
                        })
                    }
                    
                </ul>
            </div>
        </div>
    )
}

export default SearchForm
