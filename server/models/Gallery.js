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
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    imageUrl: {
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
    uploadedBy: {
      type: String,
      trim: true,
      default: "Bebi"
    },
    uploadDate: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { timestamps: true }
);

gallerySchema.index({ monthKey: 1, uploadDate: -1 });
gallerySchema.index({ uploadDate: -1 });
gallerySchema.index({ title: "text", caption: "text" });

export default mongoose.model("Gallery", gallerySchema);
