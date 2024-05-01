import React, { useState } from 'react';
import { addProduct } from '../../../api/product/ProductApi';

function AddProductModal({ isOpen, onClose }) {
    const [product, setProduct] = useState({
        name: '',
        model: '',
        category: '',
        quantity: 0,
        profit: 0.0,
        productCode: '',
        imageUrl: '',
        storeId: ''
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const file = document.querySelector('input[type="file"]').files[0];
            const result = await addProduct(product, file);
            console.log("Product added successfully", result);
            onClose();
        } catch (error) {
            console.error("Failed to add product", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="flex flex-wrap md:flex-nowrap bg-white shadow-lg rounded-lg mx-auto p-5 my-10">
            <div className="md:flex-1">
                <img
                    src={product.imageUrl || 'path/to/your/placeholder/image.jpg'}
                    alt={product.name}
                    className="rounded-t-lg md:rounded-lg w-full object-cover"
                    style={{ maxHeight: '400px' }}
                />
                <div className="mt-2">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL:</label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        className="form-input mt-1 block w-full"
                        value={product.imageUrl}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="md:flex-1 md:pl-5 mt-5 md:mt-0">
                <InputField id="name" label="Product Name:" value={product.name} onChange={handleChange} />
                <InputField id="model" label="Model:" value={product.model} onChange={handleChange} />
                <InputField id="category" label="Category:" value={product.category} onChange={handleChange} />
                <InputField id="quantity" label="Quantity:" type="number" value={product.quantity} onChange={handleChange} />
                <InputField id="profit" label="Profit:" type="number" value={product.profit} onChange={handleChange} />
                <InputField id="productCode" label="Product Code:" value={product.productCode} onChange={handleChange} />
                <InputField id="storeId" label="Store ID:" value={product.storeId} onChange={handleChange} />
                <div className="flex mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSubmit}>
                        Add Product
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function InputField({ id, label, type = 'text', value, onChange }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                id={id}
                name={id}
                type={type}
                className="form-input mt-1 block w-full"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default AddProductModal;
