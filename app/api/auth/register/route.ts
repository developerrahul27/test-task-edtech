import bcrypt from "bcryptjs";
import { z } from "zod";
import { Gender, User } from "@/models/User";
import { signToken } from "@/lib/auth";
import { connect } from "@/lib/mongodb";
import { cookies } from "next/headers";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2, "Name is required"),
  bio: z.string().max(500).optional(),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Gender is required" }),
  }),
});

export async function POST(req: Request) {
  try {
    await connect();

    const body = await req.json();
    let parsed;
    try {
      parsed = registerSchema.parse(body);
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

    const existing = await User.findOne({ email: parsed.email });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashed = await bcrypt.hash(parsed.password, 10);
    const user = await User.create({
      email: parsed.email,
      password: hashed,
      name: parsed.name,
      bio: parsed.bio,
      dob: new Date(parsed.dob),
      gender: parsed.gender,
    });

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
          dob: user.dob,
          gender: user.gender,
          bio: user.bio,
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
