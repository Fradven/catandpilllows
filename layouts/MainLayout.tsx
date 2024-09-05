import React from 'react';
import Navbar from "@/components/sections/NavBar";

const MainLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className="flex">
            <Navbar />
            <main className="flex-1 ml-0 md:ml-64 p-4 h-screen">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
