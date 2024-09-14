import mongoose from "mongoose";

export const connectDB = async () => {
    try{
         const con =  await mongoose.connect(process.env.MONGO_URL)
         console.log("mongodb connected");
         
    }
    catch(e){
        console.log("error connecting to mongodb:" + e.message);
    }
}