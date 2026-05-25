import { getMonthKey } from "../utils/dateUtils.js";

import mongoose from "mongoose";
import Gallery from "../models/Gallery.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { toPublicFileUrl } from "../middleware/uploadMiddleware.js";
import { createNotification } from "../services/notificationService.js";

export const getGallery = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.monthKey) {
    query.monthKey = req.query.monthKey;
  }

  const gallery = await Gallery.find(query).sort({ uploadDate: -1 }).limit(120);
  res.json({ gallery });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Image file is required.");
  }

  const item = await Gallery.create({
    title: req.body.title,
    caption: req.body.caption,
    imageUrl: toPublicFileUrl(req.file),
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    userId: req.user?.id || "private-archive",
    monthKey: req.body.monthKey || getMonthKey(),
    relationshipDate: req.body.relationshipDate || new Date(),
    uploadedBy: req.body.uploadedBy || req.user?.displayName || "Bebi"
  });

  await createNotification({
    title: "New photo uploaded",
    message: `${item.title} was added to the gallery.`,
    type: "gallery",
    metadata: { galleryId: String(item._id) }
  });

  res.status(201).json({ item });
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid gallery item id.");
  }

  const updates = {
    title: req.body.title,
    caption: req.body.caption,
    monthKey: req.body.monthKey,
    relationshipDate: req.body.relationshipDate
  };

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

  const item = await Gallery.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });

  if (!item) {
    res.status(404);
    throw new Error("Gallery item not found.");
  }

  res.json({ item });
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid gallery item id.");
  }

  const item = await Gallery.findByIdAndDelete(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Gallery item not found.");
  }

  res.json({ message: "Gallery item deleted." });
});
