import HomeDescription from "@/components/sections/HomeDescription";
import LoginAndSignUpForm from "@/components/sections/LoginAndSignUpForm";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";

const Login = () => {
    const router = useRouter();

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";

        if (loggedIn) handleLoginSuccess();
    }, []);

    const handleLoginSuccess = () => {
        router.push("/");
    };

    return (

        <div style={{ display: "flex", height: "100vh" }}>
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

        </div>
    );
};

export default Login;