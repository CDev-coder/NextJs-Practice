// pages/api/cart/get.ts
import { NextApiRequest, NextApiResponse } from "next";

// Dummy store
const userCarts: Record<string, any[]> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  if (!userId || typeof userId !== "string")
    return res.status(400).json({ message: "Missing userId" });
  res.status(200).json(userCarts[userId] || []);
}
