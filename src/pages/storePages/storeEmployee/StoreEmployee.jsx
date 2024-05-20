import { useState, useEffect, useContext } from 'react';
import { getUsersByStoreId, updateUser } from "../../../api/user/UserApi.jsx";
import { GlobalStoreId } from "../../../api/store/GlobalStoreId.jsx";
import { decodeUserToken } from "../../../api/authentication/AuthenticationApi.jsx";
import { useNavigate } from "react-router-dom";

const placeholderImage = 'src/assets/user.webp';
const roles = {
    ADMIN: ['BOSS', 'MANAGER', 'EMPLOYEE'],
    BOSS: ['MANAGER', 'EMPLOYEE'],
    MANAGER: ['EMPLOYEE'],
    EMPLOYEE: []
};

const StoreEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [editingRoles, setEditingRoles] = useState({});
    const { globalStoreId } = useContext(GlobalStoreId);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const navigate = useNavigate();

    const tokenStoreId = () => {
        const token = decodeUserToken();
        if (token) {
            setCurrentUserRole(token.roles[0]); // Assuming the first role is the primary role
            return token && (token.roles.includes('BOSS') || token.roles.includes('MANAGER') || token.roles.includes('ADMIN')) ? token.storeId : null;
        }
        return null;
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            const storeId = tokenStoreId() || globalStoreId;
            if (storeId) {
                try {
                    const response = await getUsersByStoreId(storeId);
                    if (response && response.data) {
                        const data = response.data.map(user => ({
                            id: user.id,
                            photoUrl: user.resourceFile ? user.resourceFile.data : placeholderImage,
                            name: user.name,
                            surname: user.surname,
                            phone: user.phoneNo,
                            role: user.roles[0]
                        }));
                        setEmployees(data);
                    }
                } catch (error) {
                    console.error('Error fetching employees:', error);
                }
            } else {
                alert('You have to choose store.');
                navigate("/stores");
            }
        };
        fetchEmployees();
    }, [globalStoreId]);

    const handleRoleChange = (id, newRole) => {
        setEditingRoles(prev => ({ ...prev, [id]: newRole }));
    };

    const handleSave = async (id) => {
        const employee = employees.find(emp => emp.id === id);
        const newRole = editingRoles[id];
        if (employee && newRole && newRole !== employee.role) {
            try {
                await updateUser(id, { ...employee, roles: [newRole] }, null);
                setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, role: newRole } : emp));
                setEditingRoles(prev => {
                    const { [id]: _, ...rest } = prev;
                    return rest;
                });
            } catch (error) {
                console.error('Error updating role:', error);
            }
        }
    };

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
                        {Object.keys(editingRoles).length > 0 && <th scope="col" className="py-3 px-6">Actions</th>}
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
                                    onError={(e) => { e.target.src = placeholderImage; }}
                                />
                            </td>
                            <td className="py-4 px-6">{user.name}</td>
                            <td className="py-4 px-6">{user.surname}</td>
                            <td className="py-4 px-6">{user.phone}</td>
                            <td className="py-4 px-6">
                                {roles[currentUserRole]?.includes(user.role) ? (
                                    editingRoles[user.id] !== undefined ? (
                                        <select
                                            value={editingRoles[user.id]}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            {roles[currentUserRole].map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span onClick={() => handleRoleChange(user.id, user.role)}>{user.role}</span>
                                    )
                                ) : (
                                    <span>{user.role}</span>
                                )}
                            </td>
                            {editingRoles[user.id] !== undefined && (
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleSave(user.id)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                                    >
                                        Save
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoreEmployee;
