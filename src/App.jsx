import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
//components
import Navbar from './components/navbar/Navbar.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx'
//router
import BossRouter from "./router/BossRouter.jsx";
import ManagerRouter from "./router/ManagerRouter.jsx";
//pages
import MainPage from './pages/mainPage/MainPage.jsx';
import Login from './pages/loginPage/LoginPage.jsx';
import UserAdd from "./pages/userPages/userAdd/UserAdd.jsx";
import StoreList from './pages/storePages/storeList/StoreList.jsx';
import StoreAdd from "./pages/storePages/storeAdd/StoreAdd.jsx";
import StoreEmployee from './pages/storePages/storeEmployee/StoreEmployee.jsx';
import ProductsList from './pages/productPages/productList/ProductList.jsx'
import ProductDetail from "./pages/productPages/productDetail/ProductDetail.jsx";
import ProductAdd from "./pages/productPages/productAdd/ProductAdd.jsx";
import TransactionList from "./pages/transactionPages/transactionList/TransactionList.jsx";
import TransactionAdd from "./pages/transactionPages/transactionAdd/TransactionAdd.jsx";
import TransactionDetails from "./pages/transactionPages/transactionDetails/TransactionDetails.jsx";
import StoreDashboard from "./pages/storePages/storeDashboard/StoreDashboard.jsx";
//global
import {GlobalProvider} from "./api/globalContext/GlobalContext.jsx";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="ml-64">
                <Outlet />
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
                element: <MainPage />,
                index: true,
            },
            {
                path: "/employee-register",
                element: <BossRouter
                    element={<UserAdd type="Employee" />}
                />,
            },
            {
                path: "/register",
                element: <UserAdd
                    type="Boss"
                />,
            },
            {
                path: "/add-store",
                element: <BossRouter
                    element={<StoreAdd />}
                />,
            },
            {
                path: "/stores",
                element: <BossRouter
                    element={<StoreList />}
                />,
            },
            {
                path: "/store-employees",
                element: <ManagerRouter
                    element={<StoreEmployee />}
                />,
            },
            {
                path: "/product-list",
                element: <ProductsList />,
            },
            {
                path: "/product-details",
                element: <ProductDetail />,
            },
            {
                path: "/add-product",
                element: <ProductAdd />,
            },
            {
                path: "/transactions/:productId",
                element: <TransactionList />,
            },
            {
                path: "/add-transaction/:productId",
                element: <TransactionAdd />,
            },
            {
                path: "/transaction-details/:transactionId",
                element: <TransactionDetails />,
            },
            {
                path: "/store",
                element: <StoreDashboard />,
            }
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    return (
        <div className="App">
            <GlobalProvider>
                <RouterProvider router={router} />
            </GlobalProvider>
        </div>
    );
}

export default App;
