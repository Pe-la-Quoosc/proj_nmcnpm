
import LayoutDefault from "../layouts/LayoutDefault";
import Home from "../pages/Home";
import Product from "../pages/Products";
import Login from "../pages/Login";
import LogOut from "../pages/LogOut";
import Register from "../pages/Register";
import Exercise from "../pages/Exercise";
export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            { path: "/", element: <Home /> },
            {path:"products", element: <Product />},
            {path:"login",element:<Login/>},
            {path:"logout",element:<LogOut/>},
            {path:"register",element:<Register/>},
            {path:"exercise",element:<Exercise/>},
        ],
    },
];