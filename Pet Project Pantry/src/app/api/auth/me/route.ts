import mockUsers from "../login/mockUsers.json";
import { NextRequest, NextResponse } from "next/server";

const sessions: Record<string, string> = {};

export async function GET(req: NextRequest) {
  const token = req.cookies.get("dev-token")?.value;
  if (!token || !sessions[token]) return NextResponse.json(null);

  const user = mockUsers.find((u) => u.id === sessions[token]);
  return NextResponse.json(user || null);
}
