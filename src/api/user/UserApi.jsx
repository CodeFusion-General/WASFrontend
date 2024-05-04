import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

//add region in here

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

//#endregion

//#region UserAPI

const getUsersByStoreIdAndRoles = async (storeId, roles) => {
    const roleQuery = roles.map(role => `roles=${encodeURIComponent(role)}`).join('&');
    const url = `${API_BASE_URL}/storeWithRole/${storeId}?${roleQuery}`;
    return apiCall(
        url,
        { headers: getHeaders() },
        `Error getting users with storeId: ${storeId} and roles: ${roles.join(', ')}`
    );
};

const getUsersByStoreId = async (storeId) => {
    const url = `${API_BASE_URL}/user/store/${storeId}`;
    return apiCall(url, { headers: getHeaders() }, `Error getting users with storeId: ${storeId}`);
};

const getUserById = async (id) => {
    const url = `${API_BASE_URL}/user/getUserById/${id}`;
    return apiCall(url, { headers: getHeaders() }, `Error getting user with id: ${id}`);
};

const getAllUsers = async () => {
    const url = `${API_BASE_URL}/user/allUser`;
    return apiCall(url, { headers: getHeaders() }, "Error getting all users:");
};


const addAccount = async (formData) => {
    const url = `${API_BASE_URL}/account/addAccount`;

    try {
        const response = await axios.post(url, formData, {
            headers: getHeaders(true)
        });

        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error adding the account:", error);
        throw error;
    }
};


const updateUser = async (id, name, surname, email, file) => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('file', file);

    const url = `${API_BASE_URL}/user/updateUser/${id}`;

    const config = {
        headers: getHeaders(true)
    };

    try {
        const response = await axios.put(url, formData, config);
        checkResponseStatusCode(response.status);
        return response.data;
    } catch (error) {
        if (!checkResponseStatusCode(error.response.status)) {
            return;
        }
        console.error("Error updating the user:", error);
    }
};

const deleteUser = async (id) => {
    const url = `${API_BASE_URL}/user/deleteUser/${id}`;

    try {
        const response = await axios.delete(url);
        checkResponseStatusCode(response.status);
        return response.data;
    } catch (error) {
        if (!checkResponseStatusCode(error.response.status)) {
            return;
        }
        console.error("Error deleting the user:", error);
    }
};

//#endregion


export
{
    //get methods
    getUserById,
    getUsersByStoreId,
    getAllUsers,
    getUsersByStoreIdAndRoles,
    //add methods
    addAccount,
    //update methods
    updateUser,
    //delete methods
    deleteUser,
};