import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './Header.jsx';
import Slider from './mainPage/Slider.jsx';
import Login from './loginPage/Login.jsx';
import UserAdd from "./userPages/userAddPage/UserAdd.jsx";

const Dashboard = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    //Pages with header.
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
                path: "/register",
                element: <UserAdd />,
                index: true,
            },
        ],
    },
    //Pages without header.
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
