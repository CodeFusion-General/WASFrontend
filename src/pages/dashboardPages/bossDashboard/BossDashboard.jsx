import React from 'react';
import Top3Employee from './Top3Employee';
import Top3Store from './Top3Store';

const BossDashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Boss Dashboard</h1>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-1/2 p-2">
                    <Top3Employee />
                </div>
                <div className="md:w-1/2 p-2">
                    <Top3Store />
                </div>
            </div>
        </div>
    );
};

export default BossDashboard;
