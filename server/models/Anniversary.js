import mongoose from "mongoose";

const AnniversarySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["monthsary", "anniversary"],
      required: true
    },
    eventDate: {
      type: Date,
      required: true
    },
    title: {
      type: String,
      trim: true,
      maxlength: 160,
      required: true
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      required: true
    },
    yearCount: {
      type: Number,
      min: 0,
      default: 0
    },
    monthCount: {
      type: Number,
      min: 0,
      default: 0
    },
    processedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

AnniversarySchema.index({ eventDate: -1 });
AnniversarySchema.index({ type: 1, eventDate: 1 }, { unique: true });

export default mongoose.model("Anniversary", AnniversarySchema);
