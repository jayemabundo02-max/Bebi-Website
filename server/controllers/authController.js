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
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const normalizeAccessCode = (value = "") => String(value).trim().replace(/[\s/-]/g, "");

const isValidAccessCode = async (accessCode) => {
  const configuredHash = process.env.ACCESS_PASSWORD_HASH;
  const configuredPassword = process.env.ACCESS_PASSWORD || "1208";

  if (configuredHash) {
    return bcrypt.compare(accessCode, configuredHash);
  }

  const acceptedCodes = new Set([
    normalizeAccessCode(configuredPassword),
    normalizeAccessCode(process.env.RELATIONSHIP_START_DATE || "2024-12-08")
  ]);

  return acceptedCodes.has(normalizeAccessCode(accessCode));
};

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || "development-only-bebi-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });

export const login = asyncHandler(async (req, res) => {
  const { accessCode, displayName = "Bebi" } = req.body;

  if (!accessCode) {
    res.status(400);
    throw new Error("Access code is required.");
  }

  const valid = await isValidAccessCode(accessCode);

  if (!valid) {
    res.status(401);
    throw new Error("Invalid relationship access code.");
  }

  const user = {
    id: "private-archive",
    displayName: String(displayName).trim().slice(0, 80) || "Bebi",
    role: "admin"
  };

  res.json({
    token: signToken(user),
    user
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      displayName: req.user.displayName,
      role: req.user.role
    }
  });
});
