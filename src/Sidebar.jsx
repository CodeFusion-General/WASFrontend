import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                        fixed top-16 bottom-0 left-0 z-30 w-64 
                        transition-transform duration-300 transform bg-gray-900 text-black rounded-lg`}>
            <button onClick={toggleSidebar} 
                className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full text-xs">
                {isOpen ? '<' : '>'}
            </button>
            {isOpen && (
                <nav>
                    <ul className="mt-10">
                        <li className="px-6 py-2 border-b border-gray-900">
                            <a href="/" className="text-white hover:text-gray-300">Home</a>
                        </li>
                        <li className="px-6 py-2 border-b border-gray-900">
                            <a href="/register" className="text-white hover:text-gray-300">Register</a>
                        </li>
                        <li className="px-6 py-2 border-b border-gray-900">
                            <a href="/stores" className="text-white hover:text-gray-300">Stores</a>
                        </li>
                        <li className="px-6 py-2 border-b border-gray-900">
                            <Link to="/store-employees" className="text-white hover:text-gray-300">Store Employees</Link>
                        </li>                        
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Sidebar;