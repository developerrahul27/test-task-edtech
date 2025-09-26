"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import AISuggestions from "./AISuggestions";

interface ProjectFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialStatus?: "draft" | "active" | "completed";
  initialDueDate?: string;
  submitLabel: string;
  onSubmit: (title: string, description: string, status?: string, dueDate?: string) => Promise<void>;
  onCancel?: () => void;
}

export default function ProjectForm({
  initialTitle = "",
  initialDescription = "",
  initialStatus = "draft",
  initialDueDate = "",
  submitLabel,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState<"draft" | "active" | "completed">(initialStatus);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onSubmit(title, description, status, dueDate);
      setTitle("");
      setDescription("");
      setStatus("draft");
      setDueDate("");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleApplySuggestion = (suggestion: {
    description?: string;
    status?: string;
    dueDate?: string;
  }) => {
    if (suggestion.description) {
      setDescription(suggestion.description);
    }
    if (suggestion.status) {
      setStatus(suggestion.status as "draft" | "active" | "completed");
    }
    if (suggestion.dueDate) {
      setDueDate(suggestion.dueDate);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* AI Suggestions */}
      {title.trim() && (
        <AISuggestions
          projectTitle={title}
          projectDescription={description}
          onApplySuggestion={handleApplySuggestion}
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(value: "draft" | "active" | "completed") => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date (Optional)</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : submitLabel}
        </Button>
        {onCancel && (
          <Button variant="outline" type="button" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
