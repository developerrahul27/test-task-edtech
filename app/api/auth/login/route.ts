import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "@/models/User";
import { signToken } from "@/lib/auth";
import { connect } from "@/lib/mongodb";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    await connect();

    const body = await req.json();
    let parsed;
    try {
      parsed = loginSchema.parse(body);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return new Response(
          JSON.stringify({
            error: "Validation failed",
            issues: err.issues.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            })),
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      throw err;
    }

    const { email, password } = parsed;
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = signToken({ userId: user._id.toString() });
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          bio: user.bio,
          dob: user.dob,
          gender: user.gender,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
