import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTransactionById, updateTransaction, deleteTransaction } from '../../../api/transaction/TransactionApi.jsx';
import placeholderImage from '../../../assets/transaction.png';

function TransactionDetails() {
    const { transactionId } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [editableTransaction, setEditableTransaction] = useState(null);
    const [imageUrl, setImageUrl] = useState(placeholderImage);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransaction = async () => {
            const data = await getTransactionById(transactionId);
            setTransaction(data);
            setEditableTransaction(data);
            setImageUrl(data.resourceFile?.data ? `data:image/jpeg;base64,${data.resourceFile.data}` : placeholderImage);
        };
        fetchTransaction();
    }, [transactionId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setEditableTransaction({ ...editableTransaction, [name]: type === 'radio' ? value === 'true' : newValue });
    };

    /*const handleUpdate = async () => {
        const photo = document.getElementById('imageFile').files[0];
        await updateTransaction(transactionId, editableTransaction, photo).then(() => {
            alert('Transaction updated successfully');
            navigate(`/transactions/${editableTransaction.product.id}`);
        }).catch((error) => {
            console.error('Error updating transaction:', error);
        });
    };*/

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            await deleteTransaction(transactionId);
            navigate(`/transactions/${editableTransaction.product.id}`);
        }
    };

    if (!transaction) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-2/3 bg-white shadow-lg rounded-lg p-5">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Transaction Details</h1>
                <div className="flex flex-wrap md:flex-nowrap bg-white rounded-lg mx-auto">
                    {/* Image Section */}
                    <div className="md:w-1/2 p-2 flex flex-col items-center">
                        <img
                            src={imageUrl}
                            alt="transaction image"
                            className="rounded-lg object-cover"
                        />
                        <div className="mt-2 w-full">
                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Product Image:</label>
                            <input
                                id="imageFile"
                                name="imageFile"
                                type="file"
                                className="form-input mt-1 block w-full border border-gray-300 rounded-md"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const newImageUrl = URL.createObjectURL(file);
                                        setEditableTransaction({
                                            ...editableTransaction,
                                            imageFile: file
                                        });
                                        setImageUrl(newImageUrl); // Update the image URL to display the selected photo
                                    }
                                }}
                            />
                        </div>
                    </div>
                    {/* General Properties Section */}
                    <div className="md:w-1/2 p-2">
                        <div className="w-full">
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="buying"
                                        name="isBuying"
                                        value={true}
                                        checked={editableTransaction.isBuying === true}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="buying" className="mr-4">Buying</label>
                                    <input
                                        type="radio"
                                        id="selling"
                                        name="isBuying"
                                        value={false}
                                        checked={editableTransaction.isBuying === false}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="selling">Selling</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-900">Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={editableTransaction.date}
                                    onChange={handleChange}
                                    className="block w-full border border-gray-300 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-900">Quantity:</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={editableTransaction.quantity}
                                    onChange={handleChange}
                                    className="block w-full border border-gray-300 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={editableTransaction.price}
                                    onChange={handleChange}
                                    className="block w-full border border-gray-300 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">Full Name:</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={editableTransaction.fullName}
                                    onChange={handleChange}
                                    className="block w-full border border-gray-300 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-900">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editableTransaction.address}
                                    onChange={handleChange}
                                    className="block w-full border border-gray-300 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editableTransaction.phone}
                                    onChange={handleChange}
                                    className="block w-full border border-gray-300 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center space-x-2 mt-4">
                            <button
                                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={handleDelete}>
                                Delete
                            </button>
                            <button
                                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={() => navigate(`/transactions/${editableTransaction.product.id}`)}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionDetails;
