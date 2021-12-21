import React, {useState, useEffect, Component } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import {Form, Row, Col} from "react-bootstrap";
import Modal from "../components/Modal";
import axios from "axios";
import uuid from 'react-uuid';
import "../App.css";
import "../stylesheets/SearchPage.css";
import  rating_star from "../images/rating_star.png";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS

const SearchPage =()=> {

  const axios = require('axios');
  const navigate = useNavigate();
  const username = window.sessionStorage.getItem('userId')
  const params = useParams()
  const [allTools, setAllTools] = useState({
    city: params.city,
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
        return tool.city === params.city;
    })
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
    e.preventdefault()
    const new_filtered_data = allTools.filtered.filter(function (tool) {
      return tool.city === params.city;
    setAllTools({
      ...allTools,
      filtered: new_filtered_data,
    })
  })}
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
                      <select name="city" onChange={inputsHandler} value={allTools.city}>
                        <option value="" disabled selected>Select your option</option>
                        {allTools.allCities.map(city => (<option value={city.city_id}>{city.name}</option>))}
                      </select>
                      
                    </div>
                    <div>
                      <button class="dropdown-btn">Neighborhood
                        <i class="fa fa-caret-down"></i>
                      </button>
                      
                    </div>
                    <div>
                      
                    </div>
                    
                  </div>
                </div>
                <div className="search-listings-container">
                  {allTools.filtered.map(tool => (
                  <div className="tool-tile-container">
                    <Link
                     to={`/ListingExpanded/${tool.listing_id}`}
                     state= {{ renting_start: params.renting_start, renting_end: params.renting_end}}
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
                      </div>
                    </Link>
                    <div className="tool-make-model-year-container">
                    <div className="tool-rating">
                        3.5 <img src={rating_star}/>
                        / 5
                        
                      </div>
                      <span className="tool-make-model">
                        {tool.title}
                        
                      </span>
                    </div>
                  </div>
                  ))}
                </div>
            </div>
            

        

        


        
        // <main className="container">
        //   <h1 className="text-white text-uppercase text-center my-4">Toolz Swap</h1>
        //   <div className="row">
        //     <div className="col-md-6 col-sm-10 mx-auto p-0">
        //       <div className="card p-3">
        //         <div className="mb-4">
        //           <button
        //             className="btn btn-primary"
        //             onClick={this.createItem}
        //           >
        //             List Tool
        //           </button>
        //         </div>
        //         {this.renderTabList()}
        //         <ul className="list-group list-group-flush border-top-0">
        //           {this.renderItems()}
        //         </ul>
        //       </div>
        //     </div>
        //   </div>
        //   {this.state.modal ? (
        //     <Modal
        //       activeItem={this.state.activeItem}
        //       toggle={this.toggle}
        //       onSave={this.handleSubmit}
        //     />
        //   ) : null}
        // </main>
      );
    }
  
  
  export default SearchPage;

  //                 <span className="tool-make-model">
  //                   {toolName}
  //                 </span>
  //                 <span className="tool-year">
  //                   1999
  //                 </span>