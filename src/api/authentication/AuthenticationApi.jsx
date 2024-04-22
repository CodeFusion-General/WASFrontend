import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = "http://localhost:8080";

const login = async (username, password) => {
    const url = `${API_BASE_URL}/account/login`; // Update with the correct URL
    const body = {
        username: username,
        password: password
    };

    try {
        const response = await axios.post(url, body);
        const token = response.data;
        Cookies.set('user_token', token, { expires: 1/24 }); // Token expires in 1 day
        return token;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
            throw new Error(error.response.data || 'Unknown error occurred');
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response:', error.request);
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error message:', error.message);
            throw new Error('Error setting up login request');
        }
    }
}



export {
    login
};