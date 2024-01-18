// App.js
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
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import Users from "./pages/admin/Users.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Products from "./pages/admin/Products.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";

function App() {
    const {isAuthenticated, isAdmin} = useSelector((state) => state.auth);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout/>}>
                {/* publicRoute */}
                <Route index element={<Home/>}/>
                <Route path="shop" element={<Shop/>}/>
                <Route path="sales" element={<Sales/>}/>

                {/* protectedRoute */}
                {isAuthenticated && <Route path="cart" element={<Cart/>}/>}
                {isAuthenticated && <Route path="profile" element={<Profile/>}/>}

                {/* adminRoute */}
                {isAdmin && (
                    <Route path="/admin/*" element={<AdminLayout/>}>
                        <Route index element={<Dashboard/>}/>
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
        </div>
    );
}

export default App;
