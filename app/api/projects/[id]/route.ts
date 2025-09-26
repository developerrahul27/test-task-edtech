import { NextRequest, NextResponse } from 'next/server';
import { IProject, Project } from '@/models/Project';
import { getUserFromRequest } from '@/lib/auth';
import { z } from 'zod';
import { connect } from '@/lib/mongodb';

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'active', 'completed']).optional(),
  dueDate: z.string().optional()
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await connect();
  const project = await Project.findById(id).lean<IProject>();
  // Fix type error by asserting user and project types
  if (
    !project ||
    project.owner.toString() !== (user as { _id: string })._id.toString()
  ) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await connect();
  const project = await Project.findById(id);
  if (
    !project ||
    project.owner.toString() !== (user as { _id: string })._id.toString()
  ) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await req.json();
  const parsed = updateSchema.parse(body);

  if (parsed.dueDate !== undefined) {
    (parsed as unknown as { dueDate: Date | null }).dueDate = parsed.dueDate
      ? new Date(parsed.dueDate)
      : null;
  }

  Object.assign(project, parsed);
  await project.save();

  return NextResponse.json({ project });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await connect();
  const project = await Project.findById(id);
  if (
    !project ||
    project.owner.toString() !== (user as { _id: string })._id.toString()
  ) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await project.deleteOne();
  return NextResponse.json({ ok: true });
}
