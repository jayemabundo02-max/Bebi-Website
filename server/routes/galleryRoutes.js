import express from "express";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGallery
} from "../controllers/galleryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getGallery).post(uploadImage, createGalleryItem);
router.route("/:id").delete(deleteGalleryItem);

export default router;
