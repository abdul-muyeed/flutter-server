import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    orderId: {
        type: String,
    },
    ownerId: {
        type: String,
    },
    resturantName: {
        type: String,
    },
    customerName: {
        type: String,
    },
    customerId: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0.00,
        min: 0,
        max: 5,
    },
    comment: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "Pending",
    },

},{
    timestamps: true
});

export const Review = mongoose.model("Review", reviewSchema);