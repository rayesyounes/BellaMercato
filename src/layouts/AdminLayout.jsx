import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
    return (
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
    );
}

export default AdminLayout;
