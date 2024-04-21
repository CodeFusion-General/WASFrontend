/* eslint-disable react/prop-types */
import { UserCircleIcon } from '@heroicons/react/24/solid'
import {useEffect, useState} from "react";
import { CiCircleCheck } from "react-icons/ci";
import {addAccount} from "../../api/user/UserApi.jsx";


export default function UserAdd(props) {
    const {type} = props;
    const [account, setAccount] = useState({ username: '', password: '', password_again: '' });
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [user, setUser] = useState({ email: '', name: '', surname: '' , phone: ''});
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
        formData.append('phone', account.phone);
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
        <>
            <form className="mx-auto max-w-screen-md mt-10"  onSubmit={handleRegister}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="font-semibold leading-7 text-gray-900 text-3xl">Add {type}</h2>
                        <h2 className="text-base font-semibold leading-7 text-gray-900 mt-5">Account Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            onChange={e => setAccount(prevState => ({
                                                ...prevState,
                                                username: e.target.value
                                            }))}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={e => setAccount(prevState => ({
                                                ...prevState,
                                                password: e.target.value
                                            }))}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                             <br/>
                            <div className="sm:col-span-3">
                                <label htmlFor="password-again"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Password Again <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="password"
                                            name="password-again"
                                            id="password-again"
                                            onChange={e => setAccount(prevState => ({
                                                ...prevState,
                                                password_again: e.target.value
                                            }))}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                        {passwordsMatch && <CiCircleCheck className="text-green-500 ml-2 to-transparent" size="24px"/>}
                                    </div>
                                </div>
                                
                            </div>
                            <br/>
                            <div className="sm:col-span-3">
                                <label htmlFor="phone"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone<span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            maxLength={10}
                                            onChange={e => setUser(prevState => ({
                                                ...prevState,
                                                phone: e.target.value
                                            }))}
                                            
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pb-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    First name <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        onChange={e => setUser(prevState => ({
                                            ...prevState,
                                            name: e.target.value
                                        }))}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        onChange={e => setUser(prevState => ({
                                            ...prevState,
                                            surname: e.target.value
                                        }))}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={e => setUser(prevState => ({
                                            ...prevState,
                                            email: e.target.value
                                        }))}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    {photo ? (
                                        <img src={photo} alt="Profile" className="h-12 w-12 rounded-full"/>
                                    ) : (
                                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true"/>
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
                                        style={{display: 'none'}}
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                                className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
