import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = "http://localhost:8080";

const login = async (username, password) => {
    const url = `${API_BASE_URL}/account/login`;
    const body = {
        username: username,
        password: password
    };

    try {
        const response = await axios.post(url, body);
        const token = response.data;
        Cookies.set('user_token', token, { expires: 1/24 });
        return token;
    } catch (error) {
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
            throw new Error(error.response.data || 'Unknown error occurred');
        } else if (error.request) {
            console.error('No response:', error.request);
            throw new Error('No response received from server');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Error setting up login request');
        }
    }
}

const logout = () => {
    alert("Successfully logged out.");
    Cookies.remove('user_token');
    window.location.href = "http://localhost:5173/";
}

export {
    login,
    logout
};