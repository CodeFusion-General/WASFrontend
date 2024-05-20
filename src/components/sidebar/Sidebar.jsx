import { Link } from 'react-router-dom';
import { FaBox, FaHome, FaRegUser, FaStore, FaUsers } from 'react-icons/fa';
import logo from '../../assets/logowis.png';

const Sidebar = () => {
    return (
        <div className="fixed top-0 bottom-0 left-0 z-30 w-64 bg-gray-900 text-gray-100 rounded-br-lg shadow-colorful-r">
            <div className="flex items-center justify-center p-2 border-b border-gray-700">
                <img
                    className="h-12 w-auto"
                    src={logo}
                    alt="Warehouse Information Systems Logo"
                />
            </div>
            <nav>
                <ul className="mt-4 space-y-2">
                    <li className="px-6 pb-2 border-b border-gray-700 flex items-center">
                        <FaHome className="mr-4"/> {/* Home icon */}
                        <Link to="/" className="flex-grow text-white hover:text-blue-500">Home</Link>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-700 flex items-center">
                        <FaRegUser className="mr-4"/> {/* Register icon */}
                        <Link to="/register" className="flex-grow text-white hover:text-blue-500">Register</Link>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-700 flex items-center">
                        <FaStore className="mr-4"/> {/* Stores icon */}
                        <Link to="/stores" className="flex-grow text-white hover:text-blue-500">Stores</Link>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-700 flex items-center">
                        <FaUsers className="mr-4"/> {/* Store Employees icon */}
                        <Link to="/store-employees" className="flex-grow text-white hover:text-blue-500">Store Employees</Link>
                    </li>
                    <li className="px-6 py-2 border-b border-gray-700 flex items-center">
                        <FaBox className="mr-4"/> {/* Products icon */}
                        <Link to="/product-list" className="flex-grow text-white hover:text-blue-500">Products</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
