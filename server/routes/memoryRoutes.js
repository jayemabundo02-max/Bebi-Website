import express from "express";
import { createMemory, deleteMemory, getMemories } from "../controllers/memoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getMemories).post(uploadImage, createMemory);
router.route("/:id").delete(deleteMemory);

export default router;
import express from "express";
import {
  createMemory,
  deleteMemory,
  getMemories,
  updateMemory
} from "../controllers/memoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireDatabase } from "../middleware/databaseMiddleware.js";
import { setUploadType, upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect, requireDatabase);

router
  .route("/")
  .get(getMemories)
  .post(setUploadType("memories"), upload.single("image"), createMemory);
router.route("/:id").patch(updateMemory).delete(deleteMemory);

export default router;
