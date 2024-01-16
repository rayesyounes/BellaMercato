import {
    Routes,
    Route
} from "react-router-dom";

import Users from "../pages/admin/Users.jsx";
import Orders from "../pages/admin/Orders.jsx";
import Products from "../pages/admin/Products.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";

function AdminLayout() {

    return (
        <div>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </div>
    );
}

export default AdminLayout;
