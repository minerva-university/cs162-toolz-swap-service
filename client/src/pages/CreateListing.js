import React, { Component } from "react";
import { Link } from "react-router-dom";


class CreateListing extends Component {
    render(){
        return(
            <div>
                <p>This is the CreateListing page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
        )
    }
}

export default CreateListing;