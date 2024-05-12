/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="fixed top-16 bottom-0 left-0 z-30 w-64
                        bg-gray-900 text-black rounded-tr-lg rounded-br-lg"> {/* Adjust border-radius here */}
            <nav>
                <ul className="mt-10">
                    <li className="px-6 py-2 border-b border-gray-700">
                        <a href="/" className="text-white hover:text-gray-300">Home</a>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-700">
                        <a href="/register" className="text-white hover:text-gray-300">Register</a>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-700">
                        <a href="/stores" className="text-white hover:text-gray-300">Stores</a>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-700">
                        <Link to="/store-employees" className="text-white hover:text-gray-300">Store Employees</Link>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-700">
                        <Link to="/product-list" className="text-white hover:text-gray-300">Products</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;