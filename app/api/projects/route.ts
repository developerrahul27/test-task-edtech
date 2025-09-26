import { NextRequest, NextResponse } from "next/server";
import { Project } from "@/models/Project";
import { getUserFromRequest } from "@/lib/auth";
import { z } from "zod";
import { connect } from "@/lib/mongodb";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "completed"]).optional(),
  dueDate: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const user = (await getUserFromRequest(req));
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connect();
  const projects = await Project.find({ owner: user._id })
    .sort({ updatedAt: -1 })
    .lean();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const user = (await getUserFromRequest(req));
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connect();
  const body = await req.json();
  const parsed = createSchema.parse(body);

  const project = await Project.create({
    title: parsed.title,
    description: parsed.description || null,
    status: parsed.status || "draft",
    dueDate: parsed.dueDate ? new Date(parsed.dueDate) : null,
    owner: user._id,
  });
  return NextResponse.json({ project });
}
