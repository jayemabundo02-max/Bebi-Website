import express from "express";
import { getEvents, getStatus } from "../controllers/anniversaryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getEvents);
router.get("/status", getStatus);

export default router;
