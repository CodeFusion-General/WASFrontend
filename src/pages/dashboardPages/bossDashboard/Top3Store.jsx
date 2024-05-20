// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getTop3StoresByProfitForUser } from '../../../api/store/StoreApi';
import { decodeUserToken } from "../../../api/authentication/AuthenticationApi";

const COLORS = [
    'rgba(75, 192, 192, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(153, 102, 255, 0.6)',
];

const BORDER_COLORS = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(153, 102, 255, 1)',
];

const Top3Store = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = decodeUserToken().userId;

    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const response = await getTop3StoresByProfitForUser(userId);
                setStores(response.data);
                setLoading(false);
            } catch (error) {
                setError(`Error fetching top 3 stores: ${error.message}`);
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const data = {
        labels: stores.map(store => store.name),
        datasets: [
            {
                label: 'Total Profit',
                data: stores.map(store => store.totalProfit),
                backgroundColor: COLORS,
                borderColor: BORDER_COLORS,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.raw !== null) {
                            label += '$' + context.raw.toLocaleString();
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Top 3 Most Profitable Stores</h2>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default Top3Store;
