import React, { Component } from "react";
import {Link} from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";
import uuid from 'react-uuid';
import "../App.css";
import "../stylesheets/SearchPage.css";
import  rating_star from "../images/rating_star.png";





class SearchPage extends Component {
  
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
    
    render() {

      return (
        
          <div className="search-body-container">
                <div className="search-filter-container">
                  <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <button class="another-search-button"></button>
                        <input placeholder="Search for a tool listing" type="text" />
                        
                    </div>
                  </div>
                  
                </div>
                
                <div className="search-listings-container">
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
  }
  
  export default SearchPage;

  //                 <span className="tool-make-model">
  //                   {toolName}
  //                 </span>
  //                 <span className="tool-year">
  //                   1999
  //                 </span>