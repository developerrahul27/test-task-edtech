import { getCurrentUser } from "@/lib/auth";
import { connect } from "@/lib/mongodb";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import ProfileEditForm from "@/components/ProfileEditForm";

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

async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return null;
    }

    await connect();
    const fullUser = await User.findById(user._id).select("-password");

    if (!fullUser) {
      return null;
    }

    return {
      _id: fullUser._id.toString(),
      name: fullUser.name,
      email: fullUser.email,
      bio: fullUser.bio,
      dob: fullUser.dob.toISOString(),
      gender: fullUser.gender,
      createdAt: fullUser.createdAt.toISOString(),
      updatedAt: fullUser.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const user = await getUserProfile();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen">
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
     
        <div className="relative animate-slide-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Profile
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="glass-effect border-0 shadow-2xl p-8 rounded-2xl animate-scale-in">
          <ProfileEditForm user={user} />
        </div>
      </div>
    </div>
  );
}
