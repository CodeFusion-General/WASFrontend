import React, { useState, useEffect } from 'react';
import { deleteProduct, updateProduct, getProductById } from "../../../api/product/ProductApi.jsx";
import { useNavigate, useParams } from "react-router-dom";

const placeholderImage = '/path/to/your/placeholder/image.png'; // Doğru yolu belirtin

function ProductDetail() {
    const { productId } = useParams();
    const [editableProduct, setEditableProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState(placeholderImage);
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(productId).then((response) => {
            setEditableProduct(response);
            if (response.resourceFile && response.resourceFile.data) {
                setImageUrl(`data:image/jpeg;base64,${response.resourceFile.data}`);
            }
            console.log("Product data fetched successfully:", response);
        }).catch((error) => {
            console.error("Error fetching product data:", error);
        });
    }, [productId]);

    const handleFieldChange = (index, field, value) => {
        const updatedFields = editableProduct.productFields.map((f, i) =>
            i === index ? { ...f, [field]: value } : f
        );
        setEditableProduct({ ...editableProduct, productFields: updatedFields });
    };
  
    const handleChange = (e) => {
        setEditableProduct({ ...editableProduct, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const photo = document.getElementById('imageFile').files[0];
            await updateProduct(editableProduct.id, editableProduct, photo);
            console.log("Product updated successfully");
        }
        catch (error) {
            console.error("Error updating product:", error);
        }
    };


    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(editableProduct.id);
                console.log("Product deleted successfully");
            }
            catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const handleNavigateToTransactions = () => {
        navigate(`/transactions/${editableProduct.id}`);
    };

    if (!editableProduct) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="mt-10 text-3xl font-bold text-center text-gray-800 mb-10">Product Details</h1>
            <div className="flex flex-wrap md:flex-nowrap bg-white shadow-lg rounded-lg mx-auto p-5 my-10">
                {/* Image Section */}
                <div className="md:w-1/3 p-2 flex flex-col items-center">
                    <img
                        src={imageUrl}
                        alt={editableProduct.name}
                        className="rounded-lg object-cover"
                    />
                    <div className="mt-2 w-full">
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Product
                            Image:</label>
                        <input
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            className="form-input mt-1 block w-full"
                            onChange={(event) => {
                                const file = event.target.files[0];
                                if (file) {
                                    const newImageUrl = URL.createObjectURL(file);
                                    setEditableProduct({
                                        ...editableProduct,
                                        imageFile: file
                                    });
                                    setImageUrl(newImageUrl); // Update the image URL to display the selected photo
                                }
                            }}
                        />
                    </div>
                </div>
                {/* General Properties Section */}
                <div className="md:w-1/3 p-2">
                    <div className="w-full">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={editableProduct.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">Model:</label>
                            <input
                                id="model"
                                name="model"
                                type="text"
                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={editableProduct.model}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productCode" className="block text-sm font-medium leading-6 text-gray-900">Product Code:</label>
                            <input
                                id="productCode"
                                name="productCode"
                                type="text"
                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={editableProduct.productCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category:</label>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={editableProduct.category.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="current-stock" className="block text-sm font-medium leading-6 text-gray-900">Current Stock:</label>
                            <input
                                id="current-stock"
                                name="current-stock"
                                type="number"
                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={editableProduct.currentStock}
                                disabled={true}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profit" className="block text-sm font-medium leading-6 text-gray-900">Profit:</label>
                            <input
                                id="profit"
                                name="profit"
                                type="number"
                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={editableProduct.profit}
                                disabled={true}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="store-name" className="block text-sm font-medium leading-6 text-gray-900">Store Name:</label>
                            <input
                                id="store-name"
                                name="store-name"
                                type="text"
                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                disabled={true}
                                value={editableProduct.store.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center space-x-2 mt-4">
                        <button
                            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleUpdate}>
                            Update
                        </button>
                        <button
                            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={handleDelete}>
                            Delete
                        </button>
                        <button
                            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={handleNavigateToTransactions}>
                            View Transactions
                        </button>
                    </div>
                </div>
                {/* Product Properties Section */}
                <div className="md:w-1/3 p-2">
                    {editableProduct.productFields && (
                        <div className="mt-4 w-full">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Product Properties</h3>
                            <table className="min-w-full bg-white">
                                <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-900">Feature</th>
                                </tr>
                                </thead>
                                <tbody>
                                {editableProduct.productFields.map((field, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                            <input
                                                type="text"
                                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value={field.name}
                                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                            <input
                                                type="text"
                                                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value={field.feature}
                                                onChange={(e) => handleFieldChange(index, 'feature', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
