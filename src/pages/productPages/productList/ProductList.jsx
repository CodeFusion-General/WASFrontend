import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByStoreId } from "../../../api/product/ProductApi.jsx";
import { decodeUserToken } from "../../../api/authentication/AuthenticationApi.jsx";
import { GlobalStoreId } from "../../../api/store/GlobalStoreId.jsx";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const { globalStoreId } = useContext(GlobalStoreId);

    const tokenStoreId = () => {
        const token = decodeUserToken();
        return token && (token.role === 'MANAGER' || token.role === 'USER') ? token.storeId : null;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductsByStoreId(tokenStoreId() || globalStoreId);
                setProducts(response || []);
            } catch (error) {
                console.error("Error in getProductsByStoreId:", error);
                setProducts([]); // Set an empty array in case of error
            }
        };
        fetchProducts();
    }, [globalStoreId]);

    const handleAddProductClick = () => {
        navigate('/add-product');
    };

    const handleUpdateProduct = (updatedProduct) => {
        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
        setSelectedProduct(null); // Deselect the product after update
    };

    const handleDeleteProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
        setSelectedProduct(null); // Deselect the product after delete
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'products.xlsx');
    };

    const filteredProducts = products.filter((product) =>
        Object.values(product).some((value) =>
            String(value).toLowerCase().includes(globalFilter.toLowerCase())
        )
    );

    const statusBodyTemplate = (profit) => (
        <i className={`pi ${profit < 0 ? 'pi-times-circle' : 'pi-check-circle'}`} style={{ color: profit < 0 ? 'red' : 'green' }}></i>
    );

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">All Products</h1>
            <div className="flex justify-between items-center gap-4 mb-6">
                    <>
                        <button
                            onClick={handleAddProductClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                        >
                            Add Product
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
                    </>
            </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Product</th>
                            <th className="px-4 py-2 border border-gray-300">Model</th>
                            <th className="px-4 py-2 border border-gray-300">Product Code</th>
                            <th className="px-4 py-2 border border-gray-300">Profit</th>
                            <th className="px-4 py-2 border border-gray-300">Current Stock</th>
                            <th className="px-4 py-2 border border-gray-300">Status</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="px-4 py-2 border border-gray-300">{product.name}</td>
                                <td className="px-4 py-2 border border-gray-300">{product.model}</td>
                                <td className="px-4 py-2 border border-gray-300">{product.productCode}</td>
                                <td className="px-4 py-2 border border-gray-300">{product.profit}</td>
                                <td className="px-4 py-2 border border-gray-300">{product.currentStock}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {statusBodyTemplate(product.profit)}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        onClick={() => navigate(`/product-details/${product.id}`)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default ProductList;
