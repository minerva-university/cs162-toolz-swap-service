import headerProvider from './headerProvider';
import { serverURL } from '../config'

function signUpRequest(signupData){
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
                return response.json();
            }
    }).catch((error) => {
        console.log('Error: ', error)
    });
}
export default signUpRequest;