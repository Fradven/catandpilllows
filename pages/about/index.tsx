import React from "react";
import MainLayout from "@/layouts/MainLayout";

const About = () => {
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-4xl font-bold text-catDarkBurgundy mb-6">About This Project</h1>
                <p className="text-lg text-catDarkMauve max-w-2xl">
                    This project is a personal school project created with the intention of learning and building something meaningful.
                    I chose to make a period tracking app to provide a free alternative for those who need it.
                </p>
                <p className="text-lg text-catDarkMauve max-w-2xl mt-4">
                    My goal is to help others have access to a simple, yet effective tool for managing their health, without the need to rely on paid services.
                    I hope that this project can serve as a useful resource and a learning experience for myself and others.
                </p>
            </div>
        </MainLayout>
    );
};

export default About;
