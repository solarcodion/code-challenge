import mongoose, { Document, Schema } from "mongoose";

export interface IResource extends Document {
  name: string;
  description: string;
  category: string;
  status: "active" | "inactive" | "pending";
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IResource>("Resource", ResourceSchema);
