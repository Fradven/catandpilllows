import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { userId } = req.query;

    const filePath = path.join(process.cwd(), "data", "cycles.json");
    let cycles = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        cycles = JSON.parse(fileData);
    }

    const userCycles = cycles.filter((cycle: any) => cycle.userId === Number(userId));
    res.status(200).json(userCycles);
}