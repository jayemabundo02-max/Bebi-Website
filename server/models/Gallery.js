import mongoose from "mongoose";
import { getMonthKey } from "../utils/monthKey.js";

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 140,
      required: true
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 800,
      default: ""
    },
    imageUrl: {
      type: String,
      required: true
    },
    monthKey: {
      type: String,
      default: () => getMonthKey()
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

GallerySchema.index({ uploadDate: -1 });
GallerySchema.index({ monthKey: 1, uploadDate: -1 });

export default mongoose.model("Gallery", GallerySchema);
