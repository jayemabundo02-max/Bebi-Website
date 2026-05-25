import express from "express";
import { createMemory, deleteMemory, getMemories } from "../controllers/memoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getMemories).post(uploadImage, createMemory);
router.route("/:id").delete(deleteMemory);

export default router;
