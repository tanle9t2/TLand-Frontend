import React from "react";
import SideBarUser from "./SideBarUser";
import MainPost from "./MainPost";

export default function RealEstatePage() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
            <SideBarUser />
            <main className="w-full mx-auto py-12 md:py-16">
                <MainPost />
            </main>
        </div>
    );
}
