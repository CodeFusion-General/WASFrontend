import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for testing
const mockProducts = [
    { name: 'Product 1', profit: '$2000' },
    { name: 'Product 2', profit: '$1500' },
    { name: 'Product 3', profit: '$1800' },
    { name: 'Product 4', profit: '$2200' },
    { name: 'Product 5', profit: '$1600' }
];

const Top5Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate an API call with a timeout
        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleViewAllProducts = () => {
        navigate('/product-list');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Top 5 Most Profitable Products</h2>
            <table className="min-w-full bg-white mb-4">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Product Name</th>
                        <th className="py-2 px-4 border-b">Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center">
                <button
                    onClick={handleViewAllProducts}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                    View All Products
                </button>
            </div>
        </div>
    );
};

export default Top5Products;
