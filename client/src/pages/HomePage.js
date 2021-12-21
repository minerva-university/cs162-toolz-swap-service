import React, { Component, useState, useEffect } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import axios from 'axios' 
import "../stylesheets/search.css";
import "../stylesheets/navbar.css";
import "../stylesheets/dropdown.css"
import "../stylesheets/homepage.css"
import "../stylesheets/createListing.css";

function HomePage () {
    const [inputField , setInputField] = useState({
        renting_start: "",
        renting_end: "",
        city: "",
        allCities: [],
    })
    const inputsHandler = (e) =>{
        // console.log(e.target.name, e.target.value)
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value
          })
        console.log(inputField)
        } 
    useEffect(()=>{
        let urls = [
          "http://localhost:8000/router/cities/"
    
      ]
        const One = axios.get(urls[0]);
        axios.all([One]).then(axios.spread((responseOne) => {
          var data1 = responseOne.data
          setInputField({
            ...inputField,
            allCities: data1,
          })
        }))
        console.log(inputField)
      },[])
    return(
        <div className="main-container">
            <div className="spacer"/>
            <h2 className="banner">Welcome to ToolSwap!</h2>
            <h2 className="caption">An online platform that connects prospective tool renters to nearby
            tool owners.</h2>
            <div className="search-container">
                <form className="search-form">

                <div className="search-where">

                    <label>Where</label>
                    <select name="city" onChange={inputsHandler} value={inputField.city}>
                    <option value="" disabled selected>Select your option</option>
                    {inputField.allCities.map(city => (<option value={city.city_id}>{city.name}</option>))}
                    </select>

                </div>

                <div className="search-from">
        
                    <label>From</label>
                    <div className="main-datetime-wrapper">
                    <input 
                    name="renting_start"
                    className="main-date" 
                    type="date" 
                    onChange={inputsHandler} 
                    value={inputField.renting_start}>
                    </input>
                    </div>

                </div>

                <div className="search-until">

                    <label>Until</label>
                    <div className="main-datetime-wrapper">
                    <input 
                    name="renting_end"
                    className="main-date" 
                    type="date" 
                    onChange={inputsHandler} 
                    value={inputField.renting_end}>
                    </input>
                    </div>

                </div>

                <Link 
                    to={`/SearchPage`} 
                    params={{
                    "city": inputField.city,
                    }}
                    state={{ city: inputField.city, renting_start: inputField.renting_start, renting_end: inputField.renting_end }}>
                <button className="search-button"/>
                </Link>
                
                </form>
            </div>
        </div>
    )
}

export default HomePage;