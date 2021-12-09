import React, { Component } from "react";
import { Link } from "react-router-dom";


class UserProfile extends Component {
    render(){
        return(
            <div>
                <p>This is the UserProfile page</p>
                <Link
                to={{ pathname: "/SearchPage" }}
                >
                <button>Click here to go to SearchPage</button>
                </Link>
            </div>
        )
    }
}

export default UserProfile;