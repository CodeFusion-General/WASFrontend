import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTop3EmployeesByStoreProfit } from '../../../api/user/UserApi';

const Top3Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await getTop3EmployeesByStoreProfit();
                setEmployees(response.data);
                setLoading(false);
            } catch (error) {
                setError(`Error fetching top 3 employees: ${error.message}`);
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const data = {
        labels: employees.map(employee => `${employee.name} ${employee.surname}`),
        datasets: [
            {
                label: 'Total Profit',
                data: employees.map(employee => employee.totalProfit),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString();
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += '$' + context.parsed.y.toLocaleString();
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Top 3 Most Profitable Employees</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Top3Employee;
