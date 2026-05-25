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
      enum: ["gallery"],
      default: "gallery",
      index: true
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

gallerySchema.index({ userId: 1, monthKey: 1, uploadDate: -1 });
gallerySchema.index({ uploadType: 1, uploadDate: -1 });
gallerySchema.index({ relationshipDate: -1 });
gallerySchema.index({ createdAt: -1 });
gallerySchema.index({ title: "text", caption: "text" });

export default mongoose.model("Gallery", gallerySchema);
