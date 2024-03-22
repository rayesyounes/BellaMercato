import {Analytics} from "@vercel/analytics/react"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";

import {useSelector} from "react-redux";
import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Sales from "./pages/Sales.jsx";
import Brands from "./pages/Brands.jsx";
import Product from "./pages/Product.jsx";
import Categories from "./pages/Categories.jsx";

import CheckOut from "./pages/CheckOut.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";
import Order from "./pages/Order.jsx";

import Users from "./pages/admin/Users.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Products from "./pages/admin/Products.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminBrands from "./pages/admin/Brands.jsx";
import AdminCategories from "./pages/admin/Categories.jsx";
import {Box} from "@chakra-ui/react";


const NotFound = () => {
    return (
        <div>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};


function App() {
    const {isAuthenticated, isAdmin} = useSelector(state => state.auth);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout/>}>
                {/* publicRoute */}
                <Route index element={<Home/>}/>
                <Route path="shop" element={<Shop/>}/>
                <Route path="sales" element={<Sales/>}/>
                <Route path="product/:id" element={<Product/>}/>
                <Route path="categories" element={<Categories/>}/>
                <Route path="brands" element={<Brands/>}/>
                <Route path="*" component={NotFound}/>


                {/* protectedRoute */}
                {isAuthenticated && <Route path="checkout" element={<CheckOut/>}/>}
                {isAuthenticated && <Route path="profile" element={<Profile/>}/>}
                {isAuthenticated && <Route path="history" element={<History/>}/>}
                {isAuthenticated && <Route path="order/:id" element={<Order/>}/>}


                {/* adminRoute */}
                {isAdmin && (
                    <Route path="/admin/*" element={<AdminLayout/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="users" element={<Users/>}/>
                        <Route path="orders" element={<Orders/>}/>
                        <Route path="products" element={<Products/>}/>
                        <Route path="categories" element={<AdminCategories/>}/>
                        <Route path="brands" element={<AdminBrands/>}/>
                    </Route>
                )}
            </Route>
        )
    );

    return (
        <Box>
            <RouterProvider router={router}/>
            <Analytics/>
        </Box>
    );
}

export default App;
