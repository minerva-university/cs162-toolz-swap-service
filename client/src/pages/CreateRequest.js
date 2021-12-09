import React, { Component } from "react";
import { Link } from "react-router-dom";


class CreateRequest extends Component {
    render(){
        return(
            <div>
                <p>This is the CreateRequest page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
        )
    }
}

export default CreateRequest;