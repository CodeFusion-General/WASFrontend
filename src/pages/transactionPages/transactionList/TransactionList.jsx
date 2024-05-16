import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getTransactionsByProductId } from '../../../api/transaction/TransactionApi.jsx';

function TransactionList() {
    const { productId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            const fetchedTransactions = await getTransactionsByProductId(productId);
            // Check if fetchedTransactions is an array, if not, convert it to an array
            setTransactions(Array.isArray(fetchedTransactions) ? fetchedTransactions : [fetchedTransactions]);
        };
        fetchTransactions();
    }, [productId]);

    const statusBodyTemplate = (rowData) => {
        return (
            <i className={`pi ${rowData.isBuying ? 'pi-plus-circle' : 'pi-minus-circle'}`} style={{ color: rowData.isBuying ? 'green' : 'red' }}></i>
        );
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(transactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
        let buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'transactions.xlsx');
    };

    const header = (
        <div className="table-header flex justify-between items-center border-b border-gray-300 py-2 px-4">
            <h2 className="text-2xl font-semibold">Transactions for Product {productId}</h2>
            <input type="text" className="p-inputtext p-component" placeholder="Global Search" onChange={(e) => setGlobalFilter(e.target.value)} />
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                type="button"
                icon="pi pi-search"
                className="p-button-rounded p-button-info"
                onClick={() => navigate(`/transaction-details/${rowData.id}`)}
                tooltip="View Details"
            />
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Transactions for Product {productId}</h1>
            <div className="flex justify-start items-center gap-4 mb-6">
                <Button label="Add Transaction" icon="pi pi-plus" className="p-button-rounded bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow" onClick={() => navigate(`/add-transaction/${productId}`)} />
                <Button icon="pi pi-file" className="p-button-rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={() => dt.current.exportCSV()} tooltip="CSV" />
                <Button icon="pi pi-file-excel" className="p-button-rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={exportExcel} tooltip="XLS" />
            </div>
            <DataTable ref={dt} value={transactions} globalFilter={globalFilter} header={header} paginator rows={10}
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} transactions"
                       className="w-full border-collapse border border-gray-300"
                       resizableColumns columnResizeMode="fit"
                       sortMode="multiple">
                <Column field="id" header="ID" sortable filter filterPlaceholder="Search by ID" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                <Column field="fullName" header="Full Name" sortable filter filterPlaceholder="Search by name" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                <Column field="date" header="Date" sortable filter filterPlaceholder="Search by date" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                <Column field="quantity" header="Quantity" sortable filter filterPlaceholder="Search by quantity" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                <Column field="price" header="Price" sortable filter filterPlaceholder="Search by price" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                <Column field="isBuying" header="Type" sortable filter filterPlaceholder="Search by type" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300" body={statusBodyTemplate}/>
                <Column body={actionBodyTemplate} header="Actions" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
            </DataTable>
        </div>
    );
}

export default TransactionList;