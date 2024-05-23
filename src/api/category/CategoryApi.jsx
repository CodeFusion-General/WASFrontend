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

const getCategoriesByStoreId = async (storeId) => {
    const url = `${API_BASE_URL}/category/store/${storeId}/categories`
     
    return apiCall(
        url,
        { headers: getHeaders() },
        `Unexpected response status while getting categories by store id.`
    );
}
const getTop5MostProfitableCategory = async (storeId) => {
    const url = `${API_BASE_URL}/category/top5CategoriesByProfit/${storeId}`;
    return apiCall(
        url,
        { headers: getHeaders() },
        'Unexpected response status while getting top 5 most profitable categories.'
    );
};

const addCategory = async (category) => {
    const url = `${API_BASE_URL}/category/add`;
    
    console.log("Category Data Sent to API:", category);  // Debugging: Log the category data

    try {
        const response = await axios.post(url, category, { headers: getHeaders() });
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error("Error adding category");
        }
    } catch (error) {
        console.error("Error in addCategory:", error);
        throw error;  // Ensure error is thrown to be caught in handleAddCategory
    }
};

export {
    getAllCategories,
    getCategoriesByStoreId,
    getTop5MostProfitableCategory,
    addCategory
}