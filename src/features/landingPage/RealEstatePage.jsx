import React from "react";
import SideBarUser from "./SideBarUser";
import MainPost from "./MainPost";
export default function RealEstatePage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="grid grid-cols-8 gap-6">
                <SideBarUser />
                <MainPost />
            </div>
        </div>
    );
}
