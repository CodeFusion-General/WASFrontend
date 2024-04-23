import Cookies from "js-cookie";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";


//#region Fun

const checkResponseStatusCode = (status) => {
    if (status === 403) {
        alert("You must log in to perform this action.");
        Cookies.remove('user_token');
        window.location.href = `http://localhost:5173/login`;
        return false;
    }
    return true;
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

const getHeaders = (isMultipart = false) => {
    const token = Cookies.get('token');

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

//#endregion


const getResource = async (id) => {
    const url = `${API_BASE_URL}/resourceFile/image/${id}`;
    return apiCall(
        url,
        { headers: getHeaders(), responseType: "blob" },
        "Error getting photo:"
    );
};

export {
    getResource
}