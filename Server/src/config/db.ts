

import mongoose from "mongoose";
import { _Config } from "./config"; 

const dbConnection = async () => {

  try {
    mongoose.connection.on("connected", () => {
      console.log("DB Connected successfully 🟢");
    });

    mongoose.connection.on("error", (err) => {
      console.log("DB connection error 🔥", err);
    });

    await mongoose.connect(_Config.MONGO_URI as string);
  } catch (error) {
    console.error("connection error 🔴", error);
    process.exit(1);
  }
};

export default dbConnection;
