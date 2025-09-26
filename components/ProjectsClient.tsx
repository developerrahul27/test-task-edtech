"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Eye, Search, Filter } from "lucide-react";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsClientProps {
  initialProjects: Project[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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
      {/* Search and Filter Controls */}
      <Card className="p-4">
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

      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
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
          {filteredProjects.map((project) => (
            <Card key={project._id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{project.title}</h2>
                <Badge variant={getStatusColor(project.status)} className="ml-2 flex-shrink-0">
                  {project.status}
                </Badge>
              </div>
              
              <p className="text-gray-600 line-clamp-3">{project.description}</p>
              
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
              
              <Link href={`/projects/${project._id}`} className="block">
                <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
