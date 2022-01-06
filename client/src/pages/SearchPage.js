import React, {useState, useEffect, Component } from "react";
import {Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";
import uuid from 'react-uuid';
import "../stylesheets/searchpage.css";

// TODO: Search page is very rudimentary. Should be able to switch filters back and forth, but can't so far
// ideally we should be storing filters set, looping over those each time. But this will do for now
const SearchPage =()=> {
  const axios = require('axios');
  const navigate = useNavigate();
  const location = useLocation();
  const username = window.sessionStorage.getItem('userId')
  const params = useParams()
  const {city, renting_start, renting_end} = location.state
  const [allTools, setAllTools] = useState({
    city: city,
    renting_start: params.renting_start,
    renting_end: params.renting_end,
    filtered: [],
    allNeighborhoods: [],
    allCities: [],
    allToolTypes: [],
    allModels: [],
    allBrands: []
  })

  useEffect(() => {
   
    let urls = [
      "http://localhost:8000/router/neighborhoods/",
      "http://localhost:8000/router/cities/",
      "http://localhost:8000/router/tool_type/",
      "http://localhost:8000/router/tool_model/",
      "http://localhost:8000/router/tool_brand/",
      "http://localhost:8000/router/listing/",

  ]
    const One = axios.get(urls[0]);
    const Two = axios.get(urls[1]);
    const Three = axios.get(urls[2]);
    const Four = axios.get(urls[3]);
    const Five = axios.get(urls[4]);
    const Six = axios.get(urls[5]);
    axios.all([One, Two, Three, Four, Five, Six]).then(axios.spread((responseOne, responseTwo, responseThree, responseFour, responseFive, responseSix) => {
      var data1 = responseOne.data
      var data2 = responseTwo.data
      var data3 = responseThree.data
      var data4 = responseFour.data
      var data5 = responseFive.data
      var filtered_data = responseSix.data.filter(function (tool) {
        if (city) {
          return tool.city === city;
        } else {
          return tool
        }
        
    })
    console.log(filtered_data)
      setAllTools({
        ...allTools,
        allNeighborhoods: data1,
        allCities: data2,
        allToolTypes: data3,
        allModels: data4,
        allBrands: data5,
        filtered: filtered_data
      })
    }))
  }, [])
  const inputsHandler = (e) => {
    console.log("hello")
  }
  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.name, e.target.value)
    const new_filtered_data = allTools.filtered.filter(function (tool) {
      console.log(tool)
      return tool[e.target.name] === e.target.value;
    })
    setAllTools({
      ...allTools,
      filtered: new_filtered_data,
    })
    console.log("change", allTools)
  }
      return (
        <div className="search-body-container">
        <div className="search-filter-container">
          <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <button class="another-search-button"></button>
                <input placeholder="Search for a tool listing" type="text" />
                
            </div>
          </div>
          <div class="sidenav">
          <p>Filter by:</p>
            <div>
              <button class="dropdown-btn">City
                <i class="fas fa-caret-down"></i>
              </button>
              <select name="city" onChange={handleChange} value={city}>
                <option value="" disabled selected>Select your option</option>
                {allTools.allCities.map(city => (<option value={city.city_id}>{city.name}</option>))}
              </select>
            </div>
            <div>
              <button class="dropdown-btn">Neighborhood
                <i class="fa fa-caret-down"></i>
              </button>
              <select name="neighborhood" onChange={handleChange} value={allTools.neighborhood}>
                <option value="" disabled selected>Select your option</option>
                {allTools.allNeighborhoods.map(neighborhood => (<option value={neighborhood.neighborhood_id}>{neighborhood.name}</option>))}
              </select>
            </div>
            <div>
            <button class="dropdown-btn">Tool Category
                <i class="fa fa-caret-down"></i>
              </button>
              <select name="tool_category" onChange={handleChange} value={allTools.tool_category}>
                <option value="" disabled selected>Select your option</option>
                {allTools.allToolTypes.map(tool_category => (<option value={tool_category.tool_id}>{tool_category.name}</option>))}
              </select>
            </div>
            <div>
            <button class="dropdown-btn">Brand
                <i class="fa fa-caret-down"></i>
              </button>
              <select name="brand" onChange={handleChange} value={allTools.brand}>
                <option value="" disabled selected>Select your option</option>
                {allTools.allBrands.map(brand => (<option value={brand.brand_id}>{brand.name}</option>))}
              </select>
            </div>
            <div>
            <button class="dropdown-btn">Model
                <i class="fa fa-caret-down"></i>
              </button>
              <select name="model" onChange={handleChange} value={allTools.model}>
                <option value="" disabled selected>Select your option</option>
                {allTools.allModels.map(model => (<option value={model.model_id}>{model.name}</option>))}
              </select>
            </div>
            
          </div>
        </div>
        <div className="search-listings-container">
          {allTools.filtered.map(tool => (
            <div className="tool-tile-container">
              <Link
                to={`/ListingExpanded/${tool.listing_id}`}
                state= {{ renting_start: null, renting_end: null}}
                params={{
                  "tool_id": tool.listing_id,
                  "title": tool.title,
              }}>
              <div className="tool-index-photo-wrapper">
                {tool.item_image_url === null ? (
                <img className="tool-index-photo" alt="tool photo" src={"https://lda.lowes.com/is/image/Lowes/DP18-102358_NPC_BG_Wrench_AH?scl=1"} /> 
                  ) : (
                    <img className="tool-index-photo" alt="tool photo" src={tool.item_image_url} /> 
                  )}
                <div className="tool-price">
                  ${tool.price}<span className="price-per-day"> /day</span>
                </div>
              <div className="bottom-bar">
                <p className="tool-name">
                  {tool.title}
                </p>
                <p className="tool-rating">
                  {tool.rating_average}/4 &#11088;
                </p>
              </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
}
  
  
  export default SearchPage;