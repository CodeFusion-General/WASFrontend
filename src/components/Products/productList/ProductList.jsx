// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ProductDetails from "../productDetails/ProductDetails.jsx";

var path = 'src/assets/sevketiphone.jpg';

function ProductList() {
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState([
        { id: 1, category: 'Phone', name: 'Iphone 15', model: 'Pro Max' , imageUrl:path, product_code: '123456', profit: '10', quantity: '1000', store_id: '1' },
        { id: 2, category: 'Phone', name:  'Samsun Galaxy S22', model: 'S22 Ultra', imageUrl: path, product_code: '123457', profit: '20', quantity: '2000', store_id: '2' },
        { id: 3, category: 'Phone', name: 'Xiaomi Redmi Note 11', model: 'Pro', imageUrl: path, product_code: '123458', profit: '30', quantity: '3000', store_id: '3' },
        { id: 4, category: 'Phone', name: 'Huawei P50', model: 'Pro', imageUrl: path, product_code: '123459', profit: '40', quantity: '4000', store_id: '4' },
        { id: 5, category: 'Phone', name: 'Oppo Reno 7', model: 'Pro', imageUrl: path, product_code: '123460', profit: '50', quantity: '5000', store_id: '5' },
    ]);
     const  [selectedProduct, setSelectedProduct] = useState(null);
    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">All Products</h1>
            {!selectedProduct ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
                {/* eslint-disable-next-line no-unused-vars */}
                {products.map((product, index) => (
                    <div key={product.id}
                         className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl border-2 border-gray-300 m-2">
                        <h2 className="text-xl font-semibold mb-2">{product.category}</h2>
                        <div className="h-32 w-32 mb-3 overflow-hidden rounded-full border-8 border-gray-200">
                            <img
                                src={product.imageUrl}
                                className="object-cover w-full h-full"
                                alt={`${product.category}`}
                            />
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{product.name}</p>
                        <p className="text-gray-600 text-sm mb-4">{product.model}</p>
                        <p className="text-gray-600 text-sm mb-4">{product.product_code}</p>
                        <p className="text-gray-600 text-sm mb-4">{product.profit}</p>
                        <p className="text-gray-600 text-sm mb-4">{product.quantity}</p>
                        <p className="text-gray-600 text-sm mb-4">{product.store_id}</p>

                        <button
                            onClick={() => setSelectedProduct(product)}
                            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-900 transition-colors">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
            ) : (
                <ProductDetails product={selectedProduct} />
                )}
        </div>
    );
}

export default ProductList;