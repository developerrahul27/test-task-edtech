import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { User } from "@/models/User";
import { Project } from "@/models/Project";
import { connect } from "@/lib/mongodb";
import { z } from "zod";
import { Gender } from "@/types/user";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Gender is required" }),
  }),
});

// GET - Fetch user profile
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect();
    const userProfile = await User.findById(user._id).select("-password").lean();
    
    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: userProfile });
  } catch (error: unknown) {
    console.error("Profile fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch profile", message: errorMessage },
      { status: 500 }
    );
  }
}

// PATCH - Update user profile
export async function PATCH(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    let parsed;
    
    try {
      parsed = updateProfileSchema.parse(body);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: "Validation failed",
            issues: err.issues.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }
      throw err;
    }

    await connect();
    
    // Check if user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name: parsed.name,
        bio: parsed.bio || null,
        dob: new Date(parsed.dob),
        gender: parsed.gender,
      },
      { new: true, select: "-password" }
    );

    return NextResponse.json({ user: updatedUser });
  } catch (error: unknown) {
    console.error("Profile update error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update profile", message: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete user account and all associated data
export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect();
    
    // Check if user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete all user's projects first
    await Project.deleteMany({ owner: user._id });
    
    // Delete the user account
    await User.findByIdAndDelete(user._id);

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error: unknown) {
    console.error("Account deletion error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to delete account", message: errorMessage },
      { status: 500 }
    );
  }
}
