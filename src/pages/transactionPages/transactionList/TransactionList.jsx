import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getTransactionsByProductId } from '../../../api/transaction/TransactionApi.jsx';

function TransactionList() {
    const { productId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const fetchedTransactions = await getTransactionsByProductId(productId);
                setTransactions(Array.isArray(fetchedTransactions) ? fetchedTransactions : [fetchedTransactions]);
            } catch (error) {
                console.error("Error in getTransactionsByProductId:", error);
                setTransactions([]);
            }
        };
        fetchTransactions();
    }, [productId]);

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(transactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'transactions.xlsx');
    };

    const filteredTransactions = transactions.filter((transaction) =>
        Object.values(transaction).some((value) =>
            String(value).toLowerCase().includes(globalFilter.toLowerCase())
        )
    );

    const statusBodyTemplate = (isBuying) => (
        <i className={`pi ${isBuying ? 'pi-plus-circle' : 'pi-minus-circle'}`} style={{ color: isBuying ? 'green' : 'red' }}></i>
    );

    const actionBodyTemplate = (transaction) => (
        <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            onClick={() => navigate(`/transaction-details/${transaction.id}`)}
            title="View Details"
        >
            View Details
        </button>
    );

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Transactions for Product {productId}</h1>
            <div className="flex justify-between items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(`/add-transaction/${productId}`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                >
                    Add Transaction
                </button>
                <button
                    onClick={exportExcel}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                    Export to Excel
                </button>
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Global Search"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-300">ID</th>
                        <th className="px-4 py-2 border border-gray-300">Full Name</th>
                        <th className="px-4 py-2 border border-gray-300">Date</th>
                        <th className="px-4 py-2 border border-gray-300">Quantity</th>
                        <th className="px-4 py-2 border border-gray-300">Price</th>
                        <th className="px-4 py-2 border border-gray-300">Type</th>
                        <th className="px-4 py-2 border border-gray-300">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="px-4 py-2 border border-gray-300">{transaction.id}</td>
                            <td className="px-4 py-2 border border-gray-300">{transaction.fullName}</td>
                            <td className="px-4 py-2 border border-gray-300">{transaction.date}</td>
                            <td className="px-4 py-2 border border-gray-300">{transaction.quantity}</td>
                            <td className="px-4 py-2 border border-gray-300">{transaction.price}</td>
                            <td className="px-4 py-2 border border-gray-300">{statusBodyTemplate(transaction.isBuying)}</td>
                            <td className="px-4 py-2 border border-gray-300">{actionBodyTemplate(transaction)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionList;
