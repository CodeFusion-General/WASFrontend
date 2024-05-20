import { useState } from 'react';
import { decodeUserToken } from "../../api/authentication/AuthenticationApi.jsx";
import { getTelegramLink } from "../../api/telegram/TelegramApi.jsx";

function Settings() {
    const [isPaired, setIsPaired] = useState(false);
    const userId = decodeUserToken().userId;

    const handlePairing = async () => {
        try {
            const response = await getTelegramLink(userId);
            if (response && response.data) {
                window.location.href = response.data;
                setIsPaired(true);
                alert('Telegram pairing link opened successfully.');
            }
        } catch (error) {
            console.error('Failed to get Telegram link:', error);
            alert('Failed to get Telegram link.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Settings</h1>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">Telegram</label>
                    <input
                        type="text"
                        value={isPaired ? "Paired" : "Not Paired"}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="w-full md:w-1/2 pl-0 md:pl-4">
                    <button
                        onClick={handlePairing}
                        disabled={isPaired}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow ${isPaired && 'cursor-not-allowed opacity-50'}`}
                    >
                        {isPaired ? 'Paired' : 'Pair Telegram'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
