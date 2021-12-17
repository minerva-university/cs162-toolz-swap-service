// Requests that the user MADE

import React, { Component, useState, useEffect } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import HomePage from '../pages/HomePage.js'
import SearchPage from '../pages/SearchPage.js'
import headerProvider from '../apis/headerProvider';

import "../stylesheets/MyRequests.css";
import axios from 'axios'
export default function Requests (){
    const username = window.sessionStorage.getItem("username")
    const user_id = window.sessionStorage.getItem("userId")
    const url = "http://localhost:8000/filter/requests/?user_id=" + user_id
    const [requests, setRequests] = useState([])

    function getLists() {
        axios.get(url)
        .then((response)=>{
        setRequests(response.data)
        // axios returns API response body in .data
        })
    }
    const listItems = requests.map((d) => 
    <Link
    to={`/ListingExpanded/${d.listing}`}
    params={{
    "tool_id": d.listing,
    "title": d.listing_title
        }}>
    <button>
    <article class="list">
    <header>
      <div>
        <h2>{d.listing_title}</h2>
        <div>Request To {d.recipient_name} on {d.created_on}</div>
      </div>
    </header>
    <p>From: {d.renting_start}</p>
    <p>To: {d.renting_end}</p>
    <br></br>
    <p>{d.body}</p>
  </article>
  </button>
  </Link>);
   // console.log(myrequests)
    return (
        <div>
            <div>
                <h2>Requests That I've Made</h2>
            </div>
            <div>
                {listItems}
            </div>
        </div>
    )}
