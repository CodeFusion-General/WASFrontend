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
        <div className="flex flex-wrap md:flex-nowrap bg-white shadow-lg rounded-lg mx-auto p-5 my-10">
            <div className="md:flex-1">
                <img
                    src={product.imageUrl || placeholderImage} 
                    alt={product.name}
                    className="rounded-t-lg md:rounded-lg w-full object-cover"
                    style={{ maxHeight: '400px' }}
                />
                <div className="mt-2">
                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Product Image:</label>
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="form-input mt-1 block w-full"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                                setEditableProduct({
                                    ...editableProduct,
                                    imageUrl: URL.createObjectURL(file),
                                    imageFile: file
                                });
                            }
                        }}
                    />
                </div>
            </div>
            <div className="w-full max-w-md flex flex-col items-center">
                {/* Form Fields Section */}
                <div className="w-full">
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
            </div>
        </div>
    );
}

export default ProductDetails;
