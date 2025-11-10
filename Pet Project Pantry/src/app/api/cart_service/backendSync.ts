// pages/api/cart/sync.ts
import { NextApiRequest, NextApiResponse } from "next";
const userCarts: Record<string, any[]> = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, cart } = req.body;
  if (!userId || !cart)
    return res.status(400).json({ message: "Missing parameters" });

  userCarts[userId] = cart; // overwrite with merged cart
  res.status(200).json(cart);
}

///TO USE WHEN USER NEEDS TO SIGN IN.
/*
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

function LoginHandler({ userId }: { userId: string }) {
  const { mergeCartOnLogin } = useCart();

  useEffect(() => {
    if (userId) {
      mergeCartOnLogin(userId);
    }
  }, [userId, mergeCartOnLogin]);

  return null;
}

*/
