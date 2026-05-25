import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { uploadRoot } from "./middleware/uploadMiddleware.js";
import anniversaryRoutes from "./routes/anniversaryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import musicRoutes from "./routes/musicRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import { startSchedulers } from "./services/schedulerService.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim());

fs.mkdirSync(uploadRoot, { recursive: true });

app.disable("x-powered-by");
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS."));
    }
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"), { fallthrough: false }));

app.get("/health", (_req, res) => {
  res.json({
    name: "Bebi Website API",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", musicRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/anniversary", anniversaryRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  if (process.env.DISABLE_SCHEDULERS !== "true") {
    startSchedulers();
  }

  app.listen(port, () => {
    console.log(`Bebi Website API listening on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
