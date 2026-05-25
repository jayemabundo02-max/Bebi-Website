import { HttpError } from "../utils/httpError.js";

const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export const loginRateLimit = (req, _res, next) => {
  const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const record = attempts.get(key) || { count: 0, firstAttemptAt: now };

  if (now - record.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: now });
    next();
    return;
  }

  if (record.count >= MAX_ATTEMPTS) {
    throw new HttpError(429, "Too many access attempts. Try again later.");
  }

  record.count += 1;
  attempts.set(key, record);
  next();
};
