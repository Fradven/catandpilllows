import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";

const UnderConstruction = ({ pageName }: { pageName: string }) => {
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center h-full text-center">
                <Image src="/images/under-construction.svg" alt="Under Construction" width={150} height={150} />
                <h1 className="text-4xl font-bold text-catDarkBurgundy mt-6 mb-4">{pageName} Page</h1>
                <p className="text-lg text-catDarkMauve max-w-xl">
                    The {pageName} page is currently under construction. We are working hard to bring you new features.
                    Please check back later.
                </p>
            </div>
        </MainLayout>
    );
};

export default UnderConstruction;
