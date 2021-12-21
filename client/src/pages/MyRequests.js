// requests made TO the user. These are requests that people ask of you
// TODO: we eventually want to make it so that user can no longer see request after expiration data
import React, { Component, useState, useEffect } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import HomePage from '../pages/HomePage.js'
import SearchPage from '../pages/SearchPage.js'
import headerProvider from '../apis/headerProvider';

import "../stylesheets/MyRequests.css";
import axios from 'axios'
export default function MyRequests (){
    const username = window.sessionStorage.getItem("username")
    const user_id = window.sessionStorage.getItem("userId")
    const url = "http://localhost:8000/filter/myrequests/?user_id=" + user_id
    const [myrequests, setMyRequests] = useState([])

    useEffect(()=>{
        const res = axios.get(url)
        .then((response)=>{
        setMyRequests(response.data)
        console.log(myrequests)
        })
    }, [])

    // only carry through with function if approval state is false (so we can approve)
    const handleApprove_approve = (e, request_id, approved) => {
        e.preventDefault()
        if (approved == false) {
            console.log(request_id)
            const patch_url = "http://localhost:8000/router/listing_request/"+request_id+'/'
            // idempotent PATCH request
            let res_patch = axios.patch(patch_url, {"approved": true})
            window.location.reload(false);
        }
    }
    // only carry through with function if approval state is true (so we can disapprove)
    const handleApprove_disapprove = (e, request_id, approved) => {
        e.preventDefault()
        if (approved == true) {
            console.log(request_id)
            const patch_url = "http://localhost:8000/router/listing_request/"+request_id+'/'
            // idempotent PATCH request
            let res_patch = axios.patch(patch_url, {"approved": false})
            window.location.reload(false);
        }
    }
    const listItems = myrequests.map((d) => 
    <div className="list">
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
                <p>Request By {d.author_username}</p> 
                <p>on {d.created_on}</p>
            </div><br/>
        </div>
        </header>
        <p>From: {d.renting_start}</p>
        <p>To: {d.renting_end}</p>
        <br></br>
        <p>{d.body}</p>
        <button style={{backgroundColor:d.approved==true?"green":""}} onClick={(e) => {handleApprove_approve(e, d.request_id, d.approved)}}> Approve</button>
        <button style={{backgroundColor:d.approved==false?"red":""}} onClick={(e) => {handleApprove_disapprove(e, d.request_id, d.approved)}}> Not Approved</button>
    </article>
    </div>);
   // console.log(myrequests)
    return (
        <div>
            <div>
                <h2>Requests Made to You</h2>
            </div>
            <div>
                {listItems}
            </div>
        </div>
    )}
