export const sampleMemories = [
  {
    _id: "sample-memory-1",
    title: "The day we chose us",
    caption: "A milestone card for the relationship timeline.",
    date: "2024-12-08T00:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
    milestone: true
  },
  {
    _id: "sample-memory-2",
    title: "Favorite little routine",
    caption: "Small moments become big memories when they are saved.",
    date: "2026-05-08T00:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    milestone: false
  }
];
export const fallbackMemories = [
  {
    _id: "memory-fallback-1",
    title: "First Milestone",
    caption: "A timeline card for the next small beautiful thing you want to remember.",
    date: new Date().toISOString(),
    milestoneType: "ordinary"
  }
];
