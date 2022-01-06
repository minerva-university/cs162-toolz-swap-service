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
    const user_id = window.sessionStorage.getItem("userId")
    const url_listing = "http://localhost:8000/router/listing/"+params.tool_id.toString()+"/"
    const url_user = "http://localhost:8000/router/user_detail/" + user_id + "/"
    const location = useLocation()
    const {renting_start, renting_end} = location.state
    const [tool, setTool] = useState({})
    const [saved, setSaved] = useState([])
    useEffect(() => {
        axios.get(url_listing)
        .then((response)=>{
          setTool(response.data)
        })
        axios.get(url_user)
        .then((response)=>{
          setSaved(response.data.saved_places)
        })
    }, []) 

    const handleSave = (e, tool_id, save_status) =>{
      let new_saved = saved
      new_saved = new_saved.concat(tool_id)
      e.preventDefault();
      if (save_status == false) {
        const patch_url = "http://localhost:8000/router/user_detail/" + user_id + "/"
        let res_patch = axios.patch(patch_url, {"saved_places": new_saved})
        window.location.reload(false);
      }
    }

    const handleUnsave = (e, tool_id, save_status) =>{
      let new_saved = saved
      new_saved = new_saved.filter(item => item !== tool_id)
      e.preventDefault();
      if (save_status == true) {
        const patch_url = "http://localhost:8000/router/user_detail/" + user_id + "/"
        let res_patch = axios.patch(patch_url, {"saved_places": new_saved})
        window.location.reload(false);
      }
    }
    // console.log(saved)
    // console.log(tool)
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
              {isLoggedin && saved.includes(tool.listing_id) ? (
                <button className="tool-show-add-fav-btn" onClick={(e) => {handleUnsave(e, tool.listing_id, true)}}>
                  Unsave &#9829;
                </button>
              ) :  isLoggedin && !saved.includes(tool.listing_id) ? (
                <button className="tool-show-add-fav-btn" onClick={(e) => {handleSave(e, tool.listing_id, false)}}>
                  Add to Saved &#9825;
                </button>
              ) : (
                <button>
                  Log In to Save
                </button>
              )
              }
              &nbsp;&nbsp;&nbsp;&#160;
              {isLoggedin ? (
                    <Link className="regular"
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
              ) : (
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