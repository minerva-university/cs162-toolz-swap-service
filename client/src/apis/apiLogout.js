import headerProvider from './headerProvider';
import { serverURL } from '../config'

function logoutRequest(){
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
               return response.json() // TODO: clear sessionStorage 
            }
    }).catch((error) => {
        console.log('Error: ', error)
    });
}
export default getAllUsersRequest();