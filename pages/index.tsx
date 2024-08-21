import { useEffect, useState } from "react";
import Head from "next/head";
import LoginAndSignUpForm from "@/components/sections/LoginAndSignUpForm";
import HomeDescription from "@/components/sections/HomeDescription";
import MainPage from "@/components/sections/MainPage";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Head>
                <title>Cat & Pillows</title>
                <link rel="icon" href="/images/logo/favicon.png" />
            </Head>

            {isLoggedIn ? (
                <MainPage />
            ) : (
                <>
                    <HomeDescription />

                    <aside
                        style={{
                            width: "400px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%"
                        }}>
                        <LoginAndSignUpForm onLoginSuccess={handleLoginSuccess} />
                    </aside>
                </>
            )}
        </div>
    );
}
