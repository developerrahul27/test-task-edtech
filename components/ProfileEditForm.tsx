"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// Removed unused Label import
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Save, X, Trash2, Calendar, Mail, User as UserIcon, Clock } from "lucide-react";
import { Gender } from "@/types/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
// Removed AlertDialog import - using simple modal instead
import { BubbleLoader } from "@/components/ui/bubble-loader";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  dob: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileEditFormProps {
  user: UserProfile;
  onUserUpdate?: (updatedUser: UserProfile) => void;
}

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  dob: z.string().nonempty("Date of birth is required"),
  gender: z.nativeEnum(Gender, { message: "Gender is required" }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileEditForm({ user, onUserUpdate }: ProfileEditFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
      gender: (user?.gender as Gender) || Gender.Male,
    },
    mode: "onChange",
  });

  // Initialize form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        bio: user.bio || "",
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
        gender: (user.gender as Gender) || Gender.Male,
      });
    }
  }, [user, form]);

  const calculateAge = (dobString: string) => {
    if (!dobString) return "N/A";
    const dob = new Date(dobString);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const handleUpdateProfile = async (values: ProfileFormValues) => {
    setIsLoading(true);
    setError(null);
    
    console.log("Submitting profile update:", values); // Debug log
    
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      console.log("API response status:", res.status); // Debug log
      
      const data = await res.json();
      console.log("API response data:", data); // Debug log
      
      if (!res.ok) {
        const errorMessage = data.error || "Failed to update profile";
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }
      
      // Update the form with the new data
      form.reset({
        name: data.user.name,
        bio: data.user.bio || "",
        dob: data.user.dob ? new Date(data.user.dob).toISOString().split('T')[0] : "",
        gender: data.user.gender as Gender,
      });
      
      onUserUpdate?.(data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error); // Debug log
      const errorMessage = "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to delete account");
        toast.error(data.error || "Failed to delete account");
        return;
      }
      toast.success("Account deleted successfully!");
      router.push("/");
    } catch {
      setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl animate-slide-down">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-4">
        <UserIcon className="h-16 w-16 text-gray-500 dark:text-gray-400" />
        <div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
          <p className="text-gray-600 dark:text-gray-400 flex items-center">
            <Mail className="h-4 w-4 mr-1" /> {user.email}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={(e) => {
          console.log("Form submitted"); // Debug log
          form.handleSubmit(handleUpdateProfile)(e);
        }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      {...field}
                      disabled={!isEditing || isLoading}
                      className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="dark:text-gray-200">Email</FormLabel>
              <Input
                value={user.email}
                disabled
                className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              />
            </FormItem>
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      disabled={!isEditing || isLoading}
                      className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!isEditing || isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                      <SelectItem value={Gender.Male}>Male</SelectItem>
                      <SelectItem value={Gender.Female}>Female</SelectItem>
                      <SelectItem value={Gender.Other}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about yourself..."
                    {...field}
                    disabled={!isEditing || isLoading}
                    rows={4}
                    className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditing && (
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  form.reset({
                    name: user.name || "",
                    bio: user.bio || "",
                    dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
                    gender: (user.gender as Gender) || Gender.Male,
                  });
                  setError(null);
                }}
                disabled={isLoading}
                className="dark:text-gray-200 hover:scale-105 transition-all duration-200"
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <BubbleLoader size="sm" color="white" />
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>

      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" /> Member Since:{" "}
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
        </p>
        <p className="flex items-center">
          <Clock className="h-4 w-4 mr-2" /> Last Updated:{" "}
          {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "N/A"}
        </p>
        <p className="flex items-center">
          <UserIcon className="h-4 w-4 mr-2" /> Age: {calculateAge(user.dob)}
        </p>
      </div>

      <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 p-4 mt-8">
        <div className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
          Danger Zone
        </div>
        <div className="text-red-600 dark:text-red-400 mb-4">
          Deleting your account is irreversible. All your projects and data will be permanently removed.
        </div>
        <Button 
          variant="destructive" 
          disabled={isLoading}
          onClick={() => setShowDeleteConfirm(true)}
          className="hover:scale-105 transition-all duration-200"
        >
          {isLoading ? (
            <BubbleLoader size="sm" color="white" />
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Account
            </>
          )}
        </Button>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full space-y-6 animate-scale-in">
            <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">Confirm Account Deletion</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Are you absolutely sure you want to delete your account? This action is irreversible and will
              permanently remove all your projects and data.
            </p>
            <div className="flex gap-4">
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Deleting..." : "Yes, Delete Account"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="flex justify-end">
              <Button 
                onClick={() => {
                  console.log("Edit button clicked"); // Debug log
                  setIsEditing(true);
                  // Reset form to current user data when entering edit mode
                  form.reset({
                    name: user.name || "",
                    bio: user.bio || "",
                    dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
                    gender: (user.gender as Gender) || Gender.Male,
                  });
                }} 
                className="bg-gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
        </div>
      )}
    </div>
  );
}
