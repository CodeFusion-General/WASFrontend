import { useState, useEffect, useContext } from 'react';
import { getUsersByStoreId } from "../../../api/user/UserApi.jsx";
import { GlobalStoreId } from "../../../api/store/GlobalStoreId.jsx";
import { decodeUserToken } from "../../../api/authentication/AuthenticationApi.jsx";
const placeholderImage = 'src/assets/user.webp';
const StoreEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const { globalStoreId } = useContext(GlobalStoreId);

    const tokenStoreId = () => {
        const token = decodeUserToken();
        return token && (token.role === 'MANAGER' || token.role === 'USER') ? token.storeId : null;
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            const storeId = tokenStoreId() || globalStoreId;
            if (storeId) {
                try {
                    const response = await getUsersByStoreId(storeId);
                    if (response && response.data) { // Check if response and response.data exist
                        const data = response.data.map(user => {
                            return {
                                id: user.id,
                                photoUrl: user.resourceFile ? user.resourceFile.data : placeholderImage,
                                name: user.name,
                                surname: user.surname,
                                phone: user.phoneNo,
                                role: user.roles[0]
                            };
                        });
                        setEmployees(data);
                    } else {
                        console.warn('No data found in response');
                    }
                } catch (error) {
                    console.error('Error fetching employees:', error);
                }
            } else {
                console.warn('storeId is undefined');
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="container mx-auto my-8 p-8 bg-white shadow-lg max-w-6xl">
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">Photo</th>
                        <th scope="col" className="py-3 px-6">Name</th>
                        <th scope="col" className="py-3 px-6">Surname</th>
                        <th scope="col" className="py-3 px-6">Phone</th>
                        <th scope="col" className="py-3 px-6">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((user) => (
                        <tr className="bg-white border-b" key={user.id}>
                            <td className="py-4 px-6">
                                <img
                                    src={`data:image/jpeg;base64,${user.photoUrl}`}
                                    alt={`${user.name} ${user.surname}`}
                                    className="w-10 h-10 rounded-full"
                                    onError={(e) => { e.target.src = placeholderImage; }} // Add onError fallback
                                />
                            </td>
                            <td className="py-4 px-6">{user.name}</td>
                            <td className="py-4 px-6">{user.surname}</td>
                            <td className="py-4 px-6">{user.phone}</td>
                            <td className="py-4 px-6">{user.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoreEmployee;
