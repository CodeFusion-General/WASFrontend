// src/components/Footer.jsx
import React from 'react';
import { getLanguage, translate } from '../../language';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center p-2 shadow-colorful-b w-full">
            <p>&copy; {translate(getLanguage(), 'footer')}</p>
        </footer>
    );
}

export default Footer;
