import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaHome, FaInfoCircle, FaChartLine, FaCalendarAlt } from "react-icons/fa"; // Import the icons you want to use

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem("isLoggedIn");
        router.push("/login");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { href: "/", label: "Home", icon: <FaHome /> },
        { href: "/about", label: "About Us", icon: <FaInfoCircle /> },
        { href: "/tracking", label: "Tracking", icon: <FaChartLine /> },
        { href: "/previous-months", label: "Previous Months", icon: <FaCalendarAlt /> }
    ];

    return (
        <header className={`bg-catLightCream text-catDarkBurgundy fixed ${isOpen ? 'h-full' : 'h-16'} md:h-full md:w-64 w-full p-4 z-50 transition-all duration-300`}>
            <div className="flex justify-between items-center">
                {/* Logo and site name */}
                <div className="flex items-center space-x-2">
                    <Image src="/images/logo/Cat & pillows.svg" alt="Cat & Pillows Logo" width={50} height={50} />
                    <h1 className="text-xl font-bold">
                        <Link href="/">Cat & Pillows</Link>
                    </h1>
                </div>

                {/* Hamburger Menu Icon */}
                <div className="md:hidden block">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className={`md:flex flex-col space-y-4 mt-8 ${isOpen ? "block" : "hidden"} md:block`}>
                <ul className="space-y-4">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                                    router.pathname === link.href
                                        ? "bg-catBrown text-catLightCream"
                                        : "hover:bg-catTaupe hover:text-catBrown"
                                }`}
                            >
                                <span>{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="bg-catTaupe hover:bg-catBrown text-catBrown hover:text-catLightCream font-bold py-2 px-4 rounded w-full mt-4"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
