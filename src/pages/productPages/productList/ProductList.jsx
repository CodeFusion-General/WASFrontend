import React, { useState } from 'react';
import ProductDetail from "../productDetail/ProductDetail.jsx";
import { useNavigate } from 'react-router-dom';
var path = 'src/assets/sevketiphone.jpg';
function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        { id: 1, category: 'Phone', name: 'Iphone 15', model: 'Pro Max', imageUrl: path, product_code: '123456', profit: 10, quantity: '1000', store_id: '1' },
        { id: 2, category: 'Phone', name: 'Samsung Galaxy S22', model: 'S22 Ultra', imageUrl: path, product_code: '123457', profit: -20, quantity: '2000', store_id: '2' },
        { id: 3, category: 'Phone', name: 'Xiaomi Redmi Note 11', model: 'Pro', imageUrl: path, product_code: '123458', profit: 30, quantity: '3000', store_id: '3' },
        { id: 4, category: 'Phone', name: 'Huawei P50', model: 'Pro', imageUrl: path, product_code: '123459', profit: 40, quantity: '4000', store_id: '4' },
        { id: 5, category: 'Phone', name: 'Oppo Reno 7', model: 'Pro', imageUrl: path, product_code: '123460', profit: -50, quantity: '5000', store_id: '5' },
    ]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const getRowColor = (profit) => profit > 0 ? 'bg-green-300' : 'bg-red-300';

    const handleAddProductClick = () => {
        navigate('/add-product');
    };

    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">All Products</h1>
            <div className="flex justify-start items-start">
                {!selectedProduct && ( // This checks if selectedProduct is null
                    <div className="mb-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleAddProductClick}
                        >
                            Add Product
                        </button>
                    </div>
                )}
            </div>
            {!selectedProduct ? (
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Model</th>
                            <th className="px-4 py-2">Code</th>
                            <th className="px-4 py-2">Profit</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className={`${getRowColor(product.profit)} hover:bg-gray-100`}>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.model}</td>
                                <td className="border px-4 py-2">{product.product_code}</td>
                                <td className="border px-4 py-2">{product.profit}</td>
                                <td className="border px-4 py-2">{product.quantity}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <ProductDetail product={selectedProduct} />
            )}
        </div>
    );
}

export default ProductList;