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
                    src={product.imageUrl || 'path/to/your/placeholder/image.jpg'}
                    alt={product.name}
                    className="rounded-t-lg md:rounded-lg w-full object-cover"
                    style={{ maxHeight: '400px' }}
                />
                <div className="mt-2">
                    <label htmlFor="imageFile" className="block text-sm font-medium leading-6 text-gray-900">Product Image:</label>
                    <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
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
            <div className="md:flex-1 md:pl-5 mt-5 md:mt-0">
                {['name', 'model', 'category', 'quantity', 'profit', 'productCode', 'storeId'].map(field => (
                    <div className="mb-4">
                        <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900">{`${field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:`}</label>
                        <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                id={field}
                                name={field}
                                type={field === 'quantity' || field === 'profit' ? 'number' : 'text'}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={editableProduct[field]}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ))}
                <div className="flex mt-4">
                    <button className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2" onClick={handleUpdate}>
                        Update
                    </button>
                    <button className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
