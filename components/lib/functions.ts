/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";

const NEXT_API_ROUTE_CYCLE = '';

/*async function getCurrentCycle(userId: string | string[] | undefined) {
  const res = await fetch(`${NEXT_API_ROUTE_CYCLE}?userId=${userId}`);

  let recentCycle = await res.json();
  if (recentCycle.length > 0 && !recentCycle[0].date_end) {
    return recentCycle[0];
  } else {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  const currentCycle = await getCurrentCycle(userId);

  if (currentCycle) {
    res.status(200).json({ inPeriod: true, cycle: currentCycle });
  } else {
    res.status(200).json({ inPeriod: false });
  }
}*/

async function getAverageCycleDuration(userId: string | string[] | undefined) {
  const res = await fetch(`${NEXT_API_ROUTE_CYCLE}?userId=${userId}`);
  const cycles = await res.json();

  if (cycles.length === 0) {
    return 28;
  } else {
    const totalDays = cycles.reduce((acc: number, cycle: { date_end: string | number | Date; date_start: string | number | Date; }) => {
      // @ts-ignore
      const duration = (new Date(cycle.date_end) - new Date(cycle.date_start)) / (1000 * 3600 * 24);
      return acc + duration;
    }, 0);
    return totalDays / cycles.length;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  const averageDuration = await getAverageCycleDuration(userId);

  res.status(200).json({ averageCycleDuration: averageDuration });
}
