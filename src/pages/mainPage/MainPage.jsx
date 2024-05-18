import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Slider from './Slider.jsx';
import "../../index.css";
import logo from '../../assets/wislogo.png';
import warehouseImage from '../../assets/WASLogo.png';
import Footer from '../../components/footer/Footer.jsx';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function MainPage() {
    const [openIndex, setOpenIndex] = useState(null);
    const [scrollDirection, setScrollDirection] = useState('down');

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }
            lastScrollTop = st <= 0 ? 0 : st;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const sections = [
        {
            title: 'How Do We Ensure Quality Standards?',
            content: 'Our systems and processes are designed to meet the highest quality standards.',
        },
        {
            title: 'How Do We Ensure Fast Delivery?',
            content: 'Our efficient logistics and operations ensure your orders are delivered swiftly.',
        },
        {
            title: 'What Customization Options Do We Offer?',
            content: 'We provide various customization options to meet your specific needs.',
        },
        {
            title: 'Which Courier Companies Do We Work With?',
            content: 'We partner with reputable courier companies to ensure reliable delivery.',
        },
    ];

    const socialMediaIcons = [
        {
            name: 'Facebook',
            icon: <FaFacebook size={20} />,
            link: 'https://facebook.com',
        },
        {
            name: 'Twitter',
            icon: <FaTwitter size={20} />,
            link: 'https://twitter.com',
        },
        {
            name: 'Instagram',
            icon: <FaInstagram size={20} />,
            link: 'https://instagram.com',
        },
    ];

    const imageSections = [
        {
            imageUrl: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Inventory Management',
            description: 'Efficiently track and manage your inventory with our state-of-the-art system. Real-time updates and detailed analytics help you maintain optimal stock levels and reduce overhead costs.',
        },
        {
            imageUrl: 'https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Efficient Container Management',
            description: 'Our container management solutions optimize logistics with advanced tracking and inventory systems. Efficiently manage your fleet, reduce turnaround times, and ensure timely deliveries with our comprehensive tools.',
        },
        {
            imageUrl: 'https://images.pexels.com/photos/2797828/pexels-photo-2797828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Optimized Yard Management',
            description: 'Our yard management system streamlines trailer organization and movement, providing real-time visibility and efficient scheduling to minimize delays, improve safety, and boost productivity. Ensure every trailer is in the right place at the right time with our cutting-edge solutions.',
        },
        {
            imageUrl: 'https://images.pexels.com/photos/4484151/pexels-photo-4484151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Efficient Inventory Scanning Solutions',
            description: 'Our inventory scanning system ensures accurate, real-time tracking with advanced barcode scanners and software, streamlining management and improving efficiency.',
        },
    ];

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 font-poppins">
            <div className="w-full relative h-auto flex flex-col items-center justify-center text-center bg-white text-black shadow-lg py-16">
                <div className="absolute top-6 left-6">
                    <img src={logo} alt="Logo" className="h-64 w-auto" />
                </div>
                <div className="flex flex-col items-center mt-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        WAREHOUSE INFORMATION SYSTEM
                    </h1>
                    <p className="text-lg md:text-2xl font-medium">
                        Your Warehouse, Smarter.
                    </p>
                </div>
            </div>
            <div className="w-full py-10 px-4">
                <div className="max-w-8xl mx-auto">
                    <Slider />
                </div>
            </div>
            <div className="w-full bg-white py-16">
                <div className="flex flex-col items-center max-w-[1400px] mx-auto flex-wrap md:flex-nowrap md:flex-row gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="text-6xl text-gold mb-4">📦</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Stores</h2>
                        <p className="text-gray-700">
                            Find essential tools and resources for efficient warehouse management and inventory tracking. Optimize your storage and distribution with ease.
                        </p>
                        <div className="text-gold mt-4">⬛</div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="text-6xl text-gold mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
                        <p className="text-gray-700">
                            Explore top-quality items and solutions for effective warehouse management. Enhance your inventory tracking and streamline distribution seamlessly.
                        </p>
                        <div className="text-gold mt-4">⬛</div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="text-6xl text-gold mb-4">👤</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Personals</h2>
                        <p className="text-gray-700">
                            Meet our dedicated team and discover their expertise. Enhance your warehouse operations with their skills and streamline your processes effectively
                        </p>
                        <div className="text-gold mt-4">⬛</div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-100 py-16">
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
                            {sections.map((section, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden group">
                                    <h3
                                        className="text-xl font-bold mb-2 cursor-pointer flex justify-between items-center group-hover:text-blue-500"
                                        onClick={() => handleToggle(index)}
                                    >
                                        {section.title}
                                        <span className={`transform transition-transform group-hover:text-blue-500 ${openIndex === index ? 'rotate-180' : ''}`}>
                                            ▼
                                        </span>
                                    </h3>
                                    {openIndex === index && (
                                        <p className="text-gray-700 mt-2 group-hover:text-blue-500 transition-colors duration-300">
                                            {section.content}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-32">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
                    <div className="flex justify-center flex-wrap md:flex-nowrap gap-8">
                        {imageSections.map((section, index) => {
                            const { ref, inView } = useInView({
                                triggerOnce: false,
                                threshold: 0.1,
                            });

                            // Adjust animation direction based on section title
                            const animationClass = inView
                                ? section.title === 'Efficient Inventory Scanning Solutions' || section.title === 'Optimized Yard Management'
                                    ? 'slide-in-right'
                                    : 'slide-in-left'
                                : scrollDirection === 'down'
                                    ? section.title === 'Efficient Inventory Scanning Solutions' || section.title === 'Optimized Yard Management'
                                        ? 'slide-out-left'
                                        : 'slide-out-right'
                                    : section.title === 'Efficient Inventory Scanning Solutions' || section.title === 'Optimized Yard Management'
                                        ? 'slide-out-right'
                                        : 'slide-out-left';

                            return (
                                <div
                                    key={index}
                                    ref={ref}
                                    className={`relative group w-full sm:w-1/2 md:w-1/4 flex flex-col items-center ${animationClass}`}
                                >
                                    <div className="relative w-full pb-[100%] overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                        <img src={section.imageUrl} alt={section.title} className="absolute inset-0 w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="flex space-x-4">
                                                {socialMediaIcons.map((icon, idx) => (
                                                    <a key={idx} href={icon.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                                                        {icon.icon}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                                        <p className="text-sm text-gray-700">{section.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
