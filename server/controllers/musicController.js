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
    query.favorite = parseFavorite(req.query.favorite);
  }

  const songs = await Song.find(query).sort({ favorite: -1, uploadedAt: -1 }).limit(100);
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
    userId: req.user?.id || "private-archive",
    favorite: parseFavorite(req.body.favorite ?? req.body.isFavorite),
    monthKey: req.body.monthKey || getMonthKey(),
    relationshipDate: req.body.relationshipDate || new Date(),
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
    favorite: req.body.favorite === undefined ? undefined : parseFavorite(req.body.favorite)
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
