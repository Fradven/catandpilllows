import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import Cycle from '@/components/classes/Cycle';
import UserCycleInfos from '@/components/classes/UserCycleInfos';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const cyclesFilePath = path.join(process.cwd(), 'data', 'cycles.json');
    const userCycleInfoFilePath = path.join(process.cwd(), 'data', 'user_cycle_info.json');

    let cycles: Cycle[] = [];
    let userCycleInfos: UserCycleInfos[] = [];

    if (fs.existsSync(cyclesFilePath)) {
        const fileData = fs.readFileSync(cyclesFilePath, 'utf-8');
        cycles = JSON.parse(fileData);
    }

    if (fs.existsSync(userCycleInfoFilePath)) {
        const fileData = fs.readFileSync(userCycleInfoFilePath, 'utf-8');
        userCycleInfos = JSON.parse(fileData);
    }

    const userCycles = cycles.filter(cycle => cycle.userId === userId && cycle.dateEnd);

    if (userCycles.length === 0) {
        return res.status(400).json({ message: "No completed cycles found for this user" });
    }

    const avgCycleDays = userCycles.reduce((acc, cycle) => acc + (new Date(cycle.dateEnd).getTime() - new Date(cycle.dateStart).getTime()) / (1000 * 3600 * 24), 0) / userCycles.length;

    const avgPeriodDays = userCycles.reduce((acc, cycle) => acc + (new Date(cycle.dateEnd).getTime() - new Date(cycle.dateStart).getTime()) / (1000 * 3600 * 24), 0) / userCycles.length;

    const userCycleInfoIndex = userCycleInfos.findIndex(info => info.userId === userId);

    if (userCycleInfoIndex !== -1) {
        userCycleInfos[userCycleInfoIndex].avgCycleDays = avgCycleDays;
        userCycleInfos[userCycleInfoIndex].avgPeriodDays = avgPeriodDays;

        fs.writeFileSync(userCycleInfoFilePath, JSON.stringify(userCycleInfos, null, 2));
    }

    return res.status(200).json({ message: "Averages recalculated successfully" });
}
