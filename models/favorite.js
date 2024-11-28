import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    favorites: {
        type: [String],
    },

},{
    timestamps: true
});

export const Favorite = mongoose.model("Favorite", favoriteSchema);