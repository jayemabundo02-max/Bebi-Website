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
    relationshipDate: {
      type: Date,
      required: true,
      index: true
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      default: "private-archive",
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

timelineSchema.index({ userId: 1, eventDate: -1 });
timelineSchema.index({ userId: 1, monthKey: 1, eventDate: -1 });
timelineSchema.index({ type: 1, eventDate: -1 });
timelineSchema.index({ relationshipDate: -1 });

export default mongoose.model("TimelineEvent", timelineSchema);
