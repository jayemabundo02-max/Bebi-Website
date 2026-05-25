import { getPublicUploadUrl } from "../middleware/uploadMiddleware.js";
import Song from "../models/Song.js";
import { createAndDispatchNotification } from "../services/notificationService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assert } from "../utils/httpError.js";

const getPagination = (query) => {
  const limit = Math.min(Number(query.limit) || 24, 60);
  const page = Math.max(Number(query.page) || 1, 1);
  return { limit, page, skip: (page - 1) * limit };
};

export const getSongs = asyncHandler(async (req, res) => {
  const { limit, page, skip } = getPagination(req.query);
  const filter = {};

  if (req.query.monthKey) filter.monthKey = req.query.monthKey;
  if (req.query.favorite === "true") filter.isFavorite = true;

  const [items, total] = await Promise.all([
    Song.find(filter).sort({ isFavorite: -1, uploadDate: -1 }).skip(skip).limit(limit).lean(),
    Song.countDocuments(filter)
  ]);

  res.json({ data: items, meta: { limit, page, total } });
});

export const createSong = asyncHandler(async (req, res) => {
  assert(req.body.title, 400, "Song title is required.");
  assert(req.file, 400, "Audio file is required.");

  const song = await Song.create({
    artist: req.body.artist || "",
    audioUrl: getPublicUploadUrl(req.file),
    caption: req.body.caption || "",
    isFavorite: req.body.isFavorite === "true",
    title: req.body.title,
    uploadedBy: req.user?.displayName || "Bebi"
  });

  await createAndDispatchNotification({
    body: `${song.title} was added to the song archive.`,
    metadata: { songId: song._id },
    title: "New song uploaded",
    type: "song"
  });

  res.status(201).json({ data: song });
});

export const deleteSong = asyncHandler(async (req, res) => {
  const song = await Song.findByIdAndDelete(req.params.id);
  assert(song, 404, "Song not found.");

  res.json({ data: { id: req.params.id } });
});
