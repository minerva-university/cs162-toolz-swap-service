import headerProvider from './headerProvider';
import { serverURL } from '../config'
import React from 'react'

function SignUpRequest(signupData){
    const url = serverURL + 'api/user/'
    const method = 'POST'
    const headers = headerProvider(false) // not login protected
    return fetch(url,
        {
            method: method,
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(signupData)
        }).then(response => {
            if (response.ok) {
                console.log('it works')
                return response.json();
            }
    }).catch((error) => {
        console.log('Error: ', error)
    });
}
export default SignUpRequest;