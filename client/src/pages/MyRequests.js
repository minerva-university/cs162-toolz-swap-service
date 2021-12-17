// requests made TO the user. These are requests that people ask of you

import React, { Component, useState, useEffect } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import HomePage from '../pages/HomePage.js'
import SearchPage from '../pages/SearchPage.js'
import headerProvider from '../apis/headerProvider';
import { serverURL } from '../config'
import axios from 'axios'
export default function MyRequests (){
    const username = window.sessionStorage.getItem("username")
    const user_id = window.sessionStorage.getItem("userId")
    const url = "http://localhost:8000/filter/myrequests/?user_id=" + user_id
    const [myrequests, setMyRequests] = useState([])

    function getLists() {
        axios.get(url)
        .then((response)=>{
        setMyRequests(response.data)
        // axios returns API response body in .data
        })
    }
    getLists()
    const listItems = myrequests.map((d) => 
    <Link to = '/'> 
    <button>
    <article class="post">
    <header>
      <div>
        <h3>{d.listing_name}</h3>
        <div>Request By {d.author_name} on {d.created_on}</div>
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
                <p>This is MyRequests page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
            <div>
                {listItems}
            </div>
        </div>
    )}
// class MyRequests extends Component {
//     render(){
//         return(
//             <div>
//                 <p>This is MyRequests page</p>
//                 <Link
//                 to={{ pathname: "/SearchPage" }}
//                 >
//                 <button>Click here to go to SearchPage</button>
//                 </Link>
//             </div>
//         )
//     }
// }