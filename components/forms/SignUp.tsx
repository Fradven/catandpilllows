import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useRouter } from "next/router";

const SignUp = ({ onSignUpSuccess }: { onSignUpSuccess: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                onSignUpSuccess();
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (error) {
            setError('Failed to sign up');
        }
    };

    return (
        <form onKeyDown={handleSignUp}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" fullWidth />
            <Spacer y={1} />

            <Input
                type={isVisible ? "text" : "password"}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                            <BsEye className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }

                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" fullWidth
            />
            <Spacer y={1} />

            <Input
                type={isVisible ? "text" : "password"}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                            <BsEye className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                fullWidth />
            <Spacer y={1} />

            <Button color="primary" className="w-full text-center bg-catDarkBurgundy mt-2" onClick={handleSignUp}>
                Sign Up
            </Button>
            {error && <p className="mt-4 text-sm text-center text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
        </form>
    );
};

export default SignUp;
