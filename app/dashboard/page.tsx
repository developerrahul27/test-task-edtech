import { getCurrentUser } from "@/lib/auth";
import { connect } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

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

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <div className="relative min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-4 space-y-8">
        {/* Header Section */}
        <div className="animate-slide-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Manage and track your projects with ease
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                {projects.length} project{projects.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        <DashboardClient initialProjects={projects} />
      </div>
    </div>
  );
}

