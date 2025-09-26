import mongoose, { Schema, Document } from "mongoose";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  bio?: string;
  dob: Date;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    bio: { type: String, maxlength: 500 },
    dob: { type: Date, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
