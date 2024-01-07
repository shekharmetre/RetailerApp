import mongoose from "mongoose";

const MongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODBCONNECTION, {
    });
    console.log("Connection established to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

export default MongodbConnection;
