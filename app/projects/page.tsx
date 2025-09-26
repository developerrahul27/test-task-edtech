import { getCurrentUser } from "@/lib/auth";
import { connect } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { redirect } from "next/navigation";
import ProjectsClient from "@/components/ProjectsClient";

interface ProjectData {
  _id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

async function getProjects(): Promise<ProjectData[]> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      redirect("/login");
    }

    await connect();
    const projects = await Project.find({ owner: user._id })
      .sort({ updatedAt: -1 })
      .lean();
    
    return projects.map(project => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: (project._id as any).toString(),
      title: project.title,
      description: project.description || "",
      status: project.status,
      dueDate: project.dueDate?.toISOString(),
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <div className="text-sm text-gray-600">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </div>
      </div>

      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
