import  rating_star from "../images/rating_star.png";
import "../stylesheets/myListings.css";
import React, { Component, useState, useEffect } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import HomePage from '../pages/HomePage.js'
import SearchPage from '../pages/SearchPage.js'
import headerProvider from '../apis/headerProvider';
import axios from 'axios'

export default function MyListings (){

    const [allTools, setAllTools]=useState()
    const username = window.sessionStorage.getItem("username")
    const user_id = window.sessionStorage.getItem("userId")
    const url = "http://localhost:8000/filter/listing/user/?user_id=" + user_id

    function getLists() {
        axios.get(url)
        .then((response)=>{
          setAllTools(response.data)
        // axios returns API response body in .data
        })
    }
    if (allTools) {
      return(
        <div>
          <button className="top-btn">
          <Link to={`/CreateListing`}>
              List Another Tool
          </Link>
          </button>
          <div className="my-listings-container">
                {allTools.map(tool => (
                <div className="tool-tile-container">
                  <Link
                       to={`/ListingExpanded/${tool.listing_id}`}
                       params={{
                          "tool_id": tool.listing_id,
                          "title": tool.title
                      }}>
                    <div className="tool-index-photo-wrapper">
                    {tool.item_image_url ? (
                        <img className="tool-index-photo" src={tool.item_image_url} />
                      ) : (
                        <img className="tool-index-photo" src={"https://www.stanleytools.com/NA/product/images/3000x3000x96/STHT51457/STHT51457_2.jpg"} />
                      )}
                      <img className="tool-index-photo" src={tool.item_image_url} />
                      <div className="tool-price">
                        ${tool.price}<span className="price-per-day"> /day</span>
                      </div>
                    </div>
                  </Link>
                  <div className="tool-make-model-year-container">
                  <div className="tool-rating">
                      3.5 / 5 <img src={rating_star}/>
                      
                    </div>
                    <span className="tool-make-model">
                      {tool.title}
                      
                    </span>
                  </div>
                </div>
                ))}
              </div>
              </div>
      )
    } else {
      return (
        <div>
          <p> Create Your First Listing</p>
          <button className="top-btn">
          <Link to={`/CreateListing`}>
              List Another Tool
          </Link>
          </button>
        </div>
        )
    }
    
    
}

