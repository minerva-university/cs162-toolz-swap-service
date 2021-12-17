import React, { useState, useEffect, Component } from "react";
import { Link, useParams } from "react-router-dom";
import "../stylesheets/listingExpanded.css";
import  star from "../images/star.png";
import axios from 'axios'

import headerProvider from '../apis/headerProvider';
import { serverURL } from '../config'
const ListingExpanded =()=> {

    const params = useParams()
    const url = "http://localhost:8000/router/listing/"+params.tool_id.toString()+"/"
    // console.log(url)
    //console.log(params)

    const [tool, setTool] = useState({})
    useEffect(() => {
        axios.get(url)
        .then((response)=>{
            setTool(response.data)
        // axios returns API response body in .data
        })
    })
    // console.log(tool)
    // const [tool, setValuess]=useState({
    //     "listing_id": "4e8d7df8-e086-4eee-a861-d15505062137",
    //     "title": "Some cool Drill right here",
    //     "address": "Random Address",
    //     "description": "This drill has been used by Mike tyson, you probably want it wink wink",
    //     "created_on": "2021-12-14T00:39:28.371000-08:00",
    //     "rating_average": 3.2,
    //     "owner": "Mike Tyson",
    //     "brand": "IRWIN",
    //     "model": "X AE-A-12",
    //     "tool_category": "DRILL",
    //     "city": "San Francisco, CA",
    //     "neighborhood": "Tenderloin"
    // })


    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
      }  

    return (
        <div className="tool-show-container">

      {/* IMAGE BANNER */}

        <div className="tool-show-banner">
          <img className="tool-show-img-banner" alt="tool photo" src={"https://lda.lowes.com/is/image/Lowes/DP18-102358_NPC_BG_Wrench_AH?scl=1"} /> 
        </div>

        <br/><br/><br/>

        <div className="tool-show-main-section">
      
        {/* LEFT PANEL */}
        
          <div className="tool-show-left-container">
            <h2 className="tool-show-title">{tool.title}</h2>
            <div className="tool-show-grid-container">
              <div className="item-1">
                <div className="tool-show-left-sec">
                  Rating
                </div>
              </div>
              <div className="item-2">
                <span >
                  {tool.rating_average} <img src={star} /> / 5
                </span>
                <div className="tool-show-star-wrapper">
                  <div className="tool-show-star-inner">
                    <span className="tool-show-top-trips">
                    </span>
                  </div>
                </div>
                
              </div>

              <div className="item-3">
                <div className="tool-show-left-sec">
                  Date-created
                </div>
              </div>

              <div className="item-4">
                <div className="tool-show-left-content">
                  {tool.created_on}
                </div>
              </div>

              <div className="item-5">
                <div className="tool-show-left-sec">
                  Tool Category
                </div>
              </div>
              <div className="item-6">
                <div className="tool-show-host-wrapper">
                    <div className="tool-show-left-content-trips">
                    {tool.category_name}
                    </div>
                    
                </div>
              </div>

              <div className="item-7">
                <div className="tool-show-left-sec">
                  Tool Brand
                </div>
              </div>
              <div className="item-8">
                <div className="tool-show-host-wrapper">
                    <div className="tool-show-left-content-trips">
                    {tool.brand_name}
                    </div>
                    
                </div>
              </div>


              <div className="item-9">
                <div className="tool-show-left-sec">
                 Tool Model
                </div>
              </div>

              <div className="item-10">
                <div className="tool-show-host-wrapper">
                    <div className="tool-show-left-content-trips">
                    {tool.model_name}
                    </div>
                </div>
              </div>
            
              <div className="item-11">
                <div className="tool-show-left-sec">
                  Tool Description
                </div>
              </div>

              <div className="item-12">
                <div className="tool-show-left-content">
                  {tool.description}
                </div>
              </div>

            </div>
          </div>
          
          {/* RIGHT PANEL */}

            <div className="tool-show-right-container">
              <span className="tool-show-usd">
                $
              </span>
              <span className="tool-show-price">
                {tool.price}
              </span>
              &nbsp;
              <span className="tool-show-per-day">
                per day
              </span>

              <div className="tool-show-distance-container">

                <div className="tool-show-rental">
                  
                

                </div>

                

                <div className="tool-show-distance-header">
                  CONTACT
                </div>
                <div className="tool-show-distance">

                  <div className="tool-show-distance-time">
                
                    Owner<br/>
                    Address<br/>
                    Neighborhood<br/>
                    City
                    
                  </div>

                  <div className="tool-show-distance-mi">
                    {tool.owner_name}<br/>
                    {tool.address}<br/>
                    {tool.neighborhood_name}<br/>
                    {tool.city_name}
                  </div>
                </div>
              </div>
                <br />
              <div className="tool-show-insurance-container">
                <div className="tool-show-insurance-header">
                </div>
                <div className="tool-show-insurance-co">
                </div>
              </div>
                
              <button className="tool-show-add-fav-btn">
                <img className="tool-show-add-fav-icon" src="https://github.com/fsiino/thuro/blob/master/app/assets/images/add-fav-transp.png?raw=true"/>&nbsp;Add to Saved
              </button>
              &nbsp;&nbsp;&nbsp;&#160;
              <button className="tool-show-add-fav-btn">
                Request
              </button>
              <br/>

            </div> 
          
          </div>
          <br/>
        </div>
      )
        
    
}

export default ListingExpanded;