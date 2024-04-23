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

//#region Get ApiCalls
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

const getProductsByStoreId = async (storeId) => {
    const url = `${API_BASE_URL}/product/store/${storeId}`;

    try {
        const response = await axios.get(url, { headers: getHeaders() });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error getting products with storeId: ${storeId}`);
        }
    } catch (error) {
        console.error("Error in getProductsByStoreId:", error);
    }
};

const getAllProducts = async () => {
    const url = `${API_BASE_URL}/product/allProduct`;

    try {
        const response = await axios.get(url, { headers: getHeaders() });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Error getting all products");
        }
    } catch (error) {
        console.error("Error in getAllProducts:", error);
    }
};

const getProductById = async (id) => {
    const url = `${API_BASE_URL}/product/getProductById/${id}`;

    try {
        const response = await axios.get(url, { headers: getHeaders() });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error getting product with id: ${id}`);
        }
    } catch (error) {
        console.error("Error in getProductById:", error);
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
    }
};

const addProduct = async (productDTO, file) => {
    let formData = new FormData();

    formData.append('productDTO', JSON.stringify(productDTO));
    formData.append('file', file);

    const url = `${API_BASE_URL}/product/addProduct`;
    const config = {
        headers: getHeaders(true)
    };

    try {
        const response = await axios.post(url, formData, config);
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error("Unexpected response status while adding product");
        }
    } catch (error) {
        console.error("Error in addProduct:", error);
    }
};

const updateProduct = async (id, productDTO, file) => {
    let formData = new FormData();
    formData.append('productDTO', JSON.stringify(productDTO));
    formData.append('file', file);

    const url = `${API_BASE_URL}/product/updateProduct/${id}`;
    const config = {
        headers: getHeaders(true)
    };

    try {
        const response = await axios.put(url, formData, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        console.error("Error updating the product:", error);
    }
};

const deleteProduct = async (id) => {
    const url = `${API_BASE_URL}/product/deleteProduct/${id}`;

    try {
        const response = await axios.delete(url, { headers: getHeaders() });
        if (response.status === 204) {
            console.log(`Product with ID: ${id} deleted successfully`);
        } else {
            throw new Error(`Error deleting product with id: ${id}`);
        }
    } catch (error) {
        console.error("Error in deleteProduct:", error);
    }
};


export
{
    //get methods
    getProductsByStoreId,
    getAllProducts,
    getProductById,
    //add methods
    addProduct,
    //update methods
    updateProduct,
    //delete methods
    deleteProduct,
};
