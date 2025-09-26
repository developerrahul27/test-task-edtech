import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description?: string;
  status: "draft" | "active" | "completed";
  dueDate?: Date | null;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["draft", "active", "completed"],
      default: "draft",
    },
    dueDate: { type: Date, default: null },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
