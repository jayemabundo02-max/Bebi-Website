export const sampleMessages = [
  {
    _id: "sample-message-1",
    title: "A letter for today",
    body: "I am keeping this little corner of the internet for the moments we never want to lose.",
    authorName: "Bebi",
    monthKey: "2026-05",
    isPinned: true,
    createdAt: "2026-05-08T00:00:00.000Z"
  },
  {
    _id: "sample-message-2",
    title: "Tiny reminder",
    body: "Even ordinary days deserve a place in our archive.",
    authorName: "Bebi",
    monthKey: "2026-04",
    isPinned: false,
    createdAt: "2026-04-08T00:00:00.000Z"
  }
];
export const fallbackMessages = [
  {
    _id: "message-fallback-1",
    title: "A Letter Waiting To Be Written",
    body: "Your journal will appear here after MongoDB is connected and the first message is saved.",
    authorName: "Bebi Website",
    monthKey: "2026-05",
    createdAt: new Date().toISOString(),
    isPinned: true
  }
];
