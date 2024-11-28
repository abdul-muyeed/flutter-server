import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    resturantName: {
      type: String,
    },
    customerName: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0.00,
    },
    comment: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "Pending",
    },
    ownerId: {
      type: String,
    },
    customerId: {
      type: String,
    },
    meal: {
      type: String,
    },
    day: {
      type: String,
    },
    orderDate:{
      type: Date,
    },
    price:{
      type: Number,
    },
    quantity: {
      type: Number,
    }
   
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
