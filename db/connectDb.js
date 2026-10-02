import mongoose from "mongoose"

const connectDb = async() =>{
    if (mongoose.connection.readyState >=1) return;

    if(!process.env.MONGODB_URL){
        throw new Error("MONGODB_URL is not defiend in .env.local")
    }

    await mongoose.connect(process.env.MONGODB_URL);
}

export default connectDb;