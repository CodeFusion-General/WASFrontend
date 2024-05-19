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
    let formData = formDataFiller(productDTO, file);
    const url = `${API_BASE_URL}/product/addProduct`;
    const config = {
        headers: getHeaders(true)
    };

    try {
        const response = await axios.post(url, formData, config);
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data.id);
        if (response.status === 201) {
            const id = response.data.id;
            const fields = await addProductFields(productDTO.productFields, id);
            console.log("Fields:", fields);
            if (fields.status === 201) {
                return {product : response.data, fields: fields.data};
            } else {
                if (checkResponseStatusCode(fields.status)) {
                    throw new Error("Error adding product fields");
                }
            }
        } else {
            if (checkResponseStatusCode(response.status)) {
                throw new Error("Unexpected response status while adding product");
            }
        }
    } catch (error) {
        console.error("Error in addProduct:", error);
    }
};


const updateProduct = async (id, productDTO, file) => {
    let formData = formDataFiller(productDTO, file);

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

const formDataFiller = (productDTO, file) => {
    let formData = new FormData();
    formData.append("name", productDTO.name);
    formData.append("model", productDTO.model);
    formData.append("category", productDTO.category.id); // Use category ID
    formData.append("store", productDTO.store.id); // Use store ID
    formData.append("productCode", productDTO.productCode);
    formData.append("productFields", "");
    formData.append("transactions", "");
    formData.append('file', file);
    return formData;
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
