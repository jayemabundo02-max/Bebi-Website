import Message from "../models/Message.js";
import { createAndDispatchNotification } from "../services/notificationService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assert } from "../utils/httpError.js";

const getPagination = (query) => {
  const limit = Math.min(Number(query.limit) || 24, 60);
  const page = Math.max(Number(query.page) || 1, 1);
  return { limit, page, skip: (page - 1) * limit };
};

export const getMessages = asyncHandler(async (req, res) => {
  const { limit, page, skip } = getPagination(req.query);
  const filter = req.query.monthKey ? { monthKey: req.query.monthKey } : {};

  const [items, total] = await Promise.all([
    Message.find(filter).sort({ isPinned: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Message.countDocuments(filter)
  ]);

  res.json({ data: items, meta: { limit, page, total } });
});

export const createMessage = asyncHandler(async (req, res) => {
  assert(req.body.title, 400, "Message title is required.");
  assert(req.body.body, 400, "Message body is required.");

  const message = await Message.create({
    authorName: req.body.authorName || "Bebi",
    body: req.body.body,
    isPinned: Boolean(req.body.isPinned),
    title: req.body.title
  });

  await createAndDispatchNotification({
    body: `${message.authorName} posted a new message.`,
    metadata: { messageId: message._id },
    title: "New message posted",
    type: "message"
  });

  res.status(201).json({ data: message });
});

export const updateMessage = asyncHandler(async (req, res) => {
  const updates = {
    ...(req.body.title !== undefined && { title: req.body.title }),
    ...(req.body.body !== undefined && { body: req.body.body }),
    ...(req.body.isPinned !== undefined && { isPinned: Boolean(req.body.isPinned) })
  };

  const message = await Message.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });
  assert(message, 404, "Message not found.");

  res.json({ data: message });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  assert(message, 404, "Message not found.");

  res.json({ data: { id: req.params.id } });
});
