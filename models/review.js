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
    customerId: {
        type: String,
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
    },

},{
    timestamps: true
});

export const Review = mongoose.model("Review", reviewSchema);