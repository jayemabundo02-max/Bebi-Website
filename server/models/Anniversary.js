import mongoose from "mongoose";

const anniversarySchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      enum: ["monthsary", "anniversary"],
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1200
    },
    date: {
      type: Date,
      required: true,
      index: true
    },
    yearCount: {
      type: Number,
      min: 0
    },
    monthCount: {
      type: Number,
      min: 0
    }
  },
  { timestamps: true }
);

anniversarySchema.index({ kind: 1, date: -1 });

export default mongoose.model("Anniversary", anniversarySchema);
