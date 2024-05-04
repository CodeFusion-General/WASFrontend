import React, { useState, useEffect } from 'react';
import { getUsersByStoreIdAndRoles } from '../../../api/user/UserApi.jsx';

const fakeData = [
  {
    id: 1,
    photoUrl: '/path-to-photo-1.jpg',
    name: 'Jane',
    surname: 'Doe',
    phone: '123-456-7890',
    role: 'Manager',
  },
  {
    id: 2,
    photoUrl: '/path-to-photo-2.jpg',
    name: 'John',
    surname: 'Smith',
    phone: '098-765-4321',
    role: 'Manager',
  },
];

const StoreEmployee = ({ storeId }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setEmployees(fakeData);
    }, [storeId]);

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
                                    <img src={user.photoUrl} alt={`${user.name} ${user.surname}`} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="py-4 px-6">{user.name}</td>
                                <td className="py-4 px-6">{user.surname}</td>
                                <td className="py-4 px-6">{user.phone}</td>
                                <td className="py-4 px-6">{user.role}</td> {/* Display the role */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoreEmployee;

/*

const StoreEmployee = ({ storeId }) => {
const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Assuming 'Employee' and 'Manager' are roles you are interested in
            const data = await getUsersByStoreIdAndRoles(storeId, ['Employee', 'Manager']);
            setEmployees(data.map(user => ({
                id: user.id,
                photoUrl: `http://localhost:8080/resourceFile/image/${user.resourceFileId}`, // Assuming images are fetched by resource file ID
                name: user.name,
                surname: user.surname,
                phone: user.phoneNo,
                role: user.role
            })));
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        } finally {
            setLoading(false);
        }
    };

    if (storeId) {
        fetchUsers();
    }
}, [storeId]);

if (loading) {
    return <div>Loading...</div>;
}

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
                        <tr key={user.id}>
                            <td className="py-4 px-6">
                                <img src={user.photoUrl} alt={`${user.name} ${user.surname}`} className="w-10 h-10 rounded-full" />
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

*/