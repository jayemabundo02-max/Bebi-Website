import express from "express";
import { createSong, deleteSong, getSongs } from "../controllers/musicController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadAudio } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getSongs).post(uploadAudio, createSong);
router.route("/:id").delete(deleteSong);

export default router;
import express from "express";
import {
  createSong,
  deleteSong,
  getSongs,
  updateSong
} from "../controllers/musicController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireDatabase } from "../middleware/databaseMiddleware.js";
import { setUploadType, upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect, requireDatabase);

router.route("/").get(getSongs).post(setUploadType("music"), upload.single("file"), createSong);
router.route("/:id").patch(updateSong).delete(deleteSong);

export default router;
