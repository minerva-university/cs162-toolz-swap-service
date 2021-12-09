// requests made TO the user

import React, { Component } from "react";
import { Link } from "react-router-dom";


class MyRequests extends Component {
    render(){
        return(
            <div>
                <p>This is MyRequests page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
        )
    }
}

export default MyRequests;