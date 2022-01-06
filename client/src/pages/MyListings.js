import  rating_star from "../images/rating_star.png";
import "../stylesheets/myListings.css";
import React, { Component, useState, useEffect } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import LogIn from '../auth_pages/Login.js'
import SignUp from '../auth_pages/Register.js'
import axios from 'axios'

export default function MyListings (){

    const [allTools, setAllTools]=useState()
    const username = window.sessionStorage.getItem("username")
    const user_id = window.sessionStorage.getItem("userId")
    const navigate = useNavigate()
    useEffect(()=>{
      const url = "http://localhost:8000/filter/listing/user/?user_id=" + user_id
      axios.get(url).then(response => {
        var data1 = response.data
        setAllTools({
          data: data1
        })
      })
      console.log(allTools)
    },[])
    if (window.sessionStorage.getItem("jwtToken") !== null) {
      if (allTools) {
        console.log(allTools)
        return(
          <div>
            <div className="another-tool">
              <button className="top-btn">
              <Link to={`/CreateListing`}>
                  List Another Tool
              </Link>
              </button>
            </div>
            <div className="my-listings-container">
              {allTools.data.map(tool => (
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
                          <img className="tool-index-photo" src={"https://lda.lowes.com/is/image/Lowes/DP18-102358_NPC_BG_Wrench_AH?scl=1"} /> 
                            ) : (
                              <img className="tool-index-photo" src={tool.item_image_url} /> 
                            )}
                    <div className="tool-price">
                      ${tool.price}<span className="price-per-day"> /day</span>
                    </div>
                  <div className="bottom-bar">
                    <p className="tool-name">
                      {tool.title}
                    </p>
                    <p className="tool-rating">
                      {tool.rating_average}/5 &#11088;
                    </p>
                  </div>
                  </div>
                  </Link>
                </div>
                  ))}
                </div>
                </div>
        )
      } else {
        return (
          <div className="another-tool">
            <p> Create Your First Listing</p>
            <button className="top-btn">
            <Link to={`/CreateListing`}>
                List Another Tool
            </Link>
            </button>
          </div>
          )
      }
    } else {
      return(
        <div>
        <h2>Please Sign In to Create Listing</h2>
        <Link to='/signup'>
          <button>Register</button>
        </Link>
        <Link to='/login'>
          <button>Login</button>
        </Link>
        <Routes>
            <Route path='login' element={<LogIn />} />
            <Route path='signup' element={<SignUp />} />
        </Routes> 
      </div>
      )
    }
    
    
}

