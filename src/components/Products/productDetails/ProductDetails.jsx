import React from 'react';

// Dummy image path - replace with your actual path or URL
const placeholderImage = 'src/assets/sevketiphone.jpg';

function ProductDetails({ product }) {
    // This is where you would fetch the data from the backend using the product ID
    // For now, we're using the passed-in product prop for demonstration

    return (
        <div className="flex flex-wrap md:flex-nowrap bg-white shadow-lg rounded-lg mx-auto p-5 my-10">
            <div className="md:flex-1">
                <img
                    src={product.imageUrl || placeholderImage}
                    alt={product.name}
                    className="rounded-t-lg md:rounded-lg w-full object-cover"
                    style={{ maxHeight: '400px' }} // Adjust the max height as needed
                />
            </div>
            <div className="md:flex-1 md:pl-5 mt-5 md:mt-0">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-md mt-2"><strong>Model:</strong> {product.model}</p>
                <p className="text-md mt-2"><strong>Category:</strong> {product.category}</p>
                <p className="text-md mt-2"><strong>Quantity:</strong> {product.quantity}</p>
                <p className="text-md mt-2"><strong>Profit:</strong> ${product.profit}</p>
                <p className="text-md mt-2"><strong>Product Code:</strong> {product.productCode}</p>
                <p className="text-md mt-2"><strong>Store ID:</strong> {product.storeId}</p>
                {/* Map through transactions and productFields if needed */}
            </div>
        </div>
    );
}

export default ProductDetails;
