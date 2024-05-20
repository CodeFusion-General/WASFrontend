import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTop5MostProfitableProducts } from '../../../api/store/StoreApi.jsx';
import { GlobalStoreId } from "../../../api/store/GlobalStoreId.jsx";
import { decodeUserToken } from "../../../api/authentication/AuthenticationApi.jsx";

const Top5Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { globalStoreId } = useContext(GlobalStoreId);

    const determineStoreId = () => {
        const token = decodeUserToken();
        if (token && (token.role === 'MANAGER' || token.role === 'USER')) {
            return token.storeId;
        }
        return globalStoreId;
    };

    useEffect(() => {
        const storeId = determineStoreId();

        const fetchData = async () => {
            try {
                const response = await getTop5MostProfitableProducts(storeId);
                const sortedProducts = response.data.sort((a, b) => b.profit - a.profit);
                setProducts(sortedProducts);
                setLoading(false);
            } catch (error) {
                setError(`Error fetching top 5 most profitable products: ${error.message}`);
                setLoading(false);
            }
        };

        fetchData();
    }, [globalStoreId]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const handleViewAllProducts = () => {
        navigate('/product-list');
    };

    const getShadowClass = (profit, index) => {
        if (profit < 0) {
            return 'shadow-lg border-l-4 border-red-500';
        }
        const greenShades = [
            'shadow-lg border-l-4 border-green-500',
            'shadow-lg border-l-4 border-green-400',
            'shadow-lg border-l-4 border-green-300',
            'shadow-lg border-l-4 border-green-200',
            'shadow-lg border-l-4 border-green-100'
        ];
        return greenShades[index] || 'shadow-lg border-l-4 border-green-100';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Top 5 Most Profitable Products</h2>
                <table className="min-w-full bg-white mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-5 text-left font-semibold text-gray-600">Product Name</th>
                        <th className="py-3 px-5 text-left font-semibold text-gray-600">Profit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className={`hover:bg-gray-50 ${getShadowClass(product.profit, index)}`}>
                            <td className="py-3 px-5 border-b">{product.name}</td>
                            <td className="py-3 px-5 border-b">{product.profit >= 0 ? `$${product.profit.toFixed(2)}` : `-$${Math.abs(product.profit).toFixed(2)}`}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleViewAllProducts}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md"
                >
                    View All Products
                </button>
            </div>
        </div>
    );
};

export default Top5Products;
