import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

//add region in here

//#region Fun

const checkResponseStatusCode = (status) => {
    if (status === 403) {
        alert("Bu işlemi yapabilmek için giriş yapmalısınız");
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
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
    }
};

const getHeaders = (isMultipart = false) => {
    if (isMultipart) {
        return {};
    }
    return {
        "Content-Type": "application/json",
    };
};

//#endregion



//#region UserAPI

const getUsersByStoreId = async (storeId) => {
    const url = `${API_BASE_URL}/store/${storeId}`;
    return apiCall(url, { headers: getHeaders() }, `Error getting users with storeId: ${storeId}`);
};

const getUserById = async (id) => {
    const url = `${API_BASE_URL}/getUserById/${id}`;
    return apiCall(url, { headers: getHeaders() }, `Error getting user with id: ${id}`);
};

const getAllUsers = async () => {
    const url = `${API_BASE_URL}/allUser`;
    return apiCall(url, { headers: getHeaders() }, "Error getting all users:");
};

// `addAccount` fonksiyonu şimdi sadece `formData` alacak
const addAccount = async (formData) => {
    const url = `${API_BASE_URL}/account/addAccount`;

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error adding the account:", error);
        throw error;  // Hatanın üst komponente ulaşmasını sağlayın
    }
};


const updateUser = async (id, name, surname, email, file) => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('file', file);

    const url = `${API_BASE_URL}/updateUser/${id}`;

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
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
    }
};

const deleteUser = async (id) => {
    const url = `${API_BASE_URL}/deleteUser/${id}`;

    try {
        const response = await axios.delete(url);
        checkResponseStatusCode(response.status);
        return response.data;
    } catch (error) {
        if (!checkResponseStatusCode(error.response.status)) {
            return;
        }
        console.error("Error deleting the user:", error);
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
    }
};

//#endregion

export
{
    //get methods
    getUserById,
    getUsersByStoreId,
    getAllUsers,
    //add methods
    addAccount,
    //update methods
    updateUser,
    //delete methods
    deleteUser
};