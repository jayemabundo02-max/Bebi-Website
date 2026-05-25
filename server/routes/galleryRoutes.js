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
