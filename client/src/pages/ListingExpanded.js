import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/listingExpanded.css";


class ListingExpanded extends Component {
    render(){

        const randomNumber = (min, max) => {
            return Math.floor(Math.random() * (max - min) + min);
          }  

        return(
            <div className="car-show-container">

      {/* IMAGE BANNER */}

        <div className="car-show-banner">
          <img className="car-show-img-banner" alt="car photo" src={"https://lda.lowes.com/is/image/Lowes/DP18-102358_NPC_BG_Wrench_AH?scl=1"} /> 
        </div>

        <br/><br/><br/>

        <div className="car-show-main-section">
      
        {/* LEFT PANEL */}
        
          <div className="car-show-left-container">
            <div className="car-show-grid-container">
              <div className="item-1">
                <div className="car-show-left-sec">
                  The car
                </div>
              </div>
              <div className="item-2">

                <span className="car-show-title">
                  IRWIN HAMMER 
                </span>&nbsp;
                <span className="car-show-year">
                  2001
                </span>
                <div className="car-show-star-wrapper">
                  <div className="car-show-star-inner">


                    <span className="car-show-top-trips">
                    </span>
                  </div>
                </div>
                
              </div>

              <div className="item-3">
                <div className="car-show-left-sec">
                  Hosted by
                </div>
              </div>
              <div className="item-4">
                <div className="car-show-host-wrapper">
                  <div className="car-show-host-avatar">
                  </div> 
                  <div className="car-show-right-of-avatar">
                    <div className="car-show-left-content">
                      Nahom
                    </div>
                    <br/>
                    <div className="car-show-left-content-trips">
                      {randomNumber(100,200)} trips - Joined May 2019
                    </div>
                    <br />
                    <div className="car-show-left-content-response">
                        Typically responds in {randomNumber(2,35)} minutes
                    </div>
                  </div>
                </div>

              </div>

              <div className="item-5">
                <div className="car-show-left-sec">
                  Description
                </div>
              </div>

              <div className="item-6">
                <div className="car-show-left-content">
                  this is a very cool hammer
                </div>
              </div>

              <div className="item-7">
                <div className="car-show-left-sec">
                 
                </div>
              </div>

              <div className="item-8">
                <div className="car-show-left-content">
                </div>
              </div>

              <div className="item-9">
                <div className="car-show-left-sec">
                  Reviews
                </div>
              </div>

              <div className="item-10">
                <div className="car-show-left-content">
                  
                </div>
              </div>

            </div>
          </div>
          
          {/* RIGHT PANEL */}

            <div className="car-show-right-container">
              <span className="car-show-usd">
                $
              </span>
              <span className="car-show-price">
                66
              </span>
              &nbsp;
              <span className="car-show-per-day">
                per day
              </span>

              <div className="car-show-distance-container">

                <div className="car-show-rental">
                  
                

                </div>

                

                <div className="car-show-distance-header">
                  Distance included
                </div>

                <div className="car-show-distance">

                  <div className="car-show-distance-time">
                
                    Day<br/>
                    Week<br/>
                    Month
                    
                  </div>

                  <div className="car-show-distance-mi">
                    200 mi<br/>
                    1000 mi<br/>
                    2250 mi
                  </div>
                </div>
              </div>

              <div className="car-show-insurance-container">
                <div className="car-show-insurance-header">
                  Insurance provided via
                </div>
                <div className="car-show-insurance-co">
                  Freedom Reciprocal
                </div>
              </div>

              <button className="car-show-add-fav-btn">
                <img className="car-show-add-fav-icon" src="https://github.com/fsiino/thuro/blob/master/app/assets/images/add-fav-transp.png?raw=true"/>&nbsp;Add to favorites
              </button>
              <br/>

            {/* <div className="car-show-zoomed-map">
                <CarMap cars={this.props.cars} />
            </div> */}

            </div> 
          
          </div>
          <br/>
        </div>
      )
        
    }
}

export default ListingExpanded;