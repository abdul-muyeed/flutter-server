import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    ownerId: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    provider: {
      type: String,
      default: "email",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("users", userSchema);
