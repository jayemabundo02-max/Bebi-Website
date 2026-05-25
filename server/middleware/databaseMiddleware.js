import mongoose from "mongoose";

export const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503);
    return next(new Error("MongoDB is not connected. Set MONGO_URI and start MongoDB."));
  }

  return next();
};
