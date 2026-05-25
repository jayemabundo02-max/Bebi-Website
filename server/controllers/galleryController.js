import { getPublicUploadUrl } from "../middleware/uploadMiddleware.js";
import Gallery from "../models/Gallery.js";
import { createAndDispatchNotification } from "../services/notificationService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assert } from "../utils/httpError.js";

const getPagination = (query) => {
  const limit = Math.min(Number(query.limit) || 30, 80);
  const page = Math.max(Number(query.page) || 1, 1);
  return { limit, page, skip: (page - 1) * limit };
};

export const getGallery = asyncHandler(async (req, res) => {
  const { limit, page, skip } = getPagination(req.query);
  const filter = req.query.monthKey ? { monthKey: req.query.monthKey } : {};

  const [items, total] = await Promise.all([
    Gallery.find(filter).sort({ uploadDate: -1 }).skip(skip).limit(limit).lean(),
    Gallery.countDocuments(filter)
  ]);

  res.json({ data: items, meta: { limit, page, total } });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  assert(req.body.title, 400, "Photo title is required.");
  assert(req.file, 400, "Image file is required.");

  const item = await Gallery.create({
    caption: req.body.caption || "",
    imageUrl: getPublicUploadUrl(req.file),
    title: req.body.title,
    uploadedBy: req.user?.displayName || "Bebi"
  });

  await createAndDispatchNotification({
    body: `${item.title} was added to the gallery.`,
    metadata: { galleryId: item._id },
    title: "New photo uploaded",
    type: "gallery"
  });

  res.status(201).json({ data: item });
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  assert(item, 404, "Gallery item not found.");

  res.json({ data: { id: req.params.id } });
});
import mongoose from "mongoose";
import Gallery from "../models/Gallery.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { toPublicFileUrl } from "../middleware/uploadMiddleware.js";
import { createNotification } from "../services/notificationService.js";
import { getMonthKey } from "../utils/dateUtils.js";

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
    monthKey: req.body.monthKey || getMonthKey(),
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
    monthKey: req.body.monthKey
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
