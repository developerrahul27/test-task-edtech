"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, Loader2, Check } from "lucide-react";

interface AISuggestionsProps {
  projectTitle: string;
  projectDescription?: string;
  onApplySuggestion: (suggestion: {
    description?: string;
    status?: string;
    dueDate?: string;
  }) => void;
}

interface Suggestion {
  suggestedDescription: string;
  suggestedStatus: "draft" | "active" | "completed";
  statusReasoning: string;
  suggestedDueDate: string | null;
  dueDateReasoning: string | null;
  nextSteps: string[];
}

export default function AISuggestions({ 
  projectTitle, 
  projectDescription, 
  onApplySuggestion 
}: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());

  const getSuggestions = async () => {
    if (!projectTitle.trim()) {
      setError("Please enter a project title first");
      return;
    }

    setLoading(true);
    setError("");
    setSuggestions(null);

    try {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectTitle: projectTitle.trim(),
          projectDescription: projectDescription?.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to get suggestions");
        return;
      }

      setSuggestions(data.suggestions);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (type: string, value: string) => {
    onApplySuggestion({ [type]: value });
    setAppliedSuggestions(prev => new Set(prev).add(type));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "secondary";
      case "active": return "default";
      case "completed": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={getSuggestions}
          disabled={loading || !projectTitle.trim()}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {loading ? "Getting AI Suggestions..." : "Get AI Suggestions"}
        </Button>
        <span className="text-xs text-gray-500">
          Powered by AI to enhance your project
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {suggestions && (
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-gray-900">AI Suggestions</h3>
          </div>

          {/* Description Suggestion */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Enhanced Description</h4>
              {appliedSuggestions.has("description") && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </div>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              {suggestions.suggestedDescription}
            </p>
            {!appliedSuggestions.has("description") && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => applySuggestion("description", suggestions.suggestedDescription)}
                className="text-xs"
              >
                Apply Description
              </Button>
            )}
          </div>

          {/* Status Suggestion */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Suggested Status</h4>
              {appliedSuggestions.has("status") && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getStatusColor(suggestions.suggestedStatus)}>
                {suggestions.suggestedStatus}
              </Badge>
              <span className="text-xs text-gray-500">
                {suggestions.statusReasoning}
              </span>
            </div>
            {!appliedSuggestions.has("status") && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => applySuggestion("status", suggestions.suggestedStatus)}
                className="text-xs"
              >
                Apply Status
              </Button>
            )}
          </div>

          {/* Due Date Suggestion */}
          {suggestions.suggestedDueDate && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Suggested Due Date</h4>
                {appliedSuggestions.has("dueDate") && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {new Date(suggestions.suggestedDueDate).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-500">
                  {suggestions.dueDateReasoning}
                </span>
              </div>
              {!appliedSuggestions.has("dueDate") && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => applySuggestion("dueDate", suggestions.suggestedDueDate || "")}
                  className="text-xs"
                >
                  Apply Due Date
                </Button>
              )}
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Suggested Next Steps</h4>
            <ul className="space-y-1">
              {suggestions.nextSteps.map((step, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-blue-600 font-medium">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
}
