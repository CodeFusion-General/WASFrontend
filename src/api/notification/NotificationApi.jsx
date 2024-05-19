import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

const checkResponseStatusCode = (status) => {
    if (status === 403) {
        alert("You must log in to perform this action.");
        Cookies.remove('user_token');
        window.location.href = `http://localhost:5173/login`;
        return false;
    }
    return true;
};

//#region Get ApiCalls
const getHeaders = (isMultipart = false) => {
    const token = Cookies.get('user_token');

    if (isMultipart) {
        return {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        };
    }
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

const apiCall = async (url, config, errorHandler) => {
    try {
        return await axios.get(url, config);
    } catch (error) {
        if (!checkResponseStatusCode(error.response.status)) {
            return;
        }
        console.error(errorHandler, error);
    }
};

const getTop3NotifiticationsByUserId = async (userId) => {
    const url = `${API_BASE_URL}/notification/user/${userId}/top3`;
    return apiCall(
        url,
        { headers: getHeaders() },
        "Error getting top 3 notifications:"
    );
}

const markNotificationIsSeen = async (notificationId) => {
    const url = `${API_BASE_URL}/notification/markNotification/${notificationId}`;
    try {
        return await axios.put(url, {},{ headers: getHeaders() });
    } catch (error) {
        if (!checkResponseStatusCode(error.response.status)) {
            return;
        }
        console.error("Error while marking notification", error);
    }
}

export {
    getTop3NotifiticationsByUserId,
    markNotificationIsSeen
};