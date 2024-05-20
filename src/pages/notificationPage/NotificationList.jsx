import { useEffect, useState } from 'react';
import { getNotificationsByUserId, markNotificationIsSeen } from "../../api/notification/NotificationApi.jsx";
import { decodeUserToken } from "../../api/authentication/AuthenticationApi.jsx";
import { format } from 'date-fns';

function NotificationList() {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const notificationsPerPage = 5;

    useEffect(() => {
        const fetchNotifications = async () => {
            const decodedToken = decodeUserToken();
            if (decodedToken) {
                const response = await getNotificationsByUserId(decodedToken.userId);
                if (response && response.data) {
                    const sortedNotifications = response.data.sort(
                        (a, b) => new Date(b.recordDate) - new Date(a.recordDate)
                    );
                    setNotifications(sortedNotifications);
                }
            }
        };

        fetchNotifications();
    }, []);

    const totalPages = Math.ceil(notifications.length / notificationsPerPage);
    const displayedNotifications = notifications.slice((page - 1) * notificationsPerPage, page * notificationsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleMarked = (notificationId) => {
        markNotificationIsSeen(notificationId)
            .then(response => {
                console.log('Notification marked as read', response.data);
                const updatedNotifications = notifications.map(notification => {
                    if (notification.id === notificationId) {
                        notification.isSeen = true;
                    }
                    return notification;
                });
                setNotifications(updatedNotifications);
            })
            .catch(error => {
                console.error('Failed to mark notification as read', error);
            });
    };

    const getNotificationLevelColor = (level) => {
        switch (level) {
            case 'INFO':
                return 'bg-blue-100 text-blue-800';
            case 'SUCCESS':
                return 'bg-green-100 text-green-800';
            case 'ERROR':
                return 'bg-red-100 text-red-800';
            case 'WARNING':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return '';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Notifications</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="text-center">
                        <th className="px-4 py-2 border border-gray-300">Subject</th>
                        <th className="px-4 py-2 border border-gray-300">Description</th>
                        <th className="px-4 py-2 border border-gray-300">Date</th>
                        <th className="px-4 py-2 border border-gray-300">Level</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedNotifications.map((notification) => (
                        <tr key={notification.id} className="text-center">
                            <td className="px-4 py-2 border border-gray-300">{notification.subject}</td>
                            <td className="px-4 py-2 border border-gray-300">{notification.description}</td>
                            <td className="px-4 py-2 border border-gray-300">{format(new Date(notification.recordDate), 'PPP')}</td>
                            <td className="px-4 py-2 border border-gray-300">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getNotificationLevelColor(notification.notificationLevel)}`}>
                                        {notification.notificationLevel}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${page === 1 && 'cursor-not-allowed opacity-50'}`}
                >
                    Previous
                </button>
                <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <span
                            key={index + 1}
                            className={`px-4 py-2 ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} rounded-full cursor-pointer`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </span>
                    ))}
                </div>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ${page === totalPages && 'cursor-not-allowed opacity-50'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default NotificationList;
