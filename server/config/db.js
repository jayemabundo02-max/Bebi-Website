import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGO_URI is not set. API routes that require MongoDB will return 503.");
    return false;
  }

  mongoose.set("strictQuery", true);

  try {
    const connection = await mongoose.connect(mongoUri, {
      autoIndex: process.env.NODE_ENV !== "production",
      serverSelectionTimeoutMS: 5000
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
    return false;
  }
};

export default connectDB;
