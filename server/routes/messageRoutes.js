import { requireDatabase } from "../middleware/databaseMiddleware.js";

import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
  updateMessage
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, requireDatabase);

router.route("/").get(getMessages).post(createMessage);
router.route("/:id").patch(updateMessage).delete(deleteMessage);

export default router;
