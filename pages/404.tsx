import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

const Custom404 = () => {
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-6xl font-bold text-catDarkBurgundy mb-6">404</h1>
                <p className="text-xl text-catDarkMauve mb-6">Oops! The page you are looking for does not exist.</p>
                <Link href="/" className="text-catBrown hover:text-catDarkBurgundy text-lg font-semibold">
                    Go back to the homepage
                </Link>
            </div>
        </MainLayout>
    );
};

export default Custom404;
