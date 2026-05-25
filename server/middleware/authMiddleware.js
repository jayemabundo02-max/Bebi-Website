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
