import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './components/navBar/Header.jsx';
import Slider from './pages/mainPage/Slider.jsx';
import Login from './pages/loginPage/Login.jsx';
import UserAdd from "./pages/userPages/userAddPage/UserAdd.jsx";
import StoreList from './components/store/storeList/StoreList.jsx';
import Sidebar from './components/sideBar/Sidebar.jsx'
import StoreAdd from "./components/store/storeAdd/StoreAdd.jsx";
import StoreEmployees from './components/store/storeEmployee/StoreEmployees.jsx';
import ProductsList from './components/Products/productList/ProductList.jsx'
import ProductDetails from "./components/Products/productDetails/ProductDetails.jsx";
const Dashboard = () => {
    return (
        <div>
            <Header />
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
                element: <UserAdd
                    type = "Employee"
                />,
            },
            {
                path: "/boss-register",
                element: <UserAdd
                    type = "Boss"
                />,
            },
            {
              path: "/add-store",
              element: <StoreAdd/>,
            },
            {
                path: "/stores",
                element: <StoreList />,
            },
            {
                path: "/store-employees",
                element: <StoreEmployees/>,
            },
            {
                path: "/product-list",
                element: <ProductsList/>,
            },
            {
                path: "/product-details",
                element: <ProductDetails/>,
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
