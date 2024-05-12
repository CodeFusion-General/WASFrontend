import { useState } from 'react';
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
        productFields: [{ name: '', feature: '' }]
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="p-5 my-10 w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                    <InputField id="name" label="Product Name:" name="name" value={product.name}
                                onChange={handleChange}/>
                    <InputField id="model" label="Model:" name="model" value={product.model} onChange={handleChange}/>
                    <InputField id="category" label="Category:" name="category" value={product.category}
                                onChange={handleChange}/>
                    <InputField id="quantity" label="Quantity:" name="quantity" type="number" value={product.quantity}
                                onChange={handleChange}/>
                    <InputField id="profit" label="Profit:" name="profit" type="number" value={product.profit}
                                onChange={handleChange}/>
                    <InputField id="productCode" label="Product Code:" name="productCode" value={product.productCode}
                                onChange={handleChange}/>
                    <InputField id="storeId" label="Store ID:" name="storeId" value={product.storeId}
                                onChange={handleChange}/>
                </div>
                <div className="mt-6" id='product-fields'>
                    <label className="block text-lg font-medium leading-6 text-white">Product Fields:</label>
                    {product.productFields.map((field, index) => (
                        <div key={index} className="flex gap-6">
                            <InputField id={`name${index}`} label="Field Name:" name="name" value={field.name}
                                        onChange={(e) => handleChange(e, index)}/>
                            <InputField id={`feature${index}`} label="Feature:" name="feature"
                                        value={field.feature} onChange={(e) => handleChange(e, index)}/>
                        </div>
                    ))}

                    <button
                        className="py-2 px-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                        onClick={addInputField}>
                        Add Field
                    </button>
                </div>
                <div className="w-full mt-8">
                    <img
                        src={product.imageUrl || 'path/to/your/placeholder/image.jpg'}
                        alt={product.name}
                        className="rounded-lg w-full object-cover mb-2"
                        style={{maxHeight: '400px'}}
                    />
                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-300">Product
                        Image:</label>
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-700 rounded-md focus:ring-blue-500"
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
                <div className="flex justify-between mt-6">
                    <button
                        className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
                        onClick={handleSubmit}>
                        Add Product
                    </button>
                    <button
                        className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md"
                        onClick={onClose}>
                        Cancel
                    </button>
                </div>
                {/* Image Upload Section */}

            </div>
        </div>
    );
}

function InputField({id, label, type = 'text', name, value, onChange}) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                className="w-full p-2 mt-1 text-sm text-white bg-gray-700 rounded-md focus:ring focus:ring-blue-500"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default ProductAdd;
