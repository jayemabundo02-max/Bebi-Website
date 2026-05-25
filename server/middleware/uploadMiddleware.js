import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadRoot = path.resolve(__dirname, "..", "uploads");

const allowedMimeTypes = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  audio: ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/mp4", "audio/aac"]
};

const makeUploadPath = (type) => {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const folder = path.join(uploadRoot, type, year, month);

  fs.mkdirSync(folder, { recursive: true });
  return folder;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = file.mimetype.startsWith("audio/") ? "music" : req.uploadType || "gallery";
    cb(null, makeUploadPath(type));
  },
  filename: (req, file, cb) => {
    const safeOriginalName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/-+/g, "-");
    cb(null, `${Date.now()}-${safeOriginalName}`);
  }
});

const fileFilter = (req, file, cb) => {
  const accepted = [...allowedMimeTypes.image, ...allowedMimeTypes.audio];

  if (!accepted.includes(file.mimetype)) {
    return cb(new Error("Unsupported file type. Upload images or audio files only."));
  }

  return cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

export const setUploadType = (type) => (req, res, next) => {
  req.uploadType = type;
  next();
};

export const toPublicFileUrl = (file) => {
  if (!file) {
    return null;
  }

  const relativePath = path.relative(uploadRoot, file.path).replace(/\\/g, "/");
  return `/uploads/${relativePath}`;
};
