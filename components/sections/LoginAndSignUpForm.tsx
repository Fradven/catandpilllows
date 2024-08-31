import React, { useState } from "react";
import SignUp from "@/components/forms/SignUp";
import Login from "@/components/forms/Login";
import { Tab, Tabs } from "@nextui-org/tabs";

const LoginAndSignUpForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [activeTab, setActiveTab] = useState("login");

    const handleSignUpSuccess = () => {
        setActiveTab("login");
        alert("Sign up successful! Please log in.");
    };

    return (
        <div className="flex flex-col w-full h-screen bg-[#C3A298]">
            <div className="p-8">
                <Tabs
                    aria-label="authentication forms"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key)}
                >
                    <Tab key={"login"} title={"Login"}>
                        <Login onLoginSuccess={onLoginSuccess} />
                    </Tab>
                    <Tab key={"signUp"} title={"Sign Up"}>
                        <SignUp onSignUpSuccess={handleSignUpSuccess} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default LoginAndSignUpForm;
