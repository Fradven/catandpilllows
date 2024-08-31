import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear the session storage to log out the user
        sessionStorage.removeItem("isLoggedIn");
        // Redirect to the login page
        router.push("/login");
    };

    return (
        <header className="bg-catTaupe text-catLightCream p-4">
            <nav className="flex justify-between items-center">
                {/* Logo on the left */}
                <h1 className="text-2xl font-bold">
                    <Link href="/">
                        Cat & Pillows
                    </Link>
                </h1>

                {/* Navigation links */}
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/tracking">
                            Tracking
                        </Link>
                    </li>
                    <li>
                        <Link href="/about-us">
                            About Us
                        </Link>
                    </li>
                </ul>

                {/* Logout button on the right */}
                <button
                    onClick={handleLogout}
                    className="bg-catLightCream hover:bg-catBrown text-catBrown font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
