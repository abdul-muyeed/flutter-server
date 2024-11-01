import mongoose from "mongoose";

export const MongoDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${con.connection.host} `);
    }catch(err){
        console.log("Error while connecting to MongoDB",err);
        
    }
}