import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140
    },
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 12000
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
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
    relationshipDate: {
      type: Date,
      default: Date.now,
      index: true
    },
    isPinned: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  { timestamps: true }
);

messageSchema.index({ userId: 1, createdAt: -1 });
messageSchema.index({ userId: 1, monthKey: 1, createdAt: -1 });
messageSchema.index({ isPinned: 1, createdAt: -1 });
messageSchema.index({ relationshipDate: -1 });
messageSchema.index({ title: "text", body: "text" });

export default mongoose.model("Message", messageSchema);
