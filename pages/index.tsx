import { useEffect, useState } from "react";
import MainPage from "@/components/sections/MainPage";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/router";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);

        if (!loggedIn) router.push("/login");
    }, [router]);

    return isLoggedIn ? <MainPage /> : <Spinner />;
}