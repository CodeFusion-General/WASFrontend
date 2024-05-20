import React from 'react';
import { useParams } from 'react-router-dom';
import ProfitChart from './ProfitChart.jsx';
import Top5Products from './Top5Products.jsx';
import Top5Category from './Top5Category.jsx'; // Top5Category bileşenini import edin

const StoreDashboard = () => {
    const { storeId } = useParams();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Store Dashboard</h1>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-1/2 p-2">
                    <ProfitChart />
                </div>
                <div className="md:w-1/2 p-2">
                    <Top5Products storeId={storeId} />
                </div>
            </div>
            <div className="mt-6">
                <Top5Category storeId={storeId} /> {/* Top5Category bileşenini ekleyin */}
            </div>
        </div>
    );
};

export default StoreDashboard;
