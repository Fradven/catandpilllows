import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import Cycle from '@/components/classes/Cycle';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { userId, cycleId, dateEnd } = req.body;

    if (!userId || !cycleId || !dateEnd) {
        return res.status(400).json({ message: "Missing required data" });
    }

    const filePath = path.join(process.cwd(), 'data', 'cycles.json');
    let cycles: Cycle[] = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        cycles = JSON.parse(fileData);
    }

    const cycleIndex = cycles.findIndex((cycle) => cycle.userId === userId && cycle.id === cycleId);

    if (cycleIndex === -1) {
        return res.status(404).json({ message: "Cycle not found" });
    }

    cycles[cycleIndex].dateEnd = new Date(dateEnd);

    fs.writeFileSync(filePath, JSON.stringify(cycles, null, 2));

    return res.status(200).json({ message: "Cycle ended successfully" });
}