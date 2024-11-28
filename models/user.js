import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photoUrl: {
      type: String,
      default: null,
    },
    ownerId: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    balance:{
      type: Number,
      default: 0.00,
    }
    
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("users", userSchema);
