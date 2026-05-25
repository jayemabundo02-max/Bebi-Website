import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";

let warnedAboutDevSecret = false;

export const getJwtSecret = () => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  if (!warnedAboutDevSecret) {
    warnedAboutDevSecret = true;
    console.warn("JWT_SECRET is not configured. Using a development-only fallback secret.");
  }

  return "development-secret-change-me";
};

export const protect = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new HttpError(401, "Authentication token is required.");
  }

  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, getJwtSecret());
    next();
  } catch {
    throw new HttpError(401, "Authentication token is invalid or expired.");
  }
};
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    res.status(401);
    return next(new Error("Authentication token is required."));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "development-only-bebi-secret");
    return next();
  } catch {
    res.status(401);
    return next(new Error("Invalid or expired authentication token."));
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    res.status(403);
    return next(new Error("Admin access is required."));
  }

  return next();
};
