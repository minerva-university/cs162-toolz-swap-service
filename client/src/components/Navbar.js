import React from 'react';
import { Link, Navigate } from 'react-router-dom'; 
import axios from "axios";
import headerProvider from '../apis/headerProvider';
import { serverURL } from '../config'

const is_user = () => {
  if (window.sessionStorage.getItem("jwtToken") !== null) {
    return true
  } else {
    return false
  }
}
const NavBar = () => {
    const isLoggedin = is_user()

    function handleLogout() {
      const url = 'http://localhost:8000/auth/logout/'
      const method = 'GET'
      //const headers = headerProvider(true)
      const token = window.sessionStorage.getItem('jwtToken')
      const memberId = window.sessionStorage.getItem('memberId')
      const userId = window.sessionStorage.getItem('userId')
      return axios.get(url, {headers: {
        "Token": token,
        'Member-Id': memberId,
        'User-Id' : userId
      }})
        .then(response => console.log(response))
  }
    if (isLoggedin) {
      return (
        <div>
            <Link to="/About">
                <button className="navbutton">About Us</button>
            </Link>
            &nbsp;&nbsp;&nbsp;  
            <Link to="/Requests">
                <button className="navbutton">Requests</button>
            </Link>
            &nbsp;&nbsp;&nbsp;
          <Link to="/SavedListings">
            <button className="navbutton">Saved Listings</button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/MyListings">
            <button className="navbutton">My Listings</button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <div className="dropdown">
            <div className="nav-profile"/>
            <div className="dropdown-content"> 
              <Link to="/UserProfile">
                Update Profile
              </Link>
              <Link to="/MyRequests">
                My Requests
              </Link>
              <button className="navbutton" onClick={handleLogout}>Logout</button>
              {/* <Link to="/" onClick={handleLogout}>
                Log out
              </Link> */}
            </div>
          </div>
        </div>
        )
    } else {
      return (
        <div>
            <Link to="/About">
                <button className="navbutton">About Us</button>
            </Link>
            &nbsp;&nbsp;&nbsp;  
            <Link to="/signup">
                <button className="navbutton">Sign up</button>
            </Link>
            &nbsp;&nbsp;&nbsp;
          <div className="dropdown">
            <div className="nav-profile"/>
            <div className="dropdown-content"> 
              <Link to="/signup">
                Sign Up
              </Link>
              <Link to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
        )
    }
      };

export default NavBar;