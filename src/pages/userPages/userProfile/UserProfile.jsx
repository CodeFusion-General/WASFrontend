import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../../api/user/UserApi';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import Cookies from 'js-cookie';
import { decodeUserToken } from '../../../api/authentication/AuthenticationApi';
import defaultUserIcon from '../../../assets/default-user-icon.webp'; // Updated path

import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'primeflex/primeflex.css'; // primeflex

function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const decodedToken = decodeUserToken();
            if (decodedToken && decodedToken.userId) {
                try {
                    const response = await getUserById(decodedToken.userId);
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    alert('Failed to fetch user data. Please log in again.');
                    navigate('/login');
                }
            } else {
                alert('User ID not found. Please log in again.');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">User Profile</h1>
            <Card title={`${user.name} ${user.surname}`} subTitle={user.email} className="mb-6">
                <div className="p-grid">
                    <div className="p-col-12 p-md-4">
                        <img src={user.resourceFileUrl || defaultUserIcon} alt="Profile" className="w-32 h-32 rounded-full shadow" />
                    </div>
                    <div className="p-col-12 p-md-8">
                        <div className="mb-4">
                            <span className="font-semibold">Name: </span>{user.name}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Surname: </span>{user.surname}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Email: </span>{user.email}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Phone: </span>{user.phone}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Is Deleted: </span>{user.is_deleted ? 'Yes' : 'No'}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Activation Request Code: </span>{user.activation_request_code}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Is Telegram Linked: </span>{user.istelegram ? 'Yes' : 'No'}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Telegram ID: </span>{user.telegram_id}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Telegram Link Time: </span>{user.telegram_link_time}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Resource File ID: </span>{user.resource_file_id}
                        </div>
                        <div className="flex justify-start items-center gap-4">
                            <Button label="Edit Profile" className="p-button-raised bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={() => navigate('/edit-profile')} />
                            <Button label="Logout" className="p-button-raised bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow" onClick={() => {
                                Cookies.remove('user_token');
                                Cookies.remove('user_id');
                                navigate('/login');
                            }} />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default UserProfile;
