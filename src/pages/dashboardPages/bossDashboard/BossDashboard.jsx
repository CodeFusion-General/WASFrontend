import React from 'react';
import Top3Employee from './Top3Employee'; // Top3Employee bileşenini import edin

const BossDashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Boss Dashboard</h1>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-full p-2">
                    <Top3Employee />
                </div>
            </div>
        </div>
    );
};

export default BossDashboard;
