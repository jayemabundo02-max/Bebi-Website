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
