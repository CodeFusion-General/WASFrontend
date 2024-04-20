import {useEffect, useState} from "react";
import {CiCircleCheck} from "react-icons/ci";
export default function UserAdd() {

    const [account, setAccount] = useState([{username: '', password: '', password_again:''}]);
    const [user, setUser] = useState([{email: '', name: '', surname: ''}]);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    useEffect(() => {
        if (account.password && account.password_again) {
            setPasswordsMatch(account.password === account.password_again);
        } else {
            setPasswordsMatch(false); // Eğer her iki alanda boş ise, onay işareti gösterilmez.
        }
    }, [account.password, account.password_again]);
    return (
        <>
            <form className="mx-auto max-w-screen-md mt-10">
                <div className="space-y-12">
                    <h2 className="font-semibold leading-7 text-gray-900 text-3xl">Add Employee</h2>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 mt-5">Account Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="username"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
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
                                    Password
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
                            <div className="sm:col-span-3">
                                <label htmlFor="password-again"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Password Again
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="password"
                                            id="password-again"
                                            onChange={e => setAccount(prevState => ({
                                                ...prevState,
                                                password_again: e.target.value
                                            }))}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                        {passwordsMatch && <CiCircleCheck className="text-green-500 ml-2" size="24px"/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
