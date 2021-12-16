import React, { Component } from "react";
import { Link } from "react-router-dom";
import  rating_star from "../images/rating_star.png";
import "../stylesheets/myListings.css";


class MyListings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toolList: [],
          modal: false,
          allTools: [{
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
          }]
        };
      }
    render(){
        return(
            <div className="my-listings-container">
                  {this.state.allTools.map(tool => (
                  
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
        )
    }
}

export default MyListings;