// Requests that the user MADE

import React, { Component } from "react";
import { Link } from "react-router-dom";


class Requests extends Component {
    render(){
        return(
            <div>
                <p>This is the Requests page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
        )
    }
}

export default Requests;