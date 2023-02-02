// Richie T-57866

/* Got help for the structure of this code from the movie-app demo from the MERN track of the Code.7370 program provided by The Last Mile. */

// Import the necessary modules from axios.
import axios from 'axios'

// Create an axios object and set properties.
const api = axios.create({
    baseURL: 'http://localhost:8000',
})

/*   User signup   */
export const handleSignup = async newUser => {
    console.log('Sending form to api',newUser);
    const res = await api.post('/signup', newUser);
    console.log('response', res);
    return res;
}
/*   User login   */
export const handleLogin = async user => {
    const res = await api.post('/login', user);
    return res;
}
/* User information */
export const userInfo = async () => {
    console.log('Getting user info');
    const token = window.localStorage.getItem('api_token');
    const res = await api.get('/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res;
}

const apis = {
    handleSignup,
    handleLogin,
    userInfo,
}

export default apis