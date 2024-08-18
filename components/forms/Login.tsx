import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import React from "react";

const Login = () => {
    return (
        <div>
            <Input placeholder="Email" fullWidth />
            <Spacer y={1} />
            <Input type={"password"} placeholder="Password" fullWidth />
            <Spacer y={1} />
            <Button color="primary" className="w-full text-center">
                Login
            </Button>
        </div>
    );
};

export default Login;