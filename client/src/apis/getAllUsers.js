import headerProvider from './headerProvider';
import { serverURL } from '../config'

function getAllUsersRequest(){
    const url = serverURL + 'api/users/'
    const method = 'GET'
    const headers = headerProvider(true) // not login protected
    return fetch(url,
        {
            method: method,
            mode: 'cors',
            headers: headers,
        }).then(response => {
            if (response.ok) {
               return response.json() 
            }
    }).catch((error) => {
        console.log('Error: ', error)
    });
}
export default getAllUsersRequest();