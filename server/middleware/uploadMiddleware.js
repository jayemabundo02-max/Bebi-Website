import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { HttpError } from "../utils/httpError.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadRoot = path.resolve(__dirname, "..", "uploads");

const allowedMimeTypes = {
  audio: ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/ogg", "audio/mp4"],
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"]
};

const sanitizeFileName = (fileName) =>
  fileName
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const destination = path.join(uploadRoot, year, month);

    fs.mkdirSync(destination, { recursive: true });
    callback(null, destination);
  },
  filename: (_req, file, callback) => {
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${uniquePrefix}-${sanitizeFileName(file.originalname)}`);
  }
});

const createUploader = (kind) =>
  multer({
    storage,
    limits: {
      fileSize: kind === "audio" ? 30 * 1024 * 1024 : 8 * 1024 * 1024
    },
    fileFilter: (_req, file, callback) => {
      if (!allowedMimeTypes[kind].includes(file.mimetype)) {
        callback(new HttpError(400, `Invalid ${kind} file type.`));
        return;
      }

      callback(null, true);
    }
  });

export const uploadAudio = createUploader("audio").single("audio");
export const uploadImage = createUploader("image").single("image");

export const getPublicUploadUrl = (file) => {
  if (!file) return "";

  const relativePath = path.relative(uploadRoot, file.path).split(path.sep).join("/");
  return `/uploads/${relativePath}`;
};
