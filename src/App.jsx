import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './Header.jsx';
import Slider from './mainPage/Slider.jsx';
import Login from './loginPage/Login.jsx';
import UserAdd from "./userPages/userAddPage/UserAdd.jsx";
import StoreList from './components/store/storeList/StoreList.jsx';
import Sidebar from './Sidebar.jsx'
import StoreEmployees from './components/store/storeEmployee/StoreEmployees.jsx';

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
                path: "/stores",
                element: <StoreList />,
            },
            {
                path: "/store-employees",
                element: <StoreEmployees/>,
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
