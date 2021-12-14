import headerProvider from './headerProvider';
import { serverURL } from '../config'

function LoginRequest(loginData){
    const url = serverURL + 'auth/login/'
    const method = 'POST'
    const headers = headerProvider(false) // not login protected
    return fetch(url,
        {
            method: method,
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(loginData)
        }).then(response => {
            if (response.ok) {
               return response.json() 
            }
    }).catch((error) => {
        console.log('Error: ', error)
    });
}
export default LoginRequest;