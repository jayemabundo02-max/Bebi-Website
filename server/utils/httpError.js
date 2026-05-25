export class HttpError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const assert = (condition, statusCode, message, details = null) => {
  if (!condition) {
    throw new HttpError(statusCode, message, details);
  }
};
