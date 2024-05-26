import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import BossRouter from "./router/BossRouter";
import AdminRouter from "./router/AdminRouter";
import ManagerRouter from "./router/ManagerRouter";
import EmployeeRouter from "./router/EmployeeRouter";
import { GlobalStoreIdProvider } from "./api/store/GlobalStoreId";
import { GlobalCompanyIdProvider } from "./api/company/GlobalCompanyId";

// Dinamik importlar
const MainPage = lazy(() => import('./pages/mainPage/MainPage'));
const Login = lazy(() => import('./pages/loginPage/LoginPage'));
const UserAdd = lazy(() => import("./pages/userPages/userAdd/UserAdd"));
const StoreList = lazy(() => import('./pages/storePages/storeList/StoreList'));
const StoreAdd = lazy(() => import("./pages/storePages/storeAdd/StoreAdd"));
const StoreEmployee = lazy(() => import('./pages/storePages/storeEmployee/StoreEmployee'));
const ProductsList = lazy(() => import('./pages/productPages/productList/ProductList'));
const ProductDetail = lazy(() => import("./pages/productPages/productDetail/ProductDetail"));
const ProductAdd = lazy(() => import("./pages/productPages/productAdd/ProductAdd"));
const TransactionList = lazy(() => import("./pages/transactionPages/transactionList/TransactionList"));
const TransactionAdd = lazy(() => import("./pages/transactionPages/transactionAdd/TransactionAdd"));
const TransactionDetails = lazy(() => import("./pages/transactionPages/transactionDetails/TransactionDetails"));
const StoreDashboard = lazy(() => import("./pages/dashboardPages/storeDashboard/StoreDashboard"));
const UserProfile = lazy(() => import("./pages/userPages/userProfile/UserProfile"));
const NotificationList = lazy(() => import("./pages/notificationPage/NotificationList"));
const Settings = lazy(() => import("./pages/settingsPage/Settings"));
const BossDashboard = lazy(() => import("./pages/dashboardPages/bossDashboard/BossDashboard"));
const UserUpdate = lazy(() => import("./pages/userPages/userUpdate/UserUpdate"));
const CompanyAdd = lazy(() => import("./pages/companyPages/companyAdd/CompanyAdd"));
const CompanyDetail = lazy(() => import("./pages/companyPages/companyDetail/CompanyDetail"));
const CompanyList = lazy(() => import("./pages/companyPages/companyList/CompanyList"));
const CompanyUpdate = lazy(() => import("./pages/companyPages/companyUpdate/CompanyUpdate"));
const CategoryList = lazy(() => import("./pages/categoryPages/CategoryList"));

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 ml-64">
                    <Outlet />
                </div>
            </div>
            <div className="ml-64 mt-6">
                <Footer />
            </div>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={<div>Loading...</div>}><MainPage /></Suspense>,
                index: true,
            },
            {
                path: "/employee-register",
                element: (
                    <BossRouter>
                        <Suspense fallback={<div>Loading...</div>}><UserAdd type="Employee" /></Suspense>
                    </BossRouter>
                ),
            },
            {
                path: "/register",
                element: (
                    <AdminRouter>
                        <Suspense fallback={<div>Loading...</div>}><UserAdd type="Boss" /></Suspense>
                    </AdminRouter>
                ),
            },
            {
                path: "/add-store",
                element: (
                    <BossRouter>
                        <Suspense fallback={<div>Loading...</div>}><StoreAdd /></Suspense>
                    </BossRouter>
                ),
            },
            {
                path: "/stores",
                element: (
                    <BossRouter>
                        <Suspense fallback={<div>Loading...</div>}><StoreList /></Suspense>
                    </BossRouter>
                ),
            },
            {
                path: "/store-employees",
                element: (
                    <ManagerRouter>
                        <Suspense fallback={<div>Loading...</div>}><StoreEmployee /></Suspense>
                    </ManagerRouter>
                ),
            },
            {
                path: "/product-list",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><ProductsList /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/product-list/category/:categoryId",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><ProductsList type="category" /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/product-details/:productId",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><ProductDetail /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/add-product",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><ProductAdd /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/transactions/:productId",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><TransactionList /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/add-transaction/:productId",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><TransactionAdd /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/transaction-details/:transactionId",
                element: <Suspense fallback={<div>Loading...</div>}><TransactionDetails /></Suspense>,
            },
            {
                path: "/store",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><StoreDashboard /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/boss-dashboard",
                element: (
                    <BossRouter>
                        <Suspense fallback={<div>Loading...</div>}><BossDashboard /></Suspense>
                    </BossRouter>
                ),
            },
            {
                path: "/profile",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><UserProfile /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/notifications",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><NotificationList /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/edit-profile",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><UserUpdate /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/settings",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><Settings /></Suspense>
                    </EmployeeRouter>
                ),
            },
            {
                path: "/new-company/:bossId",
                element: (
                    <AdminRouter>
                        <Suspense fallback={<div>Loading...</div>}><CompanyAdd /></Suspense>
                    </AdminRouter>
                ),
            },
            {
                path: "/companies",
                element: (
                    <AdminRouter>
                        <Suspense fallback={<div>Loading...</div>}><CompanyList /></Suspense>
                    </AdminRouter>
                ),
            },
            {
                path: "/company-detail",
                element: (
                    <BossRouter>
                        <Suspense fallback={<div>Loading...</div>}><CompanyDetail /></Suspense>
                    </BossRouter>
                ),
            },
            {
                path: "/company-update",
                element: (
                    <AdminRouter>
                        <Suspense fallback={<div>Loading...</div>}><CompanyUpdate /></Suspense>
                    </AdminRouter>
                ),
            },
            {
                path: "/categories",
                element: (
                    <EmployeeRouter>
                        <Suspense fallback={<div>Loading...</div>}><CategoryList /></Suspense>
                    </EmployeeRouter>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
    },
]);

function App() {
    return (
        <div className="App">
            <GlobalStoreIdProvider>
                <GlobalCompanyIdProvider>
                    <RouterProvider router={router} />
                </GlobalCompanyIdProvider>
            </GlobalStoreIdProvider>
        </div>
    );
}

export default App;
