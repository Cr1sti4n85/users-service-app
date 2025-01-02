import mongoose from "mongoose";
import { loadEnvFile } from "process";

loadEnvFile();

const mongoUri: string = process.env.MONGO_URI as string;

//IIFE to connect to MongoDB
export default (async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
})();
