import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Slider from './pages/mainPage/Slider.jsx';
import Login from './pages/loginPage/Login.jsx';
import UserAdd from "./pages/userPages/userAddPage/UserAdd.jsx";
import StoreList from './components/store/storeList/StoreList.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx'
import StoreAdd from "./components/store/storeAdd/StoreAdd.jsx";
import StoreEmployees from './components/store/storeEmployee/StoreEmployees.jsx';
import ProductsList from './components/Products/productList/ProductList.jsx'
import ProductDetails from "./components/Products/productDetails/ProductDetails.jsx";
import BossRouter from "./router/BossRouter.jsx";
import ManagerRouter from "./router/ManagerRouter.jsx";
import ProductAdd from "./components/Products/productAdd/ProductAdd.jsx";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <Outlet />
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
                element: <Slider />,
                index: true,
            },
            {
                path: "/employee-register",
                element: <BossRouter
                    element={<UserAdd type = "Employee"/>}
                />,
            },
            {
                path: "/register",
                element: <UserAdd
                    type = "Boss"
                />,
            },
            {
                path: "/add-store",
                element: <BossRouter
                    element={<StoreAdd/>}
                />,
            },
            {
                path: "/stores",
                element: <BossRouter
                    element={<StoreList/>}
                />,
            },
            {
                path: "/store-employees",
                element: <ManagerRouter
                    element={<StoreEmployees/>}
                />,
            },
            {
                path: "/product-list",
                element: <ProductsList/>,
            },
            {
                path: "/product-details",
                element: <ProductDetails/>,
            },
            {
                path: "/add-product",
                element: <ProductAdd/>,
            },

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
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
