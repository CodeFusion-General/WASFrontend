// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTransactionById, updateTransaction, deleteTransaction } from '../../../api/transaction/TransactionApi.jsx';

function TransactionDetails() {
    const { transactionId } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [editableTransaction, setEditableTransaction] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransaction = async () => {
            const data = await getTransactionById(transactionId);
            setTransaction(data);
            setEditableTransaction(data);
        };
        fetchTransaction();
    }, [transactionId]);

    const handleChange = (e) => {
        setEditableTransaction({ ...editableTransaction, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        await updateTransaction(transactionId, editableTransaction);
        setTransaction(editableTransaction);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            await deleteTransaction(transactionId);
            navigate(`/transactions/${editableTransaction.productId}`);
        }
    };

    if (!transaction) return <div>Loading...</div>;

    return (
        <div className="max-w-lg mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Transaction Details</h1>
            <div className="mb-4">
                <label htmlFor="isBuying" className="block text-sm font-medium text-gray-700">Type</label>
                <select name="isBuying" value={editableTransaction.isBuying} onChange={handleChange} className="block w-full mt-1">
                    <option value={true}>Buying</option>
                    <option value={false}>Selling</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" name="date" value={editableTransaction.date} onChange={handleChange} className="block w-full mt-1"/>
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input type="number" name="quantity" value={editableTransaction.quantity} onChange={handleChange} className="block w-full mt-1"/>
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" step="0.01" name="price" value={editableTransaction.price} onChange={handleChange} className="block w-full mt-1"/>
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="fullName" value={editableTransaction.fullName} onChange={handleChange} className="block w-full mt-1"/>
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="address" value={editableTransaction.address} onChange={handleChange} className="block w-full mt-1"/>
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" name="phone" value={editableTransaction.phone} onChange={handleChange} className="block w-full mt-1"/>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleUpdate}>
                    Update
                </button>
                <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleDelete}>
                    Delete
                </button>
                <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={() => navigate(`/transactions/${editableTransaction.productId}`)}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default TransactionDetails;
