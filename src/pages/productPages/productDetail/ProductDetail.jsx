import React, { useState } from 'react';

const placeholderImage = 'src/assets/sevketiphone.jpg';

function ProductDetail({ product, onUpdate, onDelete }) {
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
                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Product Image:</label>
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="form-input mt-1 block w-full"
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
            <div className="md:flex-1 md:pl-5 mt-5 md:mt-0">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-input mt-1 block w-full"
                        value={editableProduct.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model:</label>
                    <input id="model" name="model" type="text" className="form-input mt-1 block w-full" value={editableProduct.model} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                    <input id="category" name="category" type="text" className="form-input mt-1 block w-full" value={editableProduct.category} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <input id="quantity" name="quantity" type="number" className="form-input mt-1 block w-full" value={editableProduct.quantity} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="profit" className="block text-sm font-medium text-gray-700">Profit:</label>
                    <input id="profit" name="profit" type="number" className="form-input mt-1 block w-full" value={editableProduct.profit} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">Product Code:</label>
                    <input id="productCode" name="productCode" type="text" className="form-input mt-1 block w-full" value={editableProduct.productCode} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="storeId" className="block text-sm font-medium text-gray-700">Store ID:</label>
                    <input id="storeId" name="storeId" type="text" className="form-input mt-1 block w-full" value={editableProduct.storeId} onChange={handleChange} />
                </div>
                <div className="flex mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleUpdate}>
                        Update
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
