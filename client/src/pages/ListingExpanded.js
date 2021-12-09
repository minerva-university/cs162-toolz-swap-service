import React, { Component } from "react";
import { Link } from "react-router-dom";


class ListingExpanded extends Component {
    render(){
        return(
            <div>
                <p>This is the ListingExpanded page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
        )
    }
}

export default ListingExpanded;