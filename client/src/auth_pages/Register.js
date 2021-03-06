import React, { Component, useState } from "react";
//import SignUpRequest from '../apis/apiSignup';
import headerProvider from '../apis/headerProvider';
import { serverURL } from '../config'
import TestNav from '../apis/apiTest';
import { useNavigate, Route, Routes, Link } from "react-router-dom"
import Login from './Login.js'

export default function SignUp (){
    
    const [inputField , setInputField] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password1: '',
        password2: ''
    })
    console.log(inputField)
    
    const inputsHandler = (e) =>{
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value
          })
        console.log(inputField)
    }
    const navigate = useNavigate()
    
    function SignUpRequest(signupData){
        const url = serverURL + 'api/user/'
        const method = 'POST'
        const headers = headerProvider(false) // not login protected
        console.log(JSON.stringify(signupData))
        return fetch(url,
            {
                method: method,
                mode: 'cors',
                headers: headers,
                body: JSON.stringify(signupData)
            }).then(response => {
                if (response.ok) {
                    console.log('it works')
                    navigate('/login')
                    return response.json();
                }
        }).catch((error) => {
            console.log('Error: ', error)
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        let data = inputField
        console.log("why")
        SignUpRequest(data)
       
    }
    
    function handleClick() {
        console.log(inputField)
        navigate('/login')

    }
    
    return (
        <div>
            <input 
            type="first_name" 
            name="first_name" 
            onChange={inputsHandler} 
            placeholder="First Name" 
            value={inputField.first_name}/>

            <br/>

            <input 
            type="last_name" 
            name="last_name" 
            onChange={inputsHandler} 
            placeholder="Last Name" 
            value={inputField.last_name}/>

            <br/>

            <input 
            type="username" 
            name="username" 
            onChange={inputsHandler} 
            placeholder="Username" 
            value={inputField.username}/>

            <br/>

            <input 
            type="email" 
            name="email" 
            onChange={inputsHandler} 
            placeholder="Email" 
            value={inputField.email}/>

            <br/>

            <input 
            type="password" 
            name="password1" 
            onChange={inputsHandler} 
            placeholder="Password" 
            value={inputField.password1}/>

            <br/>

            <input 
            type="password" 
            name="password2" 
            onChange={inputsHandler} 
            placeholder="Confirm Password" 
            value={inputField.password2}/>

            <br/>
            <button onClick={handleSubmit}>Submit Now</button>
            <Routes>
                <Route path='login' element={<Login />} />
            </Routes>
            <button onClick={handleClick}>go to login</button>
        </div>
        
        
);
}



