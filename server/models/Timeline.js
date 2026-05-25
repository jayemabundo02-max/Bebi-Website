import mongoose from "mongoose";

const TimelineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 140,
      required: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1200,
      required: true
    },
    eventDate: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: ["anniversary", "monthsary", "memory", "milestone", "custom"],
      default: "custom"
    }
  },
  { timestamps: true }
);

TimelineSchema.index({ eventDate: -1 });
TimelineSchema.index({ type: 1, eventDate: -1 });

export default mongoose.model("Timeline", TimelineSchema);
import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000
    },
    eventDate: {
      type: Date,
      required: true,
      index: true
    },
    monthKey: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}$/, "monthKey must use YYYY-MM format."]
    },
    type: {
      type: String,
      enum: ["anniversary", "monthsary", "milestone", "memory", "custom"],
      default: "custom",
      index: true
    },
    icon: {
      type: String,
      trim: true,
      maxlength: 30
    },
    createdBy: {
      type: String,
      trim: true,
      default: "Bebi"
    }
  },
  { timestamps: true }
);

timelineSchema.index({ eventDate: -1 });
timelineSchema.index({ monthKey: 1, eventDate: -1 });
timelineSchema.index({ type: 1, eventDate: -1 });

export default mongoose.model("Timeline", timelineSchema);
