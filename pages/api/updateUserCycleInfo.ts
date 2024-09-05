import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import UserCycleInfos from '@/components/classes/UserCycleInfos';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const updatedInfo: UserCycleInfos = req.body;

    if (!updatedInfo || !updatedInfo.userId) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const filePath = path.join(process.cwd(), 'data', 'user_cycle_info.json');
    let userCycleInfos: UserCycleInfos[] = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        userCycleInfos = JSON.parse(fileData);
    }

    const index = userCycleInfos.findIndex((info) => info.userId === updatedInfo.userId);
    if (index !== -1) {
        userCycleInfos[index] = updatedInfo;
        fs.writeFileSync(filePath, JSON.stringify(userCycleInfos, null, 2));
        return res.status(200).json({ message: "User cycle info updated successfully" });
    } else {
        return res.status(404).json({ message: "User cycle info not found" });
    }
}