import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/createListing.css";


const CreateListing =()=> {


    

    return(
        <div className="tool-create-container">
        <div className="tool-create-banner">
          
        </div>

        <form className="tool-create-form-container" onSubmit={""}>

            <h3 className="tool-create-banner-text">
                List your tool
            </h3>

          <br/><br/>
                      
          <h2>Who owns the tool and Where is it located?</h2>

          <br/>

          <label>Owner
            <input type="text" placeholder="Address" value={"this.props.owner"} onChange={""}></input>
          </label>
          <label>Address
            <input type="text" placeholder="City" value={"this.props.address"} onChange={""}></input>
          </label>
          <label>Neighborhood
            <input type="text" placeholder="State" value={"this.props.neighborhood"} onChange={""}></input>
          </label>
          <label>City
            <input type="text" placeholder="Zip" value={"this.props.city"} onChange={""}></input>
          </label>

          <br/><br/>

          <h2>Which tool do you have?</h2>

          <br/>

          <label htmlFor="">Tool Category
            <input type="text" placeholder="Year" value={"this.props.tool_category"} onChange={""}/>
          </label>
          <label htmlFor="">Tool Brand
            <input type="text" placeholder="Make" value={"this.props.make"} onChange={""}/>
          </label>
          <label htmlFor="">Tool Model
            <input type="text" placeholder="Model" value={"this.props.model"} onChange={""}/>
          </label>
          
  

          <br/><br/><br/>

          <h2>Tool Details</h2>

          <br/>
          <label htmlFor="">Title
          <input type="text" placeholder="Daily Rate" value={"this.props.title"} onChange={""}/>
            </label>

          <label htmlFor="">Daily Rate (USD)
            <input type="text" placeholder="Daily Rate" value={"this.props.rate"} onChange={""}/>
          </label>

          <label>Description
            <textarea placeholder="Description" value={"this.props.description"} onChange={""}>
              
            </textarea>
          </label>

          
          <br/><br/>
      
          <h2>Add a Photo</h2>
          <br/>
          <input type="file" onChange={"e => this.setState({ photos: e.target.files })"} multiple />

          <br/>

          <div className="tool-create-errors">
            {"this.renderErrors()"}
          </div>

          <input className="tool-create-submit-btn" type="submit" value="Finish"/>

        </form>

      </div>
    )
}

export default CreateListing;