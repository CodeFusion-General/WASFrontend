import axios from "axios";
import Cookies from "js-cookie";
import {addProductFields} from "../productField/ProductFieldApi.jsx";

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

const

export {

};