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


const getProductFieldById = async (id) => {
    const url = `${API_BASE_URL}/productField/${id}`;

    try {
        const response = await axios.get(url, { headers: getHeaders() });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error getting product field with id: ${id}`);
        }
    } catch (error) {
        console.error("Error in getProductFieldById:", error);
    }
};

const getAllProductFields = async () => {
    const url = `${API_BASE_URL}/productField/getAllProductField`;

    try {
        const response = await axios.get(url, { headers: getHeaders() });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Error getting all product fields");
        }
    } catch (error) {
        console.error("Error in getAllProductFields:", error);
    }
};

const getProductFieldsByProductId = async (productId) => {
    const url = `${API_BASE_URL}/productField/product/${productId}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders()
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while getting product fields: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not fetch product fields for product id ${productId}`, error);
    }
};

const addProductField = async (productFieldDTO) => {
    const url = `${API_BASE_URL}/productField/addProductField`;

    try {
        const response = await axios.post(url, productFieldDTO, {
            headers: getHeaders()
        });

        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while adding product field: ${response.status}`);
        }
    } catch (error) {
        console.error("Could not add product field", error);
    }
};

const updateProductField = async (id, productFieldDTO) => {
    const url = `${API_BASE_URL}/productField/updateProductField/${id}`;

    try {
        const response = await axios.put(url, productFieldDTO, {
            headers: getHeaders()
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while updating product field: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not update product field with id ${id}`, error);
    }
};


const deleteProductField = async (id) => {
    const url = `${API_BASE_URL}/productField/deleteProductField/${id}`;

    try {
        const response = await axios.delete(url, {
            headers: getHeaders()
        });

        if (response.status === 204) {
            console.log(`Product field with id ${id} has been deleted successfully.`);
        } else {
            throw new Error(`Unexpected response status while deleting product field: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not delete product field with id ${id}`, error);
    }
};



const getTransactionById = async (id) => {
    const url = `${API_BASE_URL}/transaction/getTransactionById/${id}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders()
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while getting transaction by id: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not fetch transaction for transaction id ${id}`, error);
    }
};

const getAllTransactions = async () => {
    const url = `${API_BASE_URL}/transaction/allTransaction`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders()
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while getting all transactions: ${response.status}`);
        }

    } catch (error) {
        console.error("Could not fetch all transactions", error);
    }
};

const getTransactionsByStoreId = async (storeId) => {
    const url = `${API_BASE_URL}/transaction/store/${storeId}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders()
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while getting transactions by store id: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not fetch transactions for store id ${storeId}`, error);
    }
};

const addTransaction = async (transactionDTO, file) => {
    const url = `${API_BASE_URL}/transaction/addTransaction`;

    let formData = new FormData();
    formData.append('transactionDTO', new Blob([JSON.stringify({
        ...transactionDTO
    })], {
        type: 'application/json'
    }));
    if (file) {
        formData.append('file', file);
    }

    try {
        const response = await axios.post(url, formData, {
            headers: getHeaders(true)
        });

        if (response.status === 201) {
            console.log('Transaction added successfully');
            return response.data;
        } else {
            throw new Error(`Unexpected response status while adding transaction: ${response.status}`);
        }
    } catch (error) {
        console.error('Could not add transaction', error);
    }
};

const updateTransaction = async (id, transactionDTO, file) => {
    const url = `${API_BASE_URL}/transaction/updateTransaction/${id}`;

    let formData = new FormData();
    formData.append('transactionDTO', new Blob([JSON.stringify({
        ...transactionDTO
    })], {
        type: 'application/json'
    }));
    if (file) {
        formData.append('file', file);
    }

    try {
        const response = await axios.put(url, formData, {
            headers: getHeaders(true)
        });

        if (response.status === 200) {
            console.log('Transaction updated successfully');
            return response.data;
        } else {
            throw new Error(`Unexpected response status while updating transaction: ${response.status}`);
        }
    } catch (error) {
        console.error('Could not update transaction', error);
    }
};

const deleteTransaction = async (id) => {
    const url = `${API_BASE_URL}/transaction/deleteTransaction/${id}`;

    try {
        const response = await axios.delete(url, {
            headers: getHeaders()
        });

        if (response.status === 204) {
            console.log('Transaction deleted successfully');
        } else {
            throw new Error(`Unexpected response status while deleting transaction: ${response.status}`);
        }
    } catch (error) {
        console.error('Could not delete transaction', error);
    }
};

export
{
    //get methods
    getUserById,
    getUsersByStoreId,
    getAllUsers,
    getProductsByStoreId,
    getAllProducts,
    getProductById,
    getProductFieldById,
    getProductFieldsByProductId,
    getAllProductFields,
    getResource,
    getTransactionById,
    getAllTransactions,
    getTransactionsByStoreId,
    getUsersByStoreIdAndRoles,
    //add methods
    addAccount,
    addProduct,
    addProductField,
    addTransaction,
    //update methods
    updateUser,
    updateProduct,
    updateProductField,
    updateTransaction,
    //delete methods
    deleteUser,
    deleteProduct,
    deleteProductField,
    deleteTransaction,
};