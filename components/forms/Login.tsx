import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('isLoggedIn', 'true');
                onLoginSuccess();
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (error) {
            setError('Failed to log in');
        }
    };

    return (
        <div>
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                fullWidth
            />
            <Spacer y={1} />
            <Input
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                fullWidth
            />
            <Spacer y={1} />
            <Button
                color="primary"
                className="w-full text-center"
                onClick={handleLogin}
            >
                Login
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
