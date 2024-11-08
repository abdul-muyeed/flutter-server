import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    ownerId: {
      type: String,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    rating: {
      type: Number,
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

export const Resturant = mongoose.model("Resturant", resturantSchema);
