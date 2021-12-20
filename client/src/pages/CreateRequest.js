import React, { useState, useEffect, Component } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../stylesheets/createRequest.css";
import axios from 'axios'

// Here we opt to instead source data from url params. Faster, easier
const CreateRequest =()=> {
    const requester = window.sessionStorage.getItem('userId')
    const params = useParams()
    const navigate = useNavigate()
    const [request, setRequest] = useState({
            "body": "",
            "renting_start": '',
            "renting_end": '',
            "approved": false,
            "listing": params.tool_id,
            "author": requester,
            "recipient": params.owner,
        })
    const inputsHandler = (e) =>{
        // console.log(e.target.name, e.target.value)
        setRequest({
            ...request,
            [e.target.name]: e.target.value
            })
        console.log(request)
        }  
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(request)
        const data = JSON.parse(JSON.stringify(request))
        const temp_str_start = data["renting_start"]
        const temp_str_end = data["renting_end"]

        data["renting_start"]=temp_str_start+"T00:01:00-00:00"
        data["renting_end"]=temp_str_end+"T00:00:01-00:00"
        console.log(data)
        let url = 'http://localhost:8000/router/listing_request/';
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
    }
    useEffect(() => {
        console.log(params)
    }, [])
        return(
            <div>
                <div>
                <h2>Create a Request for: {params.title}</h2>
                <p>Owner: {params.owner_name} </p>
                </div>
                <br/><br/><br/>
                <div>
                    <form onSubmit={handleSubmit} className="request">
                    <label> Write something to owner
                    <input 
                    className = "simple"
                    type="text" 
                    name="body"
                    width="50px"
                    placeholder="..." 
                    onChange={inputsHandler} 
                    value={request.body}>
                    </input>
                    </label>

                    <label> When would you like to begin the rental?
                    <div className="main-datetime-wrapper">
                    <input 
                    name="renting_start"
                    className="main-date" 
                    type="date" 
                    onChange={inputsHandler} 
                    value={request.renting_start}>
                    </input>
                    </div>
                    </label>

                    <label> When would you like to end the rental?
                    <div className="main-datetime-wrapper">
                    <input 
                    name="renting_end"
                    className="main-date" 
                    type="date" 
                    onChange={inputsHandler} 
                    value={request.renting_end}>
                    </input>
                    </div>
                    </label>
                    <br/>
                    <input type="submit" onSubmit={handleSubmit}></input>
                    </form>
                </div>
            </div>
        )
    
}

export default CreateRequest;