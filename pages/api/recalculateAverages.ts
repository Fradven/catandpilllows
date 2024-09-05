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

    // Filter out cycles for the user and sort them by start date
    const userCycles = cycles
        .filter(cycle => cycle.userId === userId && cycle.dateEnd)
        .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());

    if (userCycles.length === 0) {
        return res.status(400).json({ message: "No completed cycles found for this user" });
    }

    // Calculate the average days between end of one cycle and start of the next cycle
    let totalCycleDays = 0;
    for (let i = 0; i < userCycles.length - 1; i++) {
        const endDate = new Date(userCycles[i].dateEnd).getTime();
        const nextStartDate = new Date(userCycles[i + 1].dateStart).getTime();
        totalCycleDays += (nextStartDate - endDate) / (1000 * 3600 * 24);
    }
    const avgCycleDays = totalCycleDays / (userCycles.length - 1);

    // Calculate the average period days (dateEnd - dateStart for each cycle)
    const avgPeriodDays = userCycles.reduce((acc, cycle) => {
        const periodDays = (new Date(cycle.dateEnd).getTime() - new Date(cycle.dateStart).getTime()) / (1000 * 3600 * 24);
        return acc + periodDays;
    }, 0) / userCycles.length;

    const userCycleInfoIndex = userCycleInfos.findIndex(info => info.userId === userId);

    if (userCycleInfoIndex !== -1) {
        userCycleInfos[userCycleInfoIndex].avgCycleDays = Math.floor(avgCycleDays);
        userCycleInfos[userCycleInfoIndex].avgPeriodDays = Math.floor(avgPeriodDays);

        fs.writeFileSync(userCycleInfoFilePath, JSON.stringify(userCycleInfos, null, 2));
    }

    return res.status(200).json({ message: "Averages recalculated successfully" });
}
