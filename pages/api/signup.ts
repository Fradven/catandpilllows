import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { User } from "@/components/classes/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    // Email and password are required
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Check password length
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Check password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one uppercase, one lowercase, one number, and one special character" });
    }

    const filePath = path.join(process.cwd(), "data", "users.json");
    let users = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        users = JSON.parse(fileData);
    }

    // Check if user already exists
    const existingUser = users.find((user: any) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "UserInterface already exists" });
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Add the new user
    const newUser: User = new User(email, hashedPassword);
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "UserInterface signed up successfully" });
}