import "../stylesheets/createListing.css";
import React, { Component, useState } from "react";
//import SignUpRequest from '../apis/apiSignup';
import headerProvider from '../apis/headerProvider';
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import axios from 'axios' 

export default function CreateListing () {
  const [inputField , setInputField] = useState({
      "listing_id": "",
      "brand_name": "",
      "model_name": "",
      "owner_name": "",
      "city_name": "",
      "neighborhood_name": "",
      "category_name": "",
      "title": "",
      "price": 0,
      "address": "",
      "description": "",
      "created_on": "",
      "rating_average": 0.0,
      "item_image": null,
      "item_image_url": null,
      "owner": 0,
      "brand": "",
      "model": "",
      "tool_category": "",
      "city": "",
      "neighborhood": ""
  })
  console.log(inputField)
  const inputsHandler = (e) =>{
    e.preventDefault();
    setInputField({
        ...inputField,
        [e.target.name]: e.target.value
      })
    console.log(inputField)
    }   
  const handleImageChange = (e) => {
    e.preventDefault();
    setInputField({
      ...inputField,
      [inputField.item_image]: e.target.files[0]
      })
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    let url = 'http://localhost:8000/router/listings/';
    axios.post(url, inputField, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          navigate('/')
        })
        .catch(err => console.log(err))
  };

  const navigate = useNavigate()

  return(
      <div className="tool-create-container">
      <div className="tool-create-banner">
        
      </div>

      <form className="tool-create-form-container" onSubmit={handleSubmit}>

          <h3 className="tool-create-banner-text">
              List your tool
          </h3>

        <br/><br/>
                    
        <h2>Who owns the tool and Where is it located?</h2>

        <br/>

        <label>Owner
          <input type="text" placeholder="Address" value={inputField.owner} onChange={""}></input>
        </label>
        <label>Address
          <input type="text" placeholder="City" value={inputField.address} onChange={""}></input>
        </label>
        <label>Neighborhood
          <input type="text" placeholder="State" value={inputField.neighborhood} onChange={""}></input>
        </label>
        <label>City
          <input type="text" placeholder="Zip" value={inputField.City} onChange={""}></input>
        </label>

        <br/><br/>

        <h2>Which tool do you have?</h2>

        <br/>

        <label htmlFor="">Tool Category
          <input type="text" placeholder="Year" value={inputField.tool_category} onChange={""}/>
        </label>
        <label htmlFor="">Tool Brand
          <input type="text" placeholder="Make" value={inputField.brand} onChange={""}/>
        </label>
        <label htmlFor="">Tool Model
          <input type="text" placeholder="Model" value={inputField.model} onChange={""}/>
        </label>
        


        <br/><br/><br/>

        <h2>Tool Details</h2>

        <br/>
        <label htmlFor="">Title
        <input type="text" placeholder="Daily Rate" value={inputField.title} onChange={""}/>
          </label>

        <label htmlFor="">Daily Rate (USD)
          <input type="text" placeholder="Daily Rate" value={inputField.price} onChange={""}/>
        </label>

        <label>Description
          <textarea placeholder="Description" value={inputField.description} onChange={""}>
            
          </textarea>
        </label>

        
        <br/><br/>
    
        <h2>Add a Photo</h2>
        <br/>
        <input 
        type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={handleImageChange} multiple/>
        <br/>

        <input className="tool-create-submit-btn" type="submit" value="Finish"/>

      </form>

    </div>
  )
}
