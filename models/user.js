import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      
    },
    password: String,
    role: {
      type: String,
      default: "user",
    },
    provider: {
      type: String,
      default: "email",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("users", userSchema)