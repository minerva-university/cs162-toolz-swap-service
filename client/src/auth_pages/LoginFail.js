import React, { Component, useState  } from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import headerProvider from '../apis/headerProvider';
import { serverURL } from '../config'
import LogIn from './Login.js'

export default function LoginFail (){
    return (
        <div>
            <p> Login failed, please try again</p>
            <Link to="/signup">
                <button>Sign Up</button>
            </Link>
            <Link to="/login">
                <button>Try Again</button>
            </Link>
        </div>
    )
}