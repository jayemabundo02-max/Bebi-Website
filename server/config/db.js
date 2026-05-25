import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGO_URI is not configured. API routes that use MongoDB will fail fast.");
    return false;
  }

  await mongoose.connect(mongoUri, {
    autoIndex: process.env.NODE_ENV !== "production"
  });

  console.log(`MongoDB connected: ${mongoose.connection.name}`);
  return true;
};
