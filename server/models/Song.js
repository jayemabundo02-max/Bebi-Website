import mongoose from "mongoose";
import { getMonthKey } from "../utils/monthKey.js";

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 140,
      required: true
    },
    artist: {
      type: String,
      trim: true,
      maxlength: 120,
      default: ""
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 800,
      default: ""
    },
    audioUrl: {
      type: String,
      required: true
    },
    monthKey: {
      type: String,
      default: () => getMonthKey()
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    uploadedBy: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "Bebi"
    }
  },
  { timestamps: true }
);

SongSchema.index({ monthKey: 1, uploadDate: -1 });
SongSchema.index({ isFavorite: 1, uploadDate: -1 });
SongSchema.index({ createdAt: -1 });

export default mongoose.model("Song", SongSchema);
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
    monthKey: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}$/, "monthKey must use YYYY-MM format."]
    },
    isFavorite: {
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

songSchema.index({ monthKey: 1, uploadedAt: -1 });
songSchema.index({ isFavorite: 1, uploadedAt: -1 });
songSchema.index({ title: "text", artist: "text", caption: "text" });

export default mongoose.model("Song", songSchema);
