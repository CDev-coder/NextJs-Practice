import mockUsers from "./mockUsers.json";
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory session store for dev
const sessions: Record<string, string> = {};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Create a fake session token
  const token = crypto.randomUUID();
  sessions[token] = user.id;

  const res = NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.addresses ?? null,
    paymentmethod: user.paymentMethod ?? null,
  });
  // Store token in a cookie (dev-only)
  res.cookies.set("dev-token", token, { path: "/" });
  return res;
}
