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

    const removeInputField = () => {
        if (product.productFields.length > 1) {
            setProduct(prev => {
                const updatedFields = [...prev.productFields];
                updatedFields.pop();
                return { ...prev, productFields: updatedFields };
            });
        }
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
            <div className="p-5 my-10 w-full max-w-4xl bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h2>
                <div className="grid grid-cols-2 gap-6">
                    {Object.entries(product).filter(entry => typeof entry[1] === 'string' || typeof entry[1] === 'number').map(([key, value]) => (
                        <InputField key={key} id={key} label={key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') + ':'} name={key} value={value} onChange={handleChange}/>
                    ))}
                </div>
                <div className="mt-6" id='product-fields'>
                    <label className="block text-lg font-medium leading-6 text-gray-700">Product Fields:</label>
                    {product.productFields.map((field, index) => (
                        <div key={index} className="flex gap-6">
                            <InputField id={`name${index}`} label="Field Name:" name="name" value={field.name}
                                        onChange={(e) => handleChange(e, index)}/>
                            <InputField id={`feature${index}`} label="Feature:" name="feature"
                                        value={field.feature} onChange={(e) => handleChange(e, index)}/>
                            <button
                                className="py-2 px-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                                onClick={addInputField}>
                                Add Field
                            </button>
                            {product.productFields.length > 1 && (
                                <button
                                    className="py-2 px-4 mt-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
                                    onClick={removeInputField}
                                    disabled={product.productFields.length === 1}
                                >
                                    Delete Field
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-full mt-8">
                    <label htmlFor="imageFile" className="block mb-2 text-sm font-medium text-gray-700">Product Image:</label>
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
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
                    <p className="mt-1 text-sm text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    {product.imageUrl && (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="rounded-lg w-full object-cover mt-2"
                            style={{ maxHeight: '400px' }}
                        />
                    )}
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md"
                        onClick={handleSubmit}>
                        Add Product
                    </button>
                    <button
                        className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
                        onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function InputField({ id, label, type = 'text', name, value, onChange }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                className="w-full p-2 mt-1 text-sm text-gray-900 bg-gray-100 rounded-md focus:ring focus:ring-blue-500"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default ProductAdd;
