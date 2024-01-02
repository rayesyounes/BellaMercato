import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";

import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";

import Contact from "./pages/Contact.jsx";
import Mission from "./pages/Mission.jsx";
import Sales from "./pages/Sales.jsx";
import About from "./pages/About.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Create from "./pages/Create.jsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/Shop" element={<Shop />} />
                    <Route path="/Sales" element={<Sales />} />
                    <Route path="/Mission" element={<Mission />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Cart" element={<Cart />} />
                </Route>
            </>
        )
    );

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
