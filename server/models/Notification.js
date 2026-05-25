import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["song", "message", "gallery", "memory", "monthsary", "anniversary", "system"],
      required: true
    },
    title: {
      type: String,
      trim: true,
      maxlength: 160,
      required: true
    },
    body: {
      type: String,
      trim: true,
      maxlength: 800,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    recipientEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: ""
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

NotificationSchema.index({ isRead: 1, createdAt: -1 });
NotificationSchema.index({ type: 1, createdAt: -1 });

export default mongoose.model("Notification", NotificationSchema);
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

notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ scheduledFor: 1, deliveredAt: 1 });

export default mongoose.model("Notification", notificationSchema);
