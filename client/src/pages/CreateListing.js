import "../stylesheets/createListing.css";
import React, { Component, useState, useEffect } from "react";
//import SignUpRequest from '../apis/apiSignup';
import headerProvider from '../apis/headerProvider';
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import axios from 'axios' 

/* TODO: make certain fields dependent upon others. For example, only neighborhoods within a city should be allowed to be selected
    not just all neighborhoods. Same for model->brand relations etc. 
*/
export default function CreateListing () {
  const owner = window.sessionStorage.getItem('userId')
  const [inputField , setInputField] = useState({
      title: "",
      price: 0,
      address: "",
      description: "",
      rating_average: 0.0,
      item_image: null,
      item_image_url: null,
      owner: owner,
      brand: "",
      model: "",
      tool_category: "",
      city: "",
      neighborhood: "",
      allNeighborhoods: [],
      allCities: [],
      allToolTypes: [],
      allModels: [],
      allBrands: [],
  })

  useEffect(()=>{
    let urls = [
      "http://localhost:8000/router/neighborhoods/",
      "http://localhost:8000/router/cities/",
      "http://localhost:8000/router/tool_type/",
      "http://localhost:8000/router/tool_model/",
      "http://localhost:8000/router/tool_brand/"

  ]
    const One = axios.get(urls[0]);
    const Two = axios.get(urls[1]);
    const Three = axios.get(urls[2]);
    const Four = axios.get(urls[3]);
    const Five = axios.get(urls[4]);
    axios.all([One, Two, Three, Four, Five]).then(axios.spread((responseOne, responseTwo, responseThree, responseFour, responseFive) => {
      var data1 = responseOne.data
      var data2 = responseTwo.data
      var data3 = responseThree.data
      var data4 = responseFour.data
      var data5 = responseFive.data
      setInputField({
        ...inputField,
        allNeighborhoods: data1,
        allCities: data2,
        allToolTypes: data3,
        allModels: data4,
        allBrands: data5,
      })
    }))
    //console.log(inputField)
  },[])

  const inputsHandler = (e) =>{
    console.log(e.target.name, e.target.value)
    setInputField({
        ...inputField,
        [e.target.name]: e.target.value
      })
    console.log(inputField)
    }  
  
  const handleImageChange = (e) => {
    const img = e.target.files[0]
    setInputField({
      ...inputField,
      [e.target.name]: URL.createObjectURL(img)
      })
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputField)
    const data = JSON.parse(JSON.stringify(inputField))
    delete data['allNeighborhoods'];
    delete data['allCities'];
    delete data['allBrands'];
    delete data['allModels'];
    delete data['allToolTypes'];
    console.log(JSON.stringify(data))
    let url = 'http://localhost:8000/router/listing/';
    axios.post(url, JSON.stringify(data), {
      headers: {
        'content-type': 'application/json'
      }
    })
        .then(res => {
          console.log(res.data);
          navigate('/')
        })
        .catch(err => console.log(err))
  };

  const navigate = useNavigate()
  if (window.sessionStorage.getItem("jwtToken") !== null) {
    return(
      <div className="tool-create-container">
      <div className="tool-create-banner">
        
      </div>
        <h3 className="tool-create-banner-text">
            List your tool
        </h3>

        <br/><br/>
                    
        <h2>Where is it located?</h2>

        <br/>
        <label>Address
          <input 
          type="text" 
          name="address"
          placeholder="Address" 
          onChange={inputsHandler} 
          value={inputField.address}>
          </input>
        </label>

        <label>Choose a City:</label>
        <select name="city" onChange={inputsHandler} value={inputField.city}>
          <option value="" disabled selected>Select your option</option>
          {inputField.allCities.map(city => (<option value={city.city_id}>{city.name}</option>))}
        </select>
        
        <br/>
        <br/>
        <label>Choose a Neighborhood:</label>
        <select name="neighborhood" onChange={inputsHandler} value={inputField.neighborhood}>
          <option value="" disabled selected>Select your option</option>
          {inputField.allNeighborhoods.map(neighborhood => (<option value={neighborhood.neighborhood_id}>{neighborhood.name}</option>))}
        </select>

        <br/><br/>

        <h2>Which tool do you have?</h2>

        <label> Tool Category: </label>
        <select name="tool_category" onChange={inputsHandler} value={inputField.tool_category}>
          <option value="" disabled selected>Select your option</option>
          {inputField.allToolTypes.map(tool_category => (<option value={tool_category.tool_id}>{tool_category.name}</option>))}
        </select>
        <br/><br/>
        <label> Tool Brand: </label>
        <select name="brand" onChange={inputsHandler} value={inputField.brand}>
          <option value="" disabled selected>Select your option</option>
          {inputField.allBrands.map(brand => (<option value={brand.brand_id}>{brand.name}</option>))}
        </select>
        <br/><br/>
        <label> Tool Model: </label>
        <select name="model" onChange={inputsHandler} value={inputField.model}>
          <option value="" disabled selected>Select your option</option>
          {inputField.allModels.map(model => (<option value={model.model_id}>{model.name}</option>))}
        </select>
        <br/><br/>

        <h2>Tool Details</h2>

        <br/>
        <label>Title
          <input 
          type="text" 
          name="title"
          placeholder="Title" 
          onChange={inputsHandler} 
          value={inputField.title}>
          </input>
        </label>

        <label>Price (per hour)
          <input 
          type="number" 
          name="price"
          placeholder="Price" 
          onChange={inputsHandler} 
          value={inputField.price}>
          </input>
        </label>
        <br/><br/>
        <label>Description
          <textarea 
          type="text" 
          name="description"
          placeholder="Add a description" 
          onChange={inputsHandler} 
          value={inputField.description}>
          </textarea>
        </label>
        <br/><br/>
        <h2>Add a Photo</h2>
        <br/>
        <input 
        type="file"
        id="item_image_url"
        name="item_image_url"
        accept="image/png, image/jpeg" onChange={handleImageChange}/>
        <br/>

        <input className="tool-create-submit-btn" type="submit" onClick={handleSubmit} value="Finish"/>

    </div>
  )
  } else {
    return (
      <div>
        <h2>Please Sign In to Create Listing</h2>
        <Link to='/signup'>
          <button>Register</button>
        </Link>
        <Link to='/login'>
          <button>Login</button>
        </Link>
        <Routes>
            <Route path='login' element={<LogIn />} />
            <Route path='signup' element={<SignUp />} />
        </Routes>
      </div>
    )
  }
  
}
