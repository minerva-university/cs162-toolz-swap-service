import React, { Component } from "react";
import { Link } from "react-router-dom";


class MyListings extends Component {
    render(){
        return(
            <div>
                <p>This is the MyListings page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
        )
    }
}

export default MyListings;