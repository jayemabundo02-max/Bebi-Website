import mongoose from "mongoose";
import { getMonthKey } from "../utils/monthKey.js";

const MessageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 140,
      required: true
    },
    body: {
      type: String,
      trim: true,
      maxlength: 12000,
      required: true
    },
    authorName: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "Bebi"
    },
    monthKey: {
      type: String,
      default: () => getMonthKey()
    },
    isPinned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ monthKey: 1, createdAt: -1 });
MessageSchema.index({ isPinned: 1, createdAt: -1 });

export default mongoose.model("Message", MessageSchema);
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
    monthKey: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}$/, "monthKey must use YYYY-MM format."]
    },
    isPinned: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: -1 });
messageSchema.index({ monthKey: 1, createdAt: -1 });
messageSchema.index({ isPinned: 1, createdAt: -1 });
messageSchema.index({ title: "text", body: "text" });

export default mongoose.model("Message", messageSchema);
