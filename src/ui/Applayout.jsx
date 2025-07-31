
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import Footer from "./Footer";
function AppLayout() {
    return (
        <div className="min-h-screen  bg-white">
            <Navbar />
            <main className="py-5 bg-gray-50 px-[250px]">
                <Outlet />
            </main>
            <Footer />
        </div>

    );
}

export default AppLayout;
