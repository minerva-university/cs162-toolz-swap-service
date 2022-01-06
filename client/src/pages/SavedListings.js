import  rating_star from "../images/rating_star.png";

import React, { Component, useState, useEffect } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import axios from 'axios'
import "../stylesheets/savedListings.css";

export default function SavedListings () {
    const username = window.sessionStorage.getItem("username")
    const user_id = window.sessionStorage.getItem("userId")
    const url = "http://localhost:8000/router/user_detail/" + user_id + "/"
    const [saved, setSaved] = useState([])
    const [details, setDetails] = useState([])

    function getDetails (tool_id) {
      const url = "http://localhost:8000/router/listing/" + tool_id + "/"
      const res = axios.get(url).then(result => { console.log(result.data); return result.data; })
      const returnResult = () => {
        res.then((a) => {
          console.log(a);
        });
      };
      
    }
    useEffect(()=>{
        const res = axios.get(url)
        .then((response)=>{
        setSaved(response.data.saved_places);
        var temp = []
        for (let i = 0; i < response.data.saved_places.length; i++) {
        // response.data.saved_places.map((saved_item) => {
          const url = "http://localhost:8000/router/listing/" + response.data.saved_places[i] + "/"
          console.log(response.data.saved_places[i])
          const res2 = axios.get(url).then(result => {
            temp.push(result.data)
            setDetails(details => [...details, result.data])
          })
        }
        
        }
        )
    },[])
    
    console.log(saved, details.length)
    console.log(details)
    if (details){//(details !== undefined && details.length !==0 ) {
      return (
        <div className="my-listings-container">
            {details.map(tool => (
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
        
      )
    } else {
      return (
        <div>
          <p>Save your first item! They will show up here :)</p>
        </div>
      )
    }      
}
