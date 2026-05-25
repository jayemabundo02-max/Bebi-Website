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
import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140
    },
    caption: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000
    },
    imageUrl: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      required: true,
      index: true
    },
    monthKey: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}$/, "monthKey must use YYYY-MM format."]
    },
    milestoneType: {
      type: String,
      enum: ["first", "trip", "date", "celebration", "promise", "ordinary", "other"],
      default: "ordinary",
      index: true
    },
    createdBy: {
      type: String,
      trim: true,
      default: "Bebi"
    }
  },
  { timestamps: true }
);

memorySchema.index({ date: -1 });
memorySchema.index({ monthKey: 1, date: -1 });
memorySchema.index({ milestoneType: 1, date: -1 });
memorySchema.index({ title: "text", caption: "text" });

export default mongoose.model("Memory", memorySchema);
