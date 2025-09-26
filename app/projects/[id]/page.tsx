import { getCurrentUser } from "@/lib/auth";
import { connect } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { redirect, notFound } from "next/navigation";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";

interface ProjectData {
  _id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

async function getProject(id: string): Promise<ProjectData | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      redirect("/login");
    }

    await connect();
    const project = await Project.findOne({ _id: id, owner: user._id }).lean();
    
    if (!project) {
      return null;
    }

    // Cast the project to the correct type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedProject = project as any;

    return {
      _id: typedProject._id.toString(),
      title: typedProject.title,
      description: typedProject.description || "",
      status: typedProject.status,
      dueDate: typedProject.dueDate?.toISOString(),
      createdAt: typedProject.createdAt.toISOString(),
      updatedAt: typedProject.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = await params
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <ProjectDetailsClient initialProject={project} />
    </div>
  );
}
