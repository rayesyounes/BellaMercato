import { useLocation, Navigate, Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

function AdminLayout() {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return token ? (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/admin/products">Products</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default AdminLayout;
