import headerProvider from './headerProvider';
import { serverURL } from '../config'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function TestNav(signupData){
    const navigate = useNavigate()
    navigate('/login')
}
export default TestNav;