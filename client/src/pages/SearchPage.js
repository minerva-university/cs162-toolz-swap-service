import React, {useState, useEffect, Component } from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, Row, Col} from "react-bootstrap";
import Modal from "../components/Modal";
import axios from "axios";
import uuid from 'react-uuid';
import "../App.css";
import "../stylesheets/SearchPage.css";
import  rating_star from "../images/rating_star.png";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS






const SearchPage =(props)=> {
  const axios = require('axios');
  const history = useNavigate();
  
  // const fetchListing = async () => {
  //           const res = await fetch(`http://localhost:8000/router/listing/`)
  //           console.log("res",res)
  //           const data = await res.json()
  //           console.log("data", data)
  //         }
  // console.log(axios
  //   .get("http://localhost:8000/router/listing/").json())
  // async function getListing() {
  // axios.get("http://localhost:8000/router/listing/").then(response => {console.log(response)})

  const url = "http://localhost:8000/router/listing/"
  const another_url = "http://localhost:8000/router/listing_image/"
  const [allTools, setAllTools] = useState([])
  const [toolImages, setToolImages] = useState([])

  useEffect(() => {
    axios.get(url)
    .then((response)=>{
      setAllTools(response.data)
      // axios returns API response body in .data
    })
  })

  useEffect(() => {
    axios.get(another_url)
    .then((response)=>{
      setToolImages(response.data)
      // axios returns API response body in .data
    })
  })
  // const [allTools, setValues]=useState([{
  //         tool_id: 1,
  //         Title: "hammer for sale",
  //         Owner: "Mike",  
  //         Brand: "IRWIN", 
  //         Model: "UniversalHammer 18V-100",
  //         Tool_category: "", 
  //         Address: "", 
  //         City: "", 
  //         Neighborhood: "", 
  //         Description: "",
  //         toolPrice:66
  //       }]
  // )

    /*
    componentDidMount() {
      this.refreshList();
    }
    refreshList = () => {
      axios
        .get("http://localhost:8000/api/tool/")
        .then((res) => this.setState({ toolList: res.data }))
        .catch((err) => console.log(err));
    };
  
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    handleSubmit = (item) => {
      this.toggle();
  
      console.log(item, axios)
      axios
        .post("http://localhost:8000/api/tool/", item)
        .then((res) => this.refreshList());
  
    };
  
    handleDelete = (item) => {
      console.log("${item.tool_id}")
      let temp_id = item.tool_id
      axios
        .delete("http://localhost:8000/api/tool/"+temp_id+"/")
        .then((res) => this.refreshList());
    };
  
  
    createItem = () => {
      const item = { toolName: "", toolBrand: "", toolModel: "", toolCondition: "" , description: ""};
  
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
  
    editItem = (item) => {
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
  
  
  
    renderTabList = () => {
      return (
        <div className="nav nav-tabs">
          <span
            className={"nav-link active"}
          >
            Tools Listed: 
          </span>
        </div>
      );
    };
  
    renderItems = () => {
      const { toolList } = this.state;
      const newItems = this.state.toolList
  
      return newItems.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            title={item.description}
          >
            {item.toolName}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editItem(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
            >
              Delete
            </button>
          </span>
        </li>
      ));
    };
  */


    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;
    
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }

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
                      <div class="dropdown-container">
                  
                      <fieldset>
                        <Form.Group as={Row} className="mb-3">
                          <Col sm={10}>
                            <Form.Check
                              type="radio"
                              label="San Francisco"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios1"
                            />
                            <Form.Check
                              type="radio"
                              label="San Diago"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios2"
                            />
                            <Form.Check
                              type="radio"
                              label="Palo Alt"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios3"
                            />
                            <Form.Check
                              type="radio"
                              label="Seattle"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios4"
                            />
                          </Col>
                        </Form.Group>
                      </fieldset>
                    
                      </div>
                    </div>
                    <div>
                      <button class="dropdown-btn">Neighborhood
                        <i class="fa fa-caret-down"></i>
                      </button>
                      <div class="dropdown-container">
                          <fieldset>
                          <Form.Group as={Row} className="mb-3">
                            <Col sm={10}>
                              <Form.Check
                                type="radio"
                                label="Bellevue"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                              />
                              <Form.Check
                                type="radio"
                                label="Sunset District"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                              />
                              <Form.Check
                                type="radio"
                                label="Tenderloin"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                              />
                              <Form.Check
                                type="radio"
                                label="Hayes valley"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios4"
                              />
                            </Col>
                          </Form.Group>
                        </fieldset>
                      </div>
                    </div>
                    <div>
                      <button class="dropdown-btn">Brand
                        <i class="fa fa-caret-down"></i>
                      </button>
                      <div class="dropdown-container">
                        <fieldset>
                        <Form.Group as={Row} className="mb-3">
                          <Col sm={10}>
                            <Form.Check
                              type="radio"
                              label="IRWIN"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios1"
                            />
                            <Form.Check
                              type="radio"
                              label="Another brand"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios2"
                            />
                            <Form.Check
                              type="radio"
                              label="yet another brand"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios3"
                            />
                            <Form.Check
                              type="radio"
                              label="some other brand"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios4"
                            />
                          </Col>
                        </Form.Group>
                      </fieldset>
                      </div>
                    </div>
                    
                  </div>
                </div>
                
                <div className="search-listings-container">
                  {allTools.map(tool => (
                  <div className="tool-tile-container">
                    <Link
                     to={`/ListingExpanded/${tool.listing_id}`}
                     params={{
                        "tool_id": tool.listing_id,
                        "title": tool.title
                    }}>
                      <div className="tool-index-photo-wrapper">
                        <img className="tool-index-photo" src={toolImages[2].item_image_url} />
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