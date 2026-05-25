import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import anniversaryRoutes from "./routes/anniversaryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import musicRoutes from "./routes/musicRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { startSchedulers } from "./services/schedulerService.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = new Set([
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be configured in production.");
}

const databaseReady = connectDB();

if (process.env.NODE_ENV === "production") {
  await databaseReady;
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS."));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "bebi-website-api",
    time: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", musicRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/anniversary", anniversaryRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Bebi Website API running on http://localhost:${port}`);
  startSchedulers();
});
