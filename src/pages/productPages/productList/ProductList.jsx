import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {getProductsByStoreId} from "../../../api/product/ProductApi.jsx";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ProductDetail from "../productDetail/ProductDetail.jsx";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import 'primereact/resources/themes/saga-blue/theme.css';  // theme
import 'primereact/resources/primereact.min.css';         // core css
import 'primeicons/primeicons.css';                       // icons
import 'primeflex/primeflex.css';                         // primeflex

function ProductList(storeId) {
    const navigate = useNavigate();
    const [products, setProducts] = useState();
    /*const [products, setProducts] = useState([
        { id: 1, category: 'Phone', name: 'Iphone 15', model: 'Pro Max', product_code: '123456', profit: 10, quantity: '1000', store_id: '1' },
        { id: 2, category: 'Phone', name: 'Samsung Galaxy S22', model: 'S22 Ultra', product_code: '123457', profit: -20, quantity: '2000', store_id: '2' },
        { id: 3, category: 'Phone', name: 'Xiaomi Redmi Note 11', model: 'Pro', product_code: '123458', profit: 30, quantity: '3000', store_id: '3' },
        { id: 4, category: 'Phone', name: 'Huawei P50', model: 'Pro', product_code: '123459', profit: 40, quantity: '4000', store_id: '4' },
        { id: 5, category: 'Phone', name: 'Oppo Reno 7', model: 'Pro', product_code: '123460', profit: -50, quantity: '5000', store_id: '5' },
    ]);*/
    useEffect(() => {
        getProductsByStoreId(storeId).then((response) => {

        });
    }, []);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    const handleAddProductClick = () => {
        navigate('/add-product');
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <i className={`pi ${rowData.profit < 0 ? 'pi-times-circle' : 'pi-check-circle'}`} style={{ color: rowData.profit < 0 ? 'red' : 'green' }}></i>
        );
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        let buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'products.xlsx');
    };

    const header = (
        <div className="table-header flex justify-between items-center border-b border-gray-300 py-2 px-4">
            <h2 className="text-2xl font-semibold">Products</h2>
            <input type="text" className="p-inputtext p-component" placeholder="Global Search" onChange={(e) => setGlobalFilter(e.target.value)} />
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">All Products</h1>
            <div className="flex justify-start items-center gap-4 mb-6">
                {!selectedProduct && (
                    <Button label="Add Product" className="p-button-raised bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={handleAddProductClick} />
                )}
                <Button icon="pi pi-file" className="p-button-rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={() => dt.current.exportCSV()} tooltip="CSV" />
                <Button icon="pi pi-file-excel" className="p-button-rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={exportExcel} tooltip="XLS" />
            </div>
            {!selectedProduct ? (
                <DataTable ref={dt} value={products} globalFilter={globalFilter} header={header} paginator rows={10}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                           className="w-full border-collapse border border-gray-300"
                           resizableColumns columnResizeMode="fit"
                           sortMode="multiple">
                    <Column field="name" header="Product" sortable filter filterPlaceholder="Search by name" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                    <Column field="model" header="Model" sortable filter filterPlaceholder="Search by model" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                    <Column field="product_code" header="Code" sortable filter filterPlaceholder="Search by code" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                    <Column field="profit" header="Profit" sortable filter filterPlaceholder="Search by profit" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                    <Column field="quantity" header="Quantity" sortable filter filterPlaceholder="Search by quantity" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                    <Column body={statusBodyTemplate} header="Status" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                    <Column body={(rowData) => (
                        <Button onClick={() => setSelectedProduct(rowData)} label="View Details" className="p-button-rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" />
                    )} header="Actions" headerClassName="bg-gray-700 text-white border border-gray-300" bodyClassName="border border-gray-300"/>
                </DataTable>
            ) : (
                <ProductDetail product={selectedProduct} />
            )}
        </div>
    );
}

export default ProductList;
