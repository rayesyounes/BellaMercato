import { Analytics } from "@vercel/analytics/react"
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";

import {useSelector} from "react-redux";
import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Sales from "./pages/Sales.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import Profile from "./pages/Profile.jsx";
import Users from "./pages/admin/Users.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Products from "./pages/admin/Products.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Product from "./pages/Product.jsx";
import History from "./pages/History.jsx";
import Order from "./pages/Order.jsx";

function App() {
    const {isAuthenticated, isAdmin} = useSelector(state => state.auth);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout/>}>
                {/* publicRoute */}
                <Route index element={<Home/>}/>
                <Route path="shop" element={<Shop/>}/>
                <Route path="sales" element={<Sales/>}/>
                <Route path={"product/:id"} element={<Product/>}/>

                {/* protectedRoute */}
                {isAuthenticated && <Route path="checkout" element={<CheckOut/>}/>}
                {isAuthenticated && <Route path="profile" element={<Profile/>}/>}
                {isAuthenticated && <Route path="history" element={<History />}/>}
                {isAuthenticated && <Route path="order/:id" element={<Order />}/>}


                {/* adminRoute */}
                {isAdmin && (
                    <Route path="/admin/*" element={<AdminLayout/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="users" element={<Users/>}/>
                        <Route path="orders" element={<Orders/>}/>
                        <Route path="products" element={<Products/>}/>
                    </Route>
                )}
            </Route>
        )
    );

    return (
        <div>
            <RouterProvider router={router}/>
            <Analytics />
        </div>
    );
}

export default App;
