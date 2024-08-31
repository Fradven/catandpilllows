import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import UserCycleInfos from '@/components/classes/UserCycleInfos';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const filePath = path.join(process.cwd(), 'data', 'user_cycle_info.json');
    let userCycleInfos: UserCycleInfos[] = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        userCycleInfos = JSON.parse(fileData);
    }

    let userCycleInfo = userCycleInfos.find((info) => info.userId === userId);

    if (!userCycleInfo) {
        userCycleInfo = new UserCycleInfos(
            userCycleInfos.length > 0 ? userCycleInfos[userCycleInfos.length - 1].id + 1 : 1,
            userId as string,
            28,
            5
        );

        userCycleInfos.push(userCycleInfo);
        fs.writeFileSync(filePath, JSON.stringify(userCycleInfos, null, 2));
    }

    return res.status(200).json(userCycleInfo);
}