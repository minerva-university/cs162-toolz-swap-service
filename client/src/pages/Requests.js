// Requests that the user MADE

import React, { Component, useState, useEffect } from "react";
import { useNavigate, Route, Routes, Link, useLocation } from "react-router-dom"
import HomePage from '../pages/HomePage.js'
import SearchPage from '../pages/SearchPage.js'
import headerProvider from '../apis/headerProvider';

import "../stylesheets/requests.css";
import axios from 'axios'

export default function Requests (){
    const username = window.sessionStorage.getItem("username")
    const user_id = window.sessionStorage.getItem("userId")
    const url = "http://localhost:8000/filter/requests/?user_id=" + user_id
    const [requests, setRequests] = useState([])

    useEffect(()=>{
        const res = axios.get(url)
        .then((response)=>{
        setRequests(response.data)
        console.log(requests)
        })
    }, [])
    const listItems = requests.map((d) => 
    <div><div className="list">
        <article >
        <header>
        <div>
            <Link 
            to={`/ListingExpanded/${d.listing}`}
            params={{
            "tool_id": d.listing,
            "title": d.listing_title
                }}>
            <h1>{d.listing_title}</h1>
            </Link>
            <div>
                <p>Request To {d.recipient_username}</p> 
                <p>on {d.created_on}</p>
            </div><br/>
        </div>
        </header>
        <p>From: {d.renting_start}</p>
        <p>To: {d.renting_end}</p>
        <br></br>
        <p>{d.body}</p>
        {d.approved? (
            <button backgroundColor="green"> Approved</button>
        ) : (
            <button backgroundColor="red"> Not Approved</button>
        )}
    </article>
    </div><br/>
    </div>);
   // console.log(myrequests)
    return (
        <div>
            <div>
                <h2 className = "center">Requests That I've Made</h2>
            </div>
            <div>
                {listItems}
            </div>
        </div>
    )}
