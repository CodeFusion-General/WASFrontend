import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { logout, decodeUserToken } from "../../api/authentication/AuthenticationApi.jsx";
import { getUserPhoto } from "../../api/resource/ResourceApi.jsx";
import { format } from 'date-fns';
import { useNavigate  } from 'react-router-dom';


const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// Helper function to get notification level color
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

// Initial fake notifications data
const initialNotifications = [
    {
        id: 1,
        recordDate: new Date(),
        subject: 'New comment on your post',
        description: 'You have a new comment on your post',
        telegramId: 123456789,
        isSent: true,
        isTelegram: true,
        text: 'Check out the new comment on your post',
        user: { id: 1, name: 'John Doe' }, // Simplified user entity
        store: { id: 1, name: 'Main Store' }, // Simplified store entity
        notificationLevel: 'INFO',
    },
    {
        id: 2,
        recordDate: new Date(),
        subject: 'Your profile has been updated',
        description: 'Your profile information has been updated successfully',
        telegramId: null,
        isSent: true,
        isTelegram: false,
        text: 'Your profile has been updated',
        user: { id: 1, name: 'John Doe' },
        store: { id: 1, name: 'Main Store' },
        notificationLevel: 'SUCCESS',
    },
    {
        id: 3,
        recordDate: new Date(),
        subject: 'New friend request',
        description: 'You have a new friend request',
        telegramId: 123456789,
        isSent: false,
        isTelegram: true,
        text: 'You have received a new friend request',
        user: { id: 1, name: 'John Doe' },
        store: { id: 1, name: 'Main Store' },
        notificationLevel: 'WARNING',
    },
    {
        id: 4,
        recordDate: new Date(),
        subject: 'System update available',
        description: 'A new system update is available for your device',
        telegramId: 987654321,
        isSent: true,
        isTelegram: true,
        text: 'Update your system to the latest version',
        user: { id: 2, name: 'Jane Doe' },
        store: { id: 2, name: 'Secondary Store' },
        notificationLevel: 'INFO',
    },
    {
        id: 5,
        recordDate: new Date(),
        subject: 'Password change required',
        description: 'It\'s time to update your password for security reasons',
        telegramId: null,
        isSent: true,
        isTelegram: false,
        text: 'Please update your password',
        user: { id: 3, name: 'Jim Beam' },
        store: { id: 3, name: 'Tertiary Store' },
        notificationLevel: 'WARNING',
    },
];

function Navbar() {
    const [photo, setPhoto] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [notifications] = useState(initialNotifications);

    const viewAllNotifications = () => {
        navigate('/notifications');
    };

    useEffect(() => {
        const decodedToken = decodeUserToken();
        if (decodedToken) {
            setIsLoggedIn(true);
            try {
                getUserPhoto(decodedToken.userId)
                    .then(response => {
                        setPhoto(URL.createObjectURL(response.data));
                    });
            } catch (error) {
                console.error('Failed to load user photo', error);
            }
        }
    }, []);

    return (
        <Disclosure as="nav" className="bg-gray-900 sticky top-0 z-50 ml-64 shadow-colorful-b">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                {isLoggedIn && <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>}
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                {isLoggedIn && <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>}
                            </div>
                            {isLoggedIn ? (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Menu as="div" className="relative">
                                        <div>
                                            <Menu.Button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {notifications.slice(0, 3).map((notification, index) => (
                                                    <Menu.Item key={index}>
                                                        {({ active }) => (
                                                            <a
                                                                href={`/notification/${notification.id}`}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                <div
                                                                    className={classNames(
                                                                        'px-2 py-1 rounded-full text-xs font-semibold mb-1',
                                                                        getNotificationLevelColor(notification.notificationLevel)
                                                                    )}
                                                                >
                                                                    {notification.notificationLevel}
                                                                </div>
                                                                <div className="font-bold">{notification.subject}</div>
                                                                <div className="text-xs text-gray-500">{notification.description}</div>
                                                                <div className="text-xs text-gray-400">
                                                                    {format(new Date(notification.recordDate), 'PPP')}
                                                                </div>
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                                {notifications.length > 3 && (
                                                    <div
                                                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={viewAllNotifications}
                                                    >
                                                        More Notifications
                                                    </div>
                                                )}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={photo || 'src/assets/default-user-icon.webp'}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="profile"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            onClick={() => logout()}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            ) : (
                                <a
                                    href="/login"
                                    className={classNames(
                                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                >
                                    Log In
                                </a>
                            )}
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
export default Navbar;