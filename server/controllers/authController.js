import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assert, HttpError } from "../utils/httpError.js";

const verifyAccessCode = async (accessCode) => {
  if (process.env.ACCESS_CODE_HASH) {
    return bcrypt.compare(accessCode, process.env.ACCESS_CODE_HASH);
  }

  const fallbackCode = process.env.SPECIAL_ACCESS_CODE || "1208";
  return accessCode === fallbackCode;
};

const buildProfile = () => ({
  displayName: process.env.ARCHIVE_DISPLAY_NAME || "Bebi Archive",
  email: process.env.ADMIN_EMAIL || "private@bebi.local",
  role: "admin"
});

export const login = asyncHandler(async (req, res) => {
  const { accessCode } = req.body;
  assert(typeof accessCode === "string" && accessCode.trim().length > 0, 400, "Access code is required.");

  const isValid = await verifyAccessCode(accessCode.trim());
  if (!isValid) {
    throw new HttpError(401, "Invalid access code.");
  }

  const profile = buildProfile();
  const token = jwt.sign(profile, getJwtSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

  res.json({ profile, token });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ profile: req.user });
});
