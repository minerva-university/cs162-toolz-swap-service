import React, { Component, useState  } from "react";
//import LoginRequest from "../apis/apiLogin"
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import HomePage from '../pages/HomePage.js'
import headerProvider from '../apis/headerProvider';
import { serverURL } from '../config'

export default function LogIn (){
    
    const [inputField , setInputField] = useState({
        username: '',
        password: '',
    })
    console.log(inputField)
    
    const inputsHandler = (e) =>{
        console.log(e.target.name)
        
        if (e.target.name == "password") {
            setInputField({
                ...inputField,
                [e.target.name]: e.target.value,
                ["password1"]: e.target.value,
                ["password2"]: e.target.value,
              })
            }
            else {
                setInputField({
                    ...inputField,
                    [e.target.name]: e.target.value
                })
            }
        }
        console.log(inputField)
    const navigate = useNavigate()
    
    function LoginRequest(loginData){
        const url = serverURL + 'auth/login/'
        const method = 'POST'
        const headers = headerProvider(false) // not login protected
        console.log(loginData["password"])
        return fetch(url,
            {
                method: method,
                mode: 'cors',
                headers: headers,
                body: JSON.stringify(loginData)
            }).then(response => {
                if (response.ok) {
                    navigate('/')
                    return response.json() 
                   
                }
        }).catch((error) => {
            console.log('Error: ', error)
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        let data = inputField
        LoginRequest(data).then(serverResponse=> {
            // store credentials in sessionStorage
            console.log(serverResponse)
                const jwtToken = serverResponse["token"]
                const memberId = serverResponse["member_id"]
                const userId = serverResponse["user_id"]
                window.sessionStorage.setItem("jwtToken",  jwtToken)
                window.sessionStorage.setItem("memberId",  memberId)
                window.sessionStorage.setItem("userId",  userId)
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
            value={inputField.username}
            name="username"
            onChange={inputsHandler}
            />
        </label>
        <br />
        <label>
            Password:
            <input
            value={inputField.password}
            name="password"
            type="password"
            onChange={inputsHandler}
            />
        </label>
        <br />
        <button>Submit</button>
        <Routes>
            <Route path='/' element={<HomePage />} />
        </Routes>
        </form> 
);
}


