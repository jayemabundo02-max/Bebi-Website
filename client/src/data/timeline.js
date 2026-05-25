export const sampleTimeline = [
  {
    _id: "sample-timeline-1",
    title: "Official beginning",
    description: "The date the archive counts from.",
    eventDate: "2024-12-08T00:00:00.000Z",
    type: "anniversary"
  },
  {
    _id: "sample-timeline-2",
    title: "First monthsary note",
    description: "Monthly celebrations are tracked every 8th day.",
    eventDate: "2025-01-08T00:00:00.000Z",
    type: "monthsary"
  }
];
export const fallbackTimeline = [
  {
    _id: "timeline-fallback-1",
    title: "Bebi Website Begins",
    description: "Your private relationship archive is ready for its first saved event.",
    eventDate: new Date().toISOString(),
    type: "milestone"
  }
];
