import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../../api/user/UserApi';
import { decodeUserToken, logout } from '../../../api/authentication/AuthenticationApi';
import defaultUserIcon from '../../../assets/user.webp';
import { GlobalStoreId } from '../../../api/store/GlobalStoreId.jsx';

function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { setGlobalStoreId } = useContext(GlobalStoreId);

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

    const imageUrl = user.resourceFile && user.resourceFile.data ? `data:image/jpeg;base64,${user.resourceFile.data}` : defaultUserIcon;

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">User Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex justify-center">
                        <img src={imageUrl} alt="Profile" className="w-32 h-32 rounded-full shadow" onError={(e) => { e.target.src = defaultUserIcon; }} />
                    </div>
                    <div className="md:col-span-2">
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
                            <span className="font-semibold">Phone: </span>{user.phoneNo}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Is Telegram Linked: </span>{user.isTelegram ? 'Yes' : 'No'}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Telegram ID: </span>{user.telegramId}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Telegram Link Time: </span>{user.telegramLinkTime}
                        </div>
                        <div className="flex justify-start items-center gap-4">
                            <button
                                onClick={() => navigate('/edit-profile')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={() => {
                                    setGlobalStoreId(null);
                                    logout();
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
