import React, { useState } from 'react';

// Dummy image path - replace with your actual path or URL
const placeholderImage = 'src/assets/sevketiphone.jpg';

function ProductDetails({ product, onUpdate, onDelete }) {
    const [editableProduct, setEditableProduct] = useState(product);

    const handleChange = (e) => {
        setEditableProduct({ ...editableProduct, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        onUpdate(editableProduct);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            onDelete(editableProduct.id);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="shadow-lg rounded-lg p-5 my-10 w-full max-w-4xl flex flex-col items-center">
                {/* Form Fields Section */}
                <div className="w-full max-w-md">
                    {['name', 'model', 'category', 'quantity', 'profit', 'productCode', 'storeId'].reduce((acc, field, index, array) => {
                        // Grouping fields in pairs
                        if (index % 2 === 0) {
                            const nextField = array[index + 1];
                            acc.push(
                                <div key={field} className="flex mb-4 gap-4">
                                    <div className="flex-1">
                                        <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900">{`${field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:`}</label>
                                        <input
                                            id={field}
                                            name={field}
                                            type={field === 'quantity' || field === 'profit' ? 'number' : 'text'}
                                            className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={editableProduct[field]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {nextField && (
                                        <div className="flex-1">
                                            <label htmlFor={nextField} className="block text-sm font-medium leading-6 text-gray-900">{`${nextField[0].toUpperCase() + nextField.slice(1).replace(/([A-Z])/g, ' $1')}:`}</label>
                                            <input
                                                id={nextField}
                                                name={nextField}
                                                type={nextField === 'quantity' || nextField === 'profit' ? 'number' : 'text'}
                                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value={editableProduct[nextField]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return acc;
                    }, [])}
                    <div className="flex justify-center space-x-2 mt-4">
                        <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleUpdate}>
                            Update
                        </button>
                        <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
                {/* Image Upload Section */}
                <div className="w-full max-w-md mt-8">
                    <img
                        src={product.imageUrl || 'path/to/your/placeholder/image.jpg'}
                        alt={product.name}
                        className="rounded-lg w-full object-cover"
                        style={{ maxHeight: '400px' }}
                    />
                    <label htmlFor="imageFile" className="block text-sm font-medium leading-6 text-gray-900 mt-2">Product Image:</label>
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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

    );
}

export default ProductDetails;
