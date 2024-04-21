import React, { useState } from 'react';

function ProductList() {
    const [products, setProducts] = useState([
        // Replace with your actual product data fetched from the backend
        // Dummy product data based on ProductDTO
        {
            id: 1, name: 'Iphone 15 Pro Max', model: '15 Pro Max', category: 'Electronics', quantity: 10, profit: 150.00, productCode: 'X1PRO123', store: { name: 'Main Store' },},
        {
            id: 2,
            name: 'Samsung Galaxy S22',
            model: 'S22 Ultra',
            category: 'Electronics',
            quantity: 15,
            profit: 230.00,
            productCode: 'S22ULT987',
            store: { name: 'Tech World' },
        },
        {
            id: 3,
            name: 'Google Pixel 6',
            model: 'Pixel 6',
            category: 'Electronics',
            quantity: 8,
            profit: 120.00,
            productCode: 'PIX6643',
            store: { name: 'Android Hub' },
        },
        {
            id: 4,
            name: 'OnePlus 9',
            model: '9 Pro',
            category: 'Electronics',
            quantity: 5,
            profit: 100.00,
            productCode: '1+9PRO756',
            store: { name: 'OnePlus Store' },
        },
    ]);

    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 border-2 border-gray-300 m-2 shadow-sm rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <div className="mb-4 flex justify-between items-center">
                            <span className="font-medium">Model:</span>
                            <span className="text-gray-600">{product.model}</span>
                        </div>
                        <div className="mb-4 flex justify-between items-center">
                            <span className="font-medium">Category:</span>
                            <span className="text-gray-600">{product.category}</span>
                        </div>
                        <div className="mb-4 flex justify-between items-center">
                            <span className="font-medium">Quantity:</span>
                            <span className="text-gray-600">{product.quantity}</span>
                        </div>
                        <div className="mb-4 flex justify-between items-center">
                            <span className="font-medium">Profit:</span>
                            <span className="text-gray-600">${product.profit.toFixed(2)}</span>
                        </div>
                        <div className="mb-4 flex justify-between items-center">
                            <span className="font-medium">Product Code:</span>
                            <span className="text-gray-600">{product.productCode}</span>
                        </div>
                        <div className="mb-4 flex justify-between items-center">
                            <span className="font-medium">Store:</span>
                            <span className="text-gray-600">{product.store.name}</span>
                        </div>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
