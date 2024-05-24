import {useContext, useEffect, useState} from 'react';
import {GlobalCompanyId} from "../../../api/company/GlobalCompanyId.jsx";
import {useNavigate} from "react-router-dom";
import {decodeUserToken} from "../../../api/authentication/AuthenticationApi.jsx";
import {getAllCompanies} from "../../../api/company/CompanyApi.jsx";
import {getLanguage, translate} from '../../../language';

function CompanyList() {
    const [companies, setCompanies] = useState();
    const { setGlobalCompanyId, globalCompanyId } = useContext(GlobalCompanyId);
    const navigate = useNavigate();
    const lang = getLanguage();

    useEffect(() => {
        const fetchCompany = async () => {
            const decodedToken = decodeUserToken();
            if (decodedToken) {
                try {
                    const response = await getAllCompanies();
                    setCompanies(response.data);
                } catch (error) {
                    console.error("Failed to get company.", error);
                }
            }
        };

        fetchCompany();
    }, []);

    const handleSelectCompany = (storeId) => {
        setGlobalCompanyId(storeId);
        navigate('/company-detail');
    };

    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{translate(lang, 'allStores')}</h1> {/* Güncellenen satır */}
            {Array.isArray(companies) && companies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
                    {companies.map((company) => (
                        <div key={company.id}
                             className={`p-6 shadow-lg rounded-lg flex flex-col items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl border-2 m-2 ${globalCompanyId === company.id ? 'bg-green-50 border-green-700': 'bg-white'}`}>
                            <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
                            <div className="h-32 w-32 mb-3 overflow-hidden rounded-full border-8 border-gray-200">
                                {company.resourceFile ? (
                                    <img
                                        src={`data:image/jpeg;base64,${company.resourceFile.data}`}
                                        className="object-cover w-full h-full"
                                        alt={`${company.resourceFile.name}`}
                                        onError={(e) => { e.target.src = 'src/assets/company.png'; }}
                                    />
                                ) : (
                                    <img
                                        src="src/assets/company.png"
                                        className="object-cover w-full h-full"
                                        alt="Default"
                                    />
                                )}
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{company.description}</p>
                            <button
                                onClick={() => handleSelectCompany(company.id)}
                                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-900 transition-colors">
                                {translate(lang, 'select')} {/* Güncellenen satır */}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center text-gray-500">
                    <p>{translate(lang, 'noCompanyFound')}</p> {/* Güncellenen satır */}
                </div>
            )}
        </div>
    );
}

export default CompanyList;
