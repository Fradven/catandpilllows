import { ReactNode } from "react";
import MainLayout from "@/layouts/MainLayout";

const MainPage = () => {
    return (
        <MainLayout>
            <h1>Hello</h1>
        </MainLayout>
    );
};

// MainPage.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default MainPage;