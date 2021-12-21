import React, { useState, useEffect, Component } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "../stylesheets/listingExpanded.css";
import  star from "../images/star.png";
import axios from 'axios'
import headerProvider from '../apis/headerProvider';
import { serverURL } from '../config'

const is_user = () => {
  if (window.sessionStorage.getItem("jwtToken") !== null) {
    return true
  } else {
    return false
  }
}

function ListingExpanded () {
    const isLoggedin = is_user()
    const params = useParams()
    const url = "http://localhost:8000/router/listing/"+params.tool_id.toString()+"/"
    const location = useLocation()

    const {renting_start, renting_end} = location.state
    const [tool, setTool] = useState({})
    useEffect(() => {
        console.log(renting_start)
        axios.get(url)
        .then((response)=>{
            setTool(response.data)
        // axios returns API response body in .data
        })
    }, []) 

    return (
        <div className="tool-show-container">

      {/* IMAGE BANNER */}

        <div className="tool-show-banner">
        {tool.item_image_url === null ? (
        <img className="tool-show-img-banner" alt="tool photo" src={"https://lda.lowes.com/is/image/Lowes/DP18-102358_NPC_BG_Wrench_AH?scl=1"} /> 
          ) : (
            <img className="tool-show-img-banner" alt="tool photo" src={tool.item_image_url} /> 
          )}
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
              {isLoggedin ? (
                    <Link  className="regular"
                            to={`/CreateRequest/${tool.listing_id}/${tool.title}/${tool.owner}/${tool.owner_name}`}
                            state= {{renting_start: renting_start, renting_end: renting_end}}
                            params={{
                              "tool_id": tool.listing_id,
                              "title": tool.title,
                              "owner": tool.owner,
                              "owner_name": tool.owner_name,
                          }}
                          >
                    <button>
                      Request
                    </button>
                    </Link>
              ): (
                <Link to='/login' className="regular">
                <button>
                  Please Log In to Request
                </button>
                </Link>
              )}
              
              <br/>

            </div> 
          
          </div>
          <br/>
        </div>
      )
        
    
}

export default ListingExpanded;