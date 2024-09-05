import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { userId, dateStart, dateEnd } = req.body;

    if (!userId || !dateStart) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const filePath = path.join(process.cwd(), "data", "cycles.json");
    let cycles = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        cycles = JSON.parse(fileData);
    }

    const newCycle = {
        id: cycles.length > 0 ? cycles[cycles.length - 1].id + 1 : 1,
        userId: userId,
        dateStart: new Date(dateStart),
        dateEnd: dateEnd ? new Date(dateEnd) : null,
    };

    cycles.push(newCycle);
    fs.writeFileSync(filePath, JSON.stringify(cycles, null, 2));

    res.status(201).json({ message: "Cycle added successfully", cycle: newCycle });
}