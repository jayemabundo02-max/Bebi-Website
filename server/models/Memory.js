import mongoose from "mongoose";
import { getMonthKey } from "../utils/monthKey.js";

const MemorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 140,
      required: true
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 1200,
      required: true
    },
    imageUrl: {
      type: String,
      default: ""
    },
    date: {
      type: Date,
      required: true
    },
    monthKey: {
      type: String,
      required: true
    },
    milestone: {
      type: Boolean,
      default: false
    },
    tags: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

MemorySchema.pre("validate", function setMonthKey(next) {
  if (this.date) {
    this.monthKey = getMonthKey(this.date);
  }
  next();
});

MemorySchema.index({ date: -1 });
MemorySchema.index({ monthKey: 1, date: -1 });
MemorySchema.index({ milestone: 1, date: -1 });

export default mongoose.model("Memory", MemorySchema);
