import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    type: {
      type: String,
      enum: ["song", "message", "gallery", "memory", "monthsary", "anniversary", "system"],
      default: "system",
      index: true
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      default: "private-archive",
      index: true
    },
    readBy: [
      {
        type: String,
        trim: true
      }
    ],
    metadata: {
      type: Map,
      of: String
    },
    scheduledFor: {
      type: Date,
      index: true
    },
    deliveredAt: {
      type: Date
    }
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, type: 1, createdAt: -1 });
notificationSchema.index({ scheduledFor: 1, deliveredAt: 1 });

export default mongoose.model("Notification", notificationSchema);
