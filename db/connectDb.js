// import mongoose from "mongoose"

// const connectDb = async() =>{
//     if (mongoose.connection.readyState >=1) return;

//     if(!process.env.MONGODB_URL){
//         throw new Error("MONGODB_URL is not defiend in .env.local")
//     }

//     await mongoose.connect(process.env.MONGODB_URL);
// }

// export default connectDb;

import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) return;

  console.log("MONGODB_URL exists:", !!process.env.MONGODB_URL);
  console.log(
    "MONGODB_URL starts with:",
    process.env.MONGODB_URL?.slice(0, 20)
  );

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined");
  }

  await mongoose.connect(process.env.MONGODB_URL);

  console.log("MongoDB connected successfully");
};

export default connectDb;