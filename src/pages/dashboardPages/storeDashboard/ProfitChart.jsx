import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { getDailyTotalTransactions } from '../../../api/transaction/TransactionApi.jsx';
import { GlobalStoreId } from '../../../api/store/GlobalStoreId.jsx';
import { decodeUserToken } from '../../../api/authentication/AuthenticationApi.jsx';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const ProfitChart = () => {
    const { globalStoreId } = useContext(GlobalStoreId);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });
    const [error, setError] = useState(null);

    const getStoreId = () => {
        const decodedToken = decodeUserToken();
        if (decodedToken.role === 'MANAGER' || decodedToken.role === 'USER') {
            return decodedToken.storeId;
        }
        return null;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeId = getStoreId() || globalStoreId;
                if (!storeId) {
                    setError('Store ID is not available');
                    return;
                }

                const data = await getDailyTotalTransactions(storeId);

                if (!data) {
                    setError('No data received from API');
                    return;
                }

                const labels = data.map(item => item.date);
                const totalData = data.map(item => item.total);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Total',
                            data: totalData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                setError(`Error fetching the daily total transactions: ${error.message}`);
            }
        };

        fetchData();
    }, [globalStoreId]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Total Transactions',
            },
        },
    };

    return (
        <div>
            {error ? <div className="text-red-500">{error}</div> : <Line data={chartData} options={options} />}
        </div>
    );
};

export default ProfitChart;