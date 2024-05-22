import {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {GlobalCompanyId} from "../../../api/company/GlobalCompanyId.jsx";
import {decodeUserToken} from "../../../api/authentication/AuthenticationApi.jsx";
import {getCompanyById} from "../../../api/company/CompanyApi.jsx";
import defaultUserIcon from "../../../assets/user.webp";

function CompanyDetail() {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const { globalCompanyId } = useContext(GlobalCompanyId);

    useEffect(() => {
        const fetchCompany = async () => {
            const decodedToken = decodeUserToken();
            if ((decodedToken && decodedToken.companyId) || globalCompanyId) {
                try {
                    const response = await getCompanyById(decodedToken.companyId || globalCompanyId);
                    setCompany(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    alert('Failed to fetch company data. Please log in again.');
                    navigate('/login');
                }
            } else {
                alert('Company ID not found. Please log in again.');
                navigate('/login');
            }
        };
        fetchCompany();
    }, [navigate]);

    if (!company) {
        return <div>Loading...</div>;
    }

    const imageUrl = company.resourceFile && company.resourceFile.data ? `data:image/jpeg;base64,${company.resourceFile.data}` : defaultUserIcon;

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Company Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex justify-center">
                        <img src={imageUrl} alt="Profile" className="w-32 h-32 rounded-full shadow" onError={(e) => { e.target.src = defaultUserIcon; }} />
                    </div>
                    <div className="md:col-span-1">
                        <div className="mb-4">
                            <span className="font-semibold">Name: </span>{company.name}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Description: </span>{company.description}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Tax Level: </span>{company.taxLevel}
                        </div>

                        <div className="flex justify-start items-center gap-4">
                            <button
                                onClick={() => navigate('/company-update')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                            >
                                Edit Company
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <div className="mb-4">
                            <span className="font-semibold">Stores:</span>
                            <ul>
                                {company.stores ? company.stores.map(store => (
                                    <li key={store.id}>{store.name}</li>
                                )) :
                                    <li>No stores found.</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyDetail;