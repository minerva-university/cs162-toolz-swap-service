import React, { Component } from "react";
import { Link } from "react-router-dom";

const CreateRequest =()=> {
    
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

export default CreateRequest;