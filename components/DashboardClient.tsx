"use client";

import { useState, useMemo } from "react";
import ProjectForm from "@/components/ProjectForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Trash2, Eye, Search, Filter } from "lucide-react";
import Link from "next/link";
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

interface DashboardClientProps {
  initialProjects: Project[];
}

export default function DashboardClient({ initialProjects }: DashboardClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  async function handleAddProject(title: string, description: string, status?: string, dueDate?: string) {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status, dueDate }),
      });

      if (res.ok) {
        const data = await res.json();
        setProjects(prev => [data.project, ...prev]);
        toast.success("Project created successfully!");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create project");
        toast.error(data.error || "Failed to create project");
      }
    } catch {
      setError("Something went wrong");
      toast.error("Something went wrong");
    }
  }

  async function handleDeleteProject(id: string) {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p._id !== id));
        toast.success("Project deleted successfully!");
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
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  return (
    <>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl animate-slide-down">
          {error}
        </div>
      )}

      {/* Project Form */}
      <Card className="glass-effect border-0 shadow-2xl p-8 space-y-6 animate-scale-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Project</h2>
          <p className="text-gray-600 dark:text-gray-300">Create a new project to get started</p>
        </div>
        <ProjectForm submitLabel="Add Project" onSubmit={handleAddProject} />
      </Card>

      {/* Search and Filter Controls */}
      {projects.length > 0 && (
        <Card className="glass-effect border-0 shadow-xl p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}

      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p>Create your first project to get started!</p>
          </div>
        </Card>
      ) : filteredProjects.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No projects match your search</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card key={project._id} className="group p-6 space-y-4 hover-lift glass-effect border-0 shadow-lg animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</h3>
                <Badge variant={getStatusColor(project.status)} className="ml-2 flex-shrink-0">
                  {project.status}
                </Badge>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>Created {formatDate(project.createdAt)}</span>
                </div>
                {project.dueDate && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Due {formatDate(project.dueDate)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Link href={`/projects/${project._id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full flex items-center gap-2 hover:scale-105 transition-all duration-200 border-gray-200 dark:border-gray-700">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProject(project._id)}
                  className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
