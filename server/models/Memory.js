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
    uploadType: {
      type: String,
      enum: ["memory"],
      default: "memory",
      index: true
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

memorySchema.index({ userId: 1, date: -1 });
memorySchema.index({ userId: 1, monthKey: 1, date: -1 });
memorySchema.index({ milestoneType: 1, date: -1 });
memorySchema.index({ uploadType: 1, createdAt: -1 });
memorySchema.index({ relationshipDate: -1 });
memorySchema.index({ title: "text", caption: "text" });

export default mongoose.model("Memory", memorySchema);
