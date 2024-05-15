import React from 'react';
import Slider from './Slider.jsx';
import "../../index.css";
import logo from '../../assets/WASLogo.png'; // Doğru yolu kontrol edin
import warehouseImage from '../../assets/WASLogo.png'; // Eklemek istediğiniz resmi doğru yola göre güncelleyin

function MainPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 font-montserrat">
            <div className="w-full relative h-auto flex flex-col items-center justify-center text-center bg-white text-black shadow-lg py-16">
                <div className="flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-32 w-auto mb-6" /> {/* Büyük ve belirgin logo */}
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        Warehouse Information System
                    </h1>
                    <p className="text-lg md:text-2xl font-medium">
                        Efficiently Manage Your Warehouse Operations
                    </p>
                </div>
            </div>
            <div className="w-full py-10 px-4">
                <div className="max-w-4xl mx-auto">
                    <Slider />
                </div>
            </div>
            <div className="w-full bg-white py-16">
                <div className="flex flex-col items-center max-w-[1400px] mx-auto flex-wrap md:flex-nowrap md:flex-row gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="text-6xl text-gold mb-4">📦</div> {/* Replace with actual icon */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Stores</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                        </p>
                        <div className="text-gold mt-4">⬛</div> {/* Replace with actual icon */}
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="text-6xl text-gold mb-4">🛒</div> {/* Replace with actual icon */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                        </p>
                        <div className="text-gold mt-4">⬛</div> {/* Replace with actual icon */}
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="text-6xl text-gold mb-4">👤</div> {/* Replace with actual icon */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Personals</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                        </p>
                        <div className="text-gold mt-4">⬛</div> {/* Replace with actual icon */}
                    </div>
                </div>
            </div>
            <div className="w-full py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
                    <p className="text-center text-lg mb-12">
                        Learn more about our warehouse management system and why it's the best choice for your business.
                    </p>
                    <div className="flex flex-wrap md:flex-nowrap md:space-x-8">
                        <div className="w-full md:w-2/3 mb-8 md:mb-0">
                            <img src={warehouseImage} alt="Warehouse" className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105" />
                        </div>
                        <div className="w-full md:w-1/3 flex flex-col space-y-4">
                            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-bold mb-2">How Do We Ensure Quality Standards?</h3>
                                <p className="text-gray-700">Our systems and processes are designed to meet the highest quality standards.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-bold mb-2">How Do We Ensure Fast Delivery?</h3>
                                <p className="text-gray-700">Our efficient logistics and operations ensure your orders are delivered swiftly.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-bold mb-2">What Customization Options Do We Offer?</h3>
                                <p className="text-gray-700">We provide various customization options to meet your specific needs.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-bold mb-2">Which Courier Companies Do We Work With?</h3>
                                <p className="text-gray-700">We partner with reputable courier companies to ensure reliable delivery.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-bold mb-2">What Is Our Return Policy?</h3>
                                <p className="text-gray-700">We offer a hassle-free return policy to ensure customer satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
