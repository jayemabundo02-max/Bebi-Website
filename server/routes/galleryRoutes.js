import express from "express";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGallery,
  updateGalleryItem
} from "../controllers/galleryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireDatabase } from "../middleware/databaseMiddleware.js";
import { setUploadType, upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect, requireDatabase);

router
  .route("/")
  .get(getGallery)
  .post(setUploadType("gallery"), upload.single("image"), createGalleryItem);
router.route("/:id").patch(updateGalleryItem).delete(deleteGalleryItem);

export default router;
