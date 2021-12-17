import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import  rating_star from "../images/rating_star.png";
import "../stylesheets/myListings.css";


const MyListings =()=> {


    const [allTools, setallTools]=useState([{
        "listing_id": "4e8d7df8-e086-4eee-a861-d15505062137",
        "title": "Some cool Drill right here",
        "address": "Random Address",
        "description": "This drill has been used by Mike tyson, you probably want it wink wink",
        "created_on": "2021-12-14T00:39:28.371000-08:00",
        "rating_average": 3.2,
        "owner": "Mike Tyson",
        "brand": "IRWIN",
        "model": "X AE-A-12",
        "tool_category": "DRILL",
        "city": "San Francisco, CA",
        "neighborhood": "Tenderloin"
    }, {
        tool_id: [1],
        Title: "hammer for sale",
        Owner: "",  
        Brand: "IRWIN", 
        Model: "UniversalHammer 18V-100",
        Tool_category: "", 
        Address: "", 
        City: "", 
        Neighborhood: "", 
        Description: "",
        toolPrice:66
      }, {
        tool_id: [2],
        Title: "",
        Owner: "",  
        Brand: "JBtools", 
        Model: "Wrench 2001",
        Tool_category: "", 
        Address: "", 
        City: "", 
        Neighborhood: "", 
        Description: "",
        toolPrice:55
      }, {
        tool_id: [2],
        Title: "",
        Owner: "",  
        Brand: "JBtools", 
        Model: "Wrench 2001",
        Tool_category: "", 
        Address: "", 
        City: "", 
        Neighborhood: "", 
        Description: "",
        toolPrice:55
      }, {
        tool_id: [2],
        Title: "",
        Owner: "",  
        Brand: "JBtools", 
        Model: "Wrench 2001",
        Tool_category: "", 
        Address: "", 
        City: "", 
        Neighborhood: "", 
        Description: "",
        toolPrice:55
      }, {
        tool_id: [2],
        Title: "",
        Owner: "",  
        Brand: "JBtools", 
        Model: "Wrench 2001",
        Tool_category: "", 
        Address: "", 
        City: "", 
        Neighborhood: "", 
        Description: "",
        toolPrice:55
      }, {
        tool_id: [2],
        Title: "",
        Owner: "",  
        Brand: "JBtools", 
        Model: "Wrench 2001",
        Tool_category: "", 
        Address: "", 
        City: "", 
        Neighborhood: "", 
        Description: "",
        toolPrice:55
      }])
    

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
                    <Link to={`/ListingExpanded`}>
                      <div className="tool-index-photo-wrapper">
                        <img className="tool-index-photo" src={"https://lda.lowes.com/is/image/Lowes/DP18-102358_NPC_BG_Wrench_AH?scl=1"} />
                        <div className="tool-price">
                          ${tool.toolPrice}<span className="price-per-day"> /day</span>
                        </div>
                      </div>
                    </Link>
                    <div className="tool-make-model-year-container">
                    <div className="tool-rating">
                        3.5 <img src={rating_star}/>
                        / 5
                        
                      </div>
                      <span className="tool-make-model">
                        {tool.Title}
                        
                      </span>
                    </div>
                  </div>
                  ))}
                </div>
                </div>
        )
    
}

export default MyListings;