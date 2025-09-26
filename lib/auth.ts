import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { IUser, User } from "@/models/User";
import { connect } from "./mongodb";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET not set");

export function signToken(payload: { userId: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}

export async function getUserFromRequest(req: NextRequest) {
  const cookie = req.cookies.get("token")?.value;
  if (!cookie) return null;
  try {
    const { userId } = verifyToken(cookie);
    await connect();
    const user = await User.findById(userId).select("-password").lean<IUser>();
    return user;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await connect();
    const user = await User.findById(decoded.userId).select("-password");
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch {
    return null;
  }
}
