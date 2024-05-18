/* eslint-disable react/prop-types */
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { addAccount } from '../../../api/user/UserApi.jsx';

export default function UserAdd(props) {
    const { type } = props;
    const [account, setAccount] = useState({ username: '', password: '', password_again: '' });
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [user, setUser] = useState({ email: '', name: '', surname: '', phone: '' });
    const [photo, setPhoto] = useState(null);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhoto(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('photoInput').click();
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!passwordsMatch) {
            alert("Passwords do not match.");
            return;
        }

        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('surname', user.surname);
        formData.append('email', user.email);
        formData.append('username', account.username);
        formData.append('password', account.password);
        formData.append('phone', user.phone);
        formData.append('role', type.toString().toUpperCase());

        const fileInput = document.getElementById('photoInput');
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        try {
            const result = await addAccount(formData);
            console.log(result);
            alert("Account successfully added!");
        } catch (error) {
            console.error("Error while registering the account:", error);
            alert("Failed to register account. Please try again later.");
        }
    };

    useEffect(() => {
        setPasswordsMatch(account.password && account.password_again && account.password === account.password_again);
    }, [account.password, account.password_again]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-5 my-10 w-full max-w-4xl bg-white rounded-lg shadow-lg mt-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add {type}</h2>
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div className="product-fields">
                        <div className="field-pair">
                            <InputField
                                id="username"
                                label="Username"
                                name="username"
                                value={account.username}
                                onChange={e => setAccount(prevState => ({
                                    ...prevState,
                                    username: e.target.value
                                }))}
                            />
                            <InputField
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                value={account.password}
                                onChange={e => setAccount(prevState => ({
                                    ...prevState,
                                    password: e.target.value
                                }))}
                            />
                        </div>
                        <div className="field-pair">
                            <InputField
                                id="password-again"
                                label="Password Again"
                                name="password_again"
                                type="password"
                                value={account.password_again}
                                onChange={e => setAccount(prevState => ({
                                    ...prevState,
                                    password_again: e.target.value
                                }))}
                                passwordsMatch={passwordsMatch}
                            />
                            <InputField
                                id="phone"
                                label="Phone"
                                name="phone"
                                value={user.phone}
                                onChange={e => setUser(prevState => ({
                                    ...prevState,
                                    phone: e.target.value
                                }))}
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <div className="product-fields">
                        <div className="field-pair">
                            <InputField
                                id="first-name"
                                label="First name"
                                name="first-name"
                                value={user.name}
                                onChange={e => setUser(prevState => ({
                                    ...prevState,
                                    name: e.target.value
                                }))}
                            />
                            <InputField
                                id="last-name"
                                label="Last name"
                                name="last-name"
                                value={user.surname}
                                onChange={e => setUser(prevState => ({
                                    ...prevState,
                                    surname: e.target.value
                                }))}
                            />
                        </div>
                        <div className="field-pair">
                            <InputField
                                id="email"
                                label="Email address"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={e => setUser(prevState => ({
                                    ...prevState,
                                    email: e.target.value
                                }))}
                            />
                            <div className="flex items-center gap-x-3">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    {photo ? (
                                        <img src={photo} alt="Profile" className="h-12 w-12 rounded-full" />
                                    ) : (
                                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                    )}
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={triggerFileInput}
                                    >
                                        Change
                                    </button>
                                    <input
                                        type="file"
                                        id="photoInput"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function InputField({ id, label, type = 'text', name, value, onChange, passwordsMatch = false }) {
    return (
        <div className="mb-4 input-field">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label} <span className="text-red-500">*</span></label>
            <div className="mt-2">
                <div className="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        id={id}
                        name={name}
                        type={type}
                        className="block flex-1 border-0 bg-gray-100 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={value}
                        onChange={onChange}
                    />
                    {name === 'password_again' && passwordsMatch && <CiCircleCheck className="text-green-500 ml-2" size="24px" />}
                </div>
            </div>
        </div>
    );
}
