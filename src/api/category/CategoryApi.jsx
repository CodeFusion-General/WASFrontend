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

const getAllCategories = async () => {
    const url = `${API_BASE_URL}/category/getall`

    return apiCall(
        url,
        {headers: getHeaders()},
        `Unexpected response status while getting categories.`
    )
}
const addCategory = async (category) => {
    const url = `${API_BASE_URL}/category/add`

    const categoryData = {
        category : {
            name: category.name,
            prototypes: []
        },
        prototypes: category.prototypes
    }

    try {
        const response = await axios.post(url, categoryData, {headers: getHeaders()})
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error("Error adding category")
        }
    } catch (error) {
        console.error("Error in addCategory:", error)
    }


}

export {
    getAllCategories,
    addCategory
}