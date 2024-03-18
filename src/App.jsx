import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './Header.jsx';
import Slider from './MainPage/Slider.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';

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
        ],
    },
    //Pages without header.
    {
        path: "/login",
        element: <LoginPage />,
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
