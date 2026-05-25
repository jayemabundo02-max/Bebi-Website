import asyncHandler from "../middleware/asyncHandler.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
