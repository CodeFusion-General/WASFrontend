import React, { useState, useEffect } from 'react';

const fakeData = [
  {
    id: 1,
    photoUrl: '/path-to-photo-1.jpg',
    name: 'Jane',
    surname: 'Doe',
    phone: '123-456-7890',
    role: 'Manager', // Add the role to your fake data
  },
  {
    id: 2,
    photoUrl: '/path-to-photo-2.jpg',
    name: 'John',
    surname: 'Smith',
    phone: '098-765-4321',
    role: 'Manager',
  },
  // ... more fake data objects
];

const StoreEmployees = ({ storeId }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Your fetching logic will go here
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

export default StoreEmployees;
