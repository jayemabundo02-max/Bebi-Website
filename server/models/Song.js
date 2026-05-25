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
