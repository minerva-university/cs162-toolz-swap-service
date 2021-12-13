import React from 'react';
import { Link } from 'react-router-dom'; 


const NavBar = () => {
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
              <a>Log out</a>
            </div>
          </div>
        </div>

        )};

export default NavBar;