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

const getAllCompanies = async () => {
    const url = `${API_BASE_URL}/company/getall`;
    return apiCall(
        url,
        { headers: getHeaders() },
        `Unexpected response status while getting companies.`
    );

}

const getCompanyById = async (id) => {
    const url = `${API_BASE_URL}/company/getById/${id}`;
    return apiCall(
        url,
        { headers: getHeaders() },
        `Unexpected response status while getting company.`
    );

}

const addCompany = async (company, file) => {
    const url = `${API_BASE_URL}/company/addCompany`;
    let formData = new FormData();
    formData.append('name', company.name);
    formData.append('description', company.description);
    formData.append('taxLevel', company.taxLevel);
    formData.append('userId', company.userId);
    if(file){
        formData.append('file', file);
    }
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
        if (!checkResponseStatusCode(error.response.status)) {
            return;
        }
        console.error("Error adding the company:", error);
    }

}
const updateCompany = async (company, file) => {
    let formData = new FormData();
    console.log(company);
    formData.append('name', company.name);
    formData.append('description', company.description);
    formData.append('taxLevel', company.taxLevel);
    formData.append('userId', company.user.id);
    if (file) {
        formData.append('file', file);
    }

    const url = `${API_BASE_URL}/company/company-update/${company.id}`;

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
        console.error("Error updating the company:", error);
    }
};

export {
    getCompanyById,
    getAllCompanies,
    addCompany,
    updateCompany
}