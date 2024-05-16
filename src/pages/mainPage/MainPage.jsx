import React, { useState } from 'react';
import Slider from './Slider.jsx';
import "../../index.css";
import logo from '../../assets/WASLogo.png';
import warehouseImage from '../../assets/WASLogo.png';
import Footer from '../../components/footer/Footer.jsx';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function MainPage() {
    const [openIndex, setOpenIndex] = useState(null);

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
            imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            title: 'Anında Stil ve Kişiselleştirme',
            description: 'Tarzınıza uygun tasarımları hızlı bir şekilde üretiyor ve kendi benzersiz görünümünüzü yaratmanıza yardımcı olacak kişiselleştirme seçenekleri sunuyoruz. Modayı sizin için anlık ve kişiselleştirilmiş hale getiriyoruz.',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
            title: 'Trendleri Anında Yakalayın',
            description: 'En son moda trendleri ile güncel kalın. Hızlı üretim süreçleriyle güncel trendlere ayak uydurmanızı kolaylaştırıyoruz. Tarzınızı en son trendlerle birleştirin.',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
            title: 'Sürdürülebilir Moda',
            description: 'Çevre bilincimizi hızlı üretim ve sürdürülebilirlik ilkeleriyle birleştirerek moda sektörüne yenilikçi yaklaşımlara öncülük ediyor, hem çevrenin hem de tarzınızın korunmasını sağlıyoruz.',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
            title: 'Kişiye Özel Deneyimler',
            description: 'Müşteri memnuniyetini ön planda tutarak kişiye özel deneyimler sunuyoruz. Hızlı teslimat ve özenli hizmet sayesinde modayı sizin için unutulmaz bir yolculuğa dönüştürüyoruz.',
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                        </p>
                        <div className="text-gold mt-4">⬛</div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="text-6xl text-gold mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                        </p>
                        <div className="text-gold mt-4">⬛</div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="text-6xl text-gold mb-4">👤</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Personals</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
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
                    <div className="flex justify-center flex-wrap gap-8">
                        {imageSections.map((section, index) => (
                            <div key={index} className="relative group w-full sm:w-1/2 md:w-1/4 flex flex-col items-center">
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
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
