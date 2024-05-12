import React, { useState } from 'react';
import { addProduct } from '../../../api/product/ProductApi.jsx';
import { useNavigate } from 'react-router-dom';

function ProductAdd({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        model: '',
        category: '',
        quantity: 0,
        profit: 0.0,
        productCode: '',
        imageUrl: '',
        storeId: '',
        productFields: [{name: '', feature: ''}]
    });

    const handleChange = (e, index = null) => {
        if (index !== null) {
            const updatedFields = product.productFields.map((field, idx) => 
                idx === index ? { ...field, [e.target.name]: e.target.value } : field
            );
            setProduct({ ...product, productFields: updatedFields });
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };

    const addInputField = () => {
        setProduct(prev => ({
            ...prev,
            productFields: [...prev.productFields, { name: '', feature: '' }]
        }));
    };

    const handleSubmit = async () => {
        try {
            const file = document.querySelector('input[type="file"]').files[0];
            const result = await addProduct(product, file);
            console.log("Product added successfully", result);
            navigate('/product-list');
        } catch (error) {
            console.error("Failed to add product", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="shadow-lg rounded-lg p-5 my-10 w-full max-w-4xl flex flex-col items-center">
                {/* Form Section */}
                <div className="w-full max-w-md">
                    <div className='flex gap-6 mb-4'>
                        <InputField id="name" label="Product Name:" name="name" value={product.name} onChange={handleChange} />
                        <InputField id="model" label="Model:" name="model" value={product.model} onChange={handleChange} />
                    </div>
                    <div className='flex gap-6 mb-4'>
                        <InputField id="category" label="Category:" name="category" value={product.category} onChange={handleChange} />
                        <InputField id="quantity" label="Quantity:" name="quantity" type="number" value={product.quantity} onChange={handleChange} />
                    </div>
                    <div className='flex gap-6 mb-4'>
                        <InputField id="profit" label="Profit:" name="profit" type="number" value={product.profit} onChange={handleChange} />
                        <InputField id="productCode" label="Product Code:" name="productCode" value={product.productCode} onChange={handleChange} />
                    </div>
                    <div className='flex gap-6 mb-4'>
                        <InputField id="storeId" label="Store ID:" name="storeId" value={product.storeId} onChange={handleChange} />
                    </div>
                    <div className="mb-4" id='product-fields'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Product Fields:</label>
                        {product.productFields.map((field, index) => (
                            <div key={index}>
                                <div className="flex gap-6 mb-4">
                                    <InputField id={`name${index}`} label="Field Name:" name="name" value={field.name} onChange={(e) => handleChange(e, index)} />  
                                    <InputField id={`feature${index}`} label="Feature:" name="feature" value={field.feature} onChange={(e) => handleChange(e, index)} />    
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center space-x-2 mt-4">
                        <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={addInputField}>
                            Add Field
                        </button>
                        <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit}>
                            Add Product
                        </button>
                        <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="w-full max-w-md mt-8">
                    <img
                        src={product.imageUrl || 'path/to/your/placeholder/image.jpg'}
                        alt={product.name}
                        className="rounded-lg w-full object-cover mb-2"
                        style={{ maxHeight: '400px' }}
                    />
                    <label htmlFor="imageFile" className="block text-sm font-medium leading-6 text-gray-900">Product Image:</label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                id="imageFile"
                                name="imageFile"
                                type="file"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        setProduct({
                                            ...product,
                                            imageUrl: URL.createObjectURL(file),
                                            imageFile: file
                                        });
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputField({ id, label, type = 'text', name, value, onChange }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        id={id}
                        name={name}
                        type={type}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductAdd;