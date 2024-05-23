import { useEffect, useState, useContext } from 'react';
import { addProduct } from '../../../api/product/ProductApi.jsx';
import { getStoreById } from "../../../api/store/StoreApi.jsx";
import { addCategory, getCategoriesByStoreId } from "../../../api/category/CategoryApi.jsx";
import { decodeUserToken } from "../../../api/authentication/AuthenticationApi.jsx";
import { GlobalStoreId } from "../../../api/store/GlobalStoreId.jsx";
import { useNavigate } from 'react-router-dom';

function ProductAdd({ onClose }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [store, setStore] = useState(null);
    const { globalStoreId } = useContext(GlobalStoreId);
    const [product, setProduct] = useState({
        name: '',
        model: '',
        category: 0,
        productCode: '',
        store: 0,
        quantity: '',
        productFields: []
    });
    const [newCategory, setNewCategory] = useState('');
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryData = await getCategoriesByStoreId(decodeUserToken().storeId || globalStoreId);
                setCategories(categoryData.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
                setCategories([]);
            }
        };

        const fetchStore = async () => {
            try {
                const storeData = await getStoreById(decodeUserToken().storeId || globalStoreId);
                setStore(storeData.data);
                setProduct(prev => ({ ...prev, store: storeData.data.id }));
            } catch (error) {
                console.error("Failed to fetch store", error);
                setStore(null);
            }
        };

        fetchCategories();
        fetchStore();
    }, []);

    if (!store) {
        return <div>Loading...</div>;
    }

    const handleChange = (e, index = null) => {
        if (index !== null) {
            const updatedFields = product.productFields.map((field, idx) =>
                idx === index ? { ...field, [e.target.name]: e.target.value } : field
            );
            setProduct({ ...product, productFields: updatedFields });
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };

    const addInputField = (name = '', feature = '') => {
        setProduct(prev => ({
            ...prev,
            productFields: [...prev.productFields, { name, feature }]
        }));
    };

    const removeInputField = (index) => {
        if (product.productFields.length > 0) {
            setProduct(prev => {
                const updatedFields = prev.productFields.filter((_, idx) => idx !== index);
                return { ...prev, productFields: updatedFields };
            });
        }
    };

    const handleCategoryPrototype = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "") {
            setProduct({ ...product, category: '', productFields: [] });
        } else if (selectedValue === "new") {
            setShowNewCategoryInput(true);
            setProduct({ ...product, category: '', productFields: [] });
        } else {
            setShowNewCategoryInput(false);
            const category = categories.find(cat => cat.id === parseInt(selectedValue));
            if (category) {
                setProduct({
                    ...product,
                    category: category.id,
                    productFields: category.prototypes.map(prototype => ({
                        name: prototype.name,
                        feature: prototype.feature
                    }))
                });
            }
        }
    };

    const handleAddCategory = () => {
        const storeId = parseInt(decodeUserToken().storeId || globalStoreId, 10);
        const newCategoryObj = {
            category: {
                name: newCategory,
                storeId: storeId,
                prototypes: [],
                products: []
            },
            prototypes: product.productFields.map(field => ({ name: field.name, isDelete: false }))
        };
        
        console.log("New Category Object:", newCategoryObj);  // Debugging: Log the newCategoryObj
    
        addCategory(newCategoryObj)
            .then(() => alert("Category added successfully"))
            .catch((error) => {
                console.error("Failed to add category", error);
            });
        
        setCategories([...categories, newCategoryObj]);
        setProduct({
            ...product,
            category: newCategoryObj.id.toString(),
            productFields: []
        });
        setNewCategory('');
        setShowNewCategoryInput(false);
    };

    const handleSubmit = async () => {
        try {
            const photoData = document.getElementById('imageFile').files[0];
            console.log("Product data", product);
            const result = await addProduct(product, photoData);
            console.log("Product added successfully", result);
            navigate('/product-list');
        } catch (error) {
            console.error("Failed to add product", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-5 my-10 w-full max-w-4xl bg-white rounded-lg shadow-lg mt-2">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">New Product</h2>
                <div className="product-fields">
                    <div className="field-pair">
                        <InputField
                            id="name"
                            label="Name:"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />
                        <InputField
                            id="model"
                            label="Model:"
                            name="model"
                            value={product.model}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field-pair">
                        <InputField
                            id="category"
                            label="Category:"
                            name="category"
                            value={product.category}
                            onChange={handleCategoryPrototype}
                            isSelect
                            options={categories}
                        />
                        <InputField
                            id="productCode"
                            label="Product Code:"
                            name="productCode"
                            value={product.productCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field-pair">
                        <InputField
                            id="store"
                            label="Store:"
                            name="store"
                            enabled={false}
                            value={store.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {showNewCategoryInput && (
                    <div className="mt-6 mb-4">
                        <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700 mb-2">New Category:</label>
                        <div className="flex items-center">
                            <input
                                id="newCategory"
                                name="newCategory"
                                type="text"
                                className="w-full p-2 text-sm text-gray-900 bg-gray-100 rounded-md focus:ring focus:ring-blue-500"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <button
                                className="ml-4 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md"
                                onClick={handleAddCategory}
                            >
                                Add Category
                            </button>
                        </div>
                    </div>
                )}
                <div className="mt-6" id='product-fields'>
                    <label className="block mb-4 text-lg font-medium leading-6 text-gray-700">Product Fields:</label>
                    <div className="product-fields">
                        {product.productFields.map((field, index) => (
                            <div key={index} className="field-pair">
                                <InputField id={`name${index}`} label="Field Name:" name="name" value={field.name}
                                            onChange={(e) => handleChange(e, index)} />
                                <InputField id={`feature${index}`} label="Feature:" name="feature"
                                            value={field.feature} onChange={(e) => handleChange(e, index)} />
                                <button
                                    className="py-2 px-4 mt-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
                                    onClick={() => removeInputField(index)}
                                >
                                    Delete Field
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        className="py-2 px-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                        onClick={() => addInputField()}>
                        Add Field
                    </button>
                </div>
                <div className="w-full mt-8">
                    <label htmlFor="imageFile" className="block mb-2 text-sm font-medium text-gray-700">Product Image:</label>
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setPhoto(e.target.result);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    <p className="mt-1 text-sm text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    {photo && (
                        <img
                            src={photo}
                            className="rounded-lg w-full object-cover mt-2"
                            style={{ maxHeight: '400px' }}
                        />
                    )}
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md"
                        onClick={handleSubmit}>
                        Add Product
                    </button>
                    <button
                        className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
                        onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function InputField({ id, label, type = 'text', name, value, onChange, isSelect = false, options = [], enabled = true }) {
    return (
        <div className="mb-4 input-field">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            {isSelect ? (
                <select
                    id={id}
                    name={name}
                    className="w-full p-2 mt-1 text-sm text-gray-900 bg-gray-100 rounded-md focus:ring focus:ring-blue-500"
                    value={value}
                    onChange={onChange}
                >
                    <option value="">Select a category</option>
                    <option value="new">New Category</option>
                    {options.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    className="w-full p-2 mt-1 text-sm text-gray-900 bg-gray-100 rounded-md focus:ring focus:ring-blue-500"
                    value={value}
                    onChange={onChange}
                    disabled={!enabled}
                />
            )}
        </div>
    );
}

export default ProductAdd;
