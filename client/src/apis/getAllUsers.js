import headerProvider from './headerProvider';
import { serverURL } from '../config'

function getAllUsersRequest(){
    const url = serverURL + 'api/users/'
    const method = 'GET'
    const headers = headerProvider(true) // login protected
    return fetch(url,
        {
            method: method,
            mode: 'cors',
            headers: headers,
        }).then(response => {
            if (response.ok) {
               window.sessionStorage.clear(); // clear credentials from session storage
               return response.json() 
            }
    }).catch((error) => {
        console.log('Error: ', error)
    });
}
export default getAllUsersRequest();