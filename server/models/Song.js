import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    artist: {
      type: String,
      trim: true,
      maxlength: 120
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true
    },
    fileName: {
      type: String,
      trim: true
    },
    mimeType: {
      type: String,
      trim: true
    },
    size: {
      type: Number,
      min: 0
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
    uploadType: {
      type: String,
      enum: ["song"],
      default: "song",
      index: true
    },
    favorite: {
      type: Boolean,
      default: false,
      index: true
    },
    uploadedBy: {
      type: String,
      trim: true,
      default: "Bebi"
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { timestamps: true }
);

songSchema.index({ userId: 1, monthKey: 1, uploadedAt: -1 });
songSchema.index({ favorite: 1, uploadedAt: -1 });
songSchema.index({ uploadType: 1, createdAt: -1 });
songSchema.index({ relationshipDate: -1 });
songSchema.index({ title: "text", artist: "text", caption: "text" });

export default mongoose.model("Song", songSchema);
