import { useCallback, useEffect, useState } from "react";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import { sampleMemories } from "../../data/memories";
import { useNotification } from "../../hooks/useNotification";
import { createMemory, getMemories } from "../../services/memoryService";
import { getErrorMessage } from "../../utils/helpers";

const initialForm = {
  caption: "",
  date: new Date().toISOString().slice(0, 10),
  image: null,
  milestone: false,
  title: ""
};

export default function Memories() {
  const [memories, setMemories] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { showNotification } = useNotification();

  const loadMemories = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getMemories();
      setMemories(response.data);
    } catch (loadError) {
      setError(loadError?.response?.data?.message || "Using sample memories until the API is ready.");
      setMemories(sampleMemories);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      await createMemory(form);
      setForm(initialForm);
      await loadMemories();
      showNotification({ title: "Memory added", message: "The timeline has a new memory card." });
    } catch (submitError) {
      showNotification({
        title: "Save failed",
        message: getErrorMessage(submitError, "Could not save the memory."),
        tone: "error"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">Milestone cards</p>
        <h1>Memories</h1>
        <p>Add image-backed memories and organize the relationship story by date.</p>
      </section>

      <section className="content-split">
        <form className="glass-card stack-form" onSubmit={handleSubmit}>
          <h2>Add memory</h2>
          <label htmlFor="memory-title">Title</label>
          <input
            id="memory-title"
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            required
            value={form.title}
          />
          <label htmlFor="memory-date">Date</label>
          <input
            id="memory-date"
            onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
            required
            type="date"
            value={form.date}
          />
          <label htmlFor="memory-caption">Caption</label>
          <textarea
            id="memory-caption"
            onChange={(event) => setForm((current) => ({ ...current, caption: event.target.value }))}
            required
            rows="4"
            value={form.caption}
          />
          <label htmlFor="memory-file">Image</label>
          <input
            accept="image/*"
            id="memory-file"
            onChange={(event) =>
              setForm((current) => ({ ...current, image: event.target.files?.[0] || null }))
            }
            type="file"
          />
          <label className="check-row">
            <input
              checked={form.milestone}
              onChange={(event) =>
                setForm((current) => ({ ...current, milestone: event.target.checked }))
              }
              type="checkbox"
            />
            Mark as milestone
          </label>
          <button className="primary-button full" disabled={isUploading} type="submit">
            {isUploading ? "Saving..." : "Save memory"}
          </button>
        </form>

        <section className="stack-list">
          {error ? <p className="soft-warning">{error}</p> : null}
          <div className="section-heading inline">
            <p className="eyebrow">Timeline cards</p>
            <h2>Saved memories</h2>
          </div>
          {isLoading ? (
            <p className="empty-state">Loading memories...</p>
          ) : (
            <div className="memory-timeline">
              {memories.map((memory) => (
                <MemoryCard key={memory._id} memory={memory} />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
