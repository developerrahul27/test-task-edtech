"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectDetailsClientProps {
  initialProject: Project;
}

export default function ProjectDetailsClient({ initialProject }: ProjectDetailsClientProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project>(initialProject);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  async function handleDelete() {
    try {
      const res = await fetch(`/api/projects/${project._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted successfully!");
        router.push("/projects");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete project");
        toast.error(data.error || "Failed to delete project");
      }
    } catch {
      setError("Something went wrong");
      toast.error("Something went wrong");
    }
  }

  async function handleUpdate(title: string, description: string, status?: string, dueDate?: string) {
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status, dueDate }),
      });

      const data = await res.json();
      if (res.ok) {
        setProject(data.project);
        setEditMode(false);
        toast.success("Project updated successfully!");
      } else {
        setError(data.error || "Failed to update project");
        toast.error(data.error || "Failed to update project");
      }
    } catch {
      setError("Something went wrong");
      toast.error("Something went wrong");
    }
  }

  async function handleStatusChange(newStatus: "draft" | "active" | "completed") {
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        setProject(data.project);
        toast.success("Status updated successfully!");
      } else {
        setError(data.error || "Failed to update status");
        toast.error(data.error || "Failed to update status");
      }
    } catch {
      setError("Something went wrong");
      toast.error("Something went wrong");
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "draft": return "secondary";
      case "active": return "default";
      case "completed": return "outline";
      default: return "secondary";
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/projects")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {!editMode ? (
        <Card className="p-8 space-y-6">
          {/* Title and Status */}
          <div className="flex items-start justify-between">
            <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
            <Badge variant={getStatusColor(project.status)} className="text-sm px-3 py-1">
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Created</p>
                  <p className="text-gray-600">{formatDate(project.createdAt)}</p>
                </div>
              </div>
              
              {project.dueDate && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Due Date</p>
                    <p className="text-gray-600">{formatDate(project.dueDate)}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Last Updated</p>
                  <p className="text-gray-600">{formatDate(project.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Change Status</h3>
            <div className="flex gap-3">
              {(["draft", "active", "completed"] as const).map((status) => (
                <Button
                  key={status}
                  variant={project.status === status ? "default" : "outline"}
                  onClick={() => handleStatusChange(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-8">
          <ProjectForm
            initialTitle={project.title}
            initialDescription={project.description}
            submitLabel="Update Project"
            onSubmit={handleUpdate}
            onCancel={() => setEditMode(false)}
          />
        </Card>
      )}
    </>
  );
}
