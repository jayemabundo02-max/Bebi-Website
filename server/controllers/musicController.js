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
import mongoose from "mongoose";
import Song from "../models/Song.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { toPublicFileUrl } from "../middleware/uploadMiddleware.js";
import { createNotification } from "../services/notificationService.js";
import { getMonthKey } from "../utils/dateUtils.js";

const parseFavorite = (value) => value === true || value === "true";

export const getSongs = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.monthKey) {
    query.monthKey = req.query.monthKey;
  }

  if (req.query.favorite !== undefined) {
    query.isFavorite = parseFavorite(req.query.favorite);
  }

  const songs = await Song.find(query).sort({ isFavorite: -1, uploadedAt: -1 }).limit(100);
  res.json({ songs });
});

export const createSong = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Audio file is required.");
  }

  const song = await Song.create({
    title: req.body.title,
    artist: req.body.artist,
    caption: req.body.caption,
    isFavorite: parseFavorite(req.body.isFavorite),
    monthKey: req.body.monthKey || getMonthKey(),
    fileUrl: toPublicFileUrl(req.file),
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    uploadedBy: req.body.uploadedBy || req.user?.displayName || "Bebi"
  });

  await createNotification({
    title: "New song uploaded",
    message: `${song.title} was added to your song archive.`,
    type: "song",
    metadata: { songId: String(song._id) }
  });

  res.status(201).json({ song });
});

export const updateSong = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid song id.");
  }

  const updates = {
    title: req.body.title,
    artist: req.body.artist,
    caption: req.body.caption,
    monthKey: req.body.monthKey,
    isFavorite: req.body.isFavorite === undefined ? undefined : parseFavorite(req.body.isFavorite)
  };

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

  const song = await Song.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });

  if (!song) {
    res.status(404);
    throw new Error("Song not found.");
  }

  res.json({ song });
});

export const deleteSong = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid song id.");
  }

  const song = await Song.findByIdAndDelete(req.params.id);

  if (!song) {
    res.status(404);
    throw new Error("Song not found.");
  }

  res.json({ message: "Song deleted." });
});
