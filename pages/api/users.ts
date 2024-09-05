import { NextApiRequest, NextApiResponse } from "next";
import { API_ROUTE_CYCLE } from "@/components/utils/contantes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (userId !== "string") {
    res.status(400).json({ error: "Invalid data" });
    return;
  }

  try {
    const address = await fetch(`${API_ROUTE_CYCLE}?userId=${userId}`);
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
