import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const getStoreById = async (id) => {
    const url = `${API_BASE_URL}/store/getStoreById/${id}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while getting store: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not fetch store for id ${id}`, error);
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
};

const getAllStores = async () => {
    const url = `${API_BASE_URL}/store/allStore`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while getting all stores: ${response.status}`);
        }
    } catch (error) {
        console.error("Could not fetch stores", error);
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
};

const getStoresByStoreId = async (storeId) => {
    const url = `${API_BASE_URL}/store/${storeId}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while getting stores by store id: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not fetch stores for store id ${storeId}`, error);
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
};

const addStore = async (formData) => {
    const url = `${API_BASE_URL}/store/addStore`;

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
        console.error("Error adding the store:", error);
        throw error;
    }
};

const updateStore = async (id, storeDTO, file) => {
    const url = `${API_BASE_URL}/store/updateStore/${id}`;

    let formData = new FormData();
    formData.append('storeDTO', new Blob([JSON.stringify({
        ...storeDTO,
        id,
    })], {
        type: 'application/json'
    }));
    if (file) {
        formData.append('file', file);
    }

    try {
        const response = await axios.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status while updating store: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not update store with id ${id}`, error);
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
};

const deleteStore = async (id) => {
    const url = `${API_BASE_URL}/store/deleteStore/${id}`;

    try {
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204) {
            console.log(`Store with id ${id} deleted successfully`);
        } else {
            throw new Error(`Unexpected response status while deleting store: ${response.status}`);
        }
    } catch (error) {
        console.error(`Could not delete store with id ${id}`, error);
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
};

export {
    //get methods
    getStoreById,
    getAllStores,
    getStoresByStoreId,
    //add methods
    addStore,
    //update methods
    updateStore,
    //delete methods
    deleteStore,
};