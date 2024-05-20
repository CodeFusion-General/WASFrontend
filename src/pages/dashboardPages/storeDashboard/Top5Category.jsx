import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { getTop5MostProfitableCategory } from '../../../api/category/CategoryApi.jsx';
import { GlobalStoreId } from "../../../api/store/GlobalStoreId.jsx";
import { decodeUserToken } from "../../../api/authentication/AuthenticationApi.jsx";
import Chart from 'chart.js/auto';

const COLORS = [
    'rgba(75, 192, 192, 0.6)',
    'rgba(75, 192, 75, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 105, 180, 0.6)',
    'rgba(255, 99, 132, 0.6)',
];

const BORDER_COLORS = [
    'rgba(75, 192, 192, 1)',
    'rgba(75, 192, 75, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 105, 180, 1)',
    'rgba(255, 99, 132, 1)',
];

const Top5Category = ({ storeId }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { globalStoreId } = useContext(GlobalStoreId);

    const determineStoreId = () => {
        const token = decodeUserToken();
        if (token && (token.role === 'MANAGER' || token.role === 'USER')) {
            return token.storeId;
        }
        return globalStoreId;
    };

    useEffect(() => {
        const id = storeId || determineStoreId();

        const fetchCategoryData = async () => {
            try {
                const response = await getTop5MostProfitableCategory(id);
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                setError(`Error fetching top 5 most profitable categories: ${error.message}`);
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [storeId, globalStoreId]);

    useEffect(() => {
        return () => {
            for (let id in Chart.instances) {
                Chart.instances[id].destroy();
            }
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const data = {
        labels: categories.map((category) => category.categoryName),
        datasets: [
            {
                label: 'Total Profit',
                data: categories.map((category) => category.totalProfit),
                backgroundColor: categories.map((_, index) => COLORS[index % COLORS.length]),
                borderColor: categories.map((_, index) => BORDER_COLORS[index % BORDER_COLORS.length]),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Top 5 Most Profitable Categories</h2>
            <Bar data={data} options={options} />
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate('/category-list')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md"
                >
                    View All Categories
                </button>
            </div>
        </div>
    );
};

export default Top5Category;