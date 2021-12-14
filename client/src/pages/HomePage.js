import React, { Component } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import "../stylesheets/search.css";
import "../stylesheets/navbar.css";
import "../stylesheets/dropdown.css"
import "../stylesheets/homepage.css"


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

class HomePage extends Component {
    render(){
        return(
            /*
            <div>
                <p>This is the Home page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
            */
            <div className="main-container">
                <div className="spacer"/>
                <h2 className="banner">Welcome to ToolSwap!</h2>
                <h2 className="caption">An online platform that connects prospective tool renters to nearby
                tool owners.</h2>
                <div className="search-container">
                    <form className="search-form">

                    <div className="search-where">

                        <label>Where</label>
                        <input type="text" placeholder="City, airport, address, or hotel" defaultValue={`San Francisco, CA`}/>

                    </div>

                    <div className="search-from">
            
                        <label>From</label>
                        <div className="main-datetime-wrapper">
                        <input className="main-date" type="date"/>
                        </div>

                    </div>

                    <div className="search-until">

                        <label>Until</label>
                        <div className="main-datetime-wrapper">
                        <input className="main-date" type="date" />  
                        </div>

                    </div>

                    <Link to={"/SearchPage"}>
                    <button className="search-button"/>
                    </Link>
                    
                    </form>
                </div>
            </div>
        )
    }
}

export default HomePage;