
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import Footer from "./Footer";
function AppLayout() {
    return (
        <div className="min-h-screenbg-white">
            <Navbar />
            <main className="py-5 bg-gray-50 px-[150px]">
                <Outlet />
            </main>
            <Footer />
        </div>

    );
}

export default AppLayout;
