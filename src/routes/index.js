
import LayoutDefault from "../layouts/LayoutDefault";
import Home from "../pages/Home";
import Product from "../pages/Products";
import Login from "../pages/Login";
import LogOut from "../pages/LogOut";
import Register from "../pages/Register";
import Exercise from "../pages/Exercise";
import Carts from "../pages/Carts";
import Knowledge from "../pages/Knowledge";
import NutritionList from "../pages/NutritionList";
import ExerciseDetail from '../pages/ExerciseDetail';
import Contact from "../pages/Contact";
import User from "../pages/Users";
import About from "../pages/About";



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
            {path: "knowledge", element: <Knowledge/>},
            {path: "knowledge/nutritionlist", element: <NutritionList /> },
            {path:"exercise",element:<Exercise/>},
            {path: "ExerciseDetail/:id", element: <ExerciseDetail /> },
            {path:"carts",element:<Carts/>},
            {path:"user",element:<User/>},
            {path: "contact", element: <Contact /> },
            {path: "about", element: <About />}
        ],
    },
];