import { useCallback, useState } from "react";
import MemoryCard from "../../components/MemoryCard/MemoryCard.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import { fallbackMemories } from "../../data/memories.js";
import { useAsyncResource } from "../../hooks/useAsyncResource.js";
import { createMemory, getMemories } from "../../services/memoryService.js";
import "./Memories.css";

const Memories = () => {
  const loader = useCallback(() => getMemories(), []);
  const { items: memories, setItems, loading, error, refresh } = useAsyncResource(loader, fallbackMemories);
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);

    try {
      const memory = await createMemory(formData);
      setItems((current) => [memory, ...current.filter((item) => !item._id?.startsWith("memory-fallback"))]);
      form.reset();
      notify("Memory saved.");
      refresh();
    } catch (requestError) {
      notify(requestError.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Milestone archive</p>
        <h1>Memories</h1>
        <p>Save memory cards with images, captions, dates, and milestone categories.</p>
      </header>
      <div className="memory-layout">
        <form className="glass-card form-grid" onSubmit={handleSubmit}>
          <h2>Add memory</h2>
          <label>
            Title
            <input name="title" required />
          </label>
          <label>
            Caption
            <textarea name="caption" required />
          </label>
          <label>
            Date
            <input name="date" required type="date" />
          </label>
          <label>
            Milestone type
            <select name="milestoneType">
              <option value="ordinary">Ordinary</option>
              <option value="first">First</option>
              <option value="trip">Trip</option>
              <option value="date">Date</option>
              <option value="celebration">Celebration</option>
              <option value="promise">Promise</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Image
            <input accept="image/*" name="image" type="file" />
          </label>
          <button className="primary-button" disabled={submitting} type="submit">
            {submitting ? "Saving..." : "Save Memory"}
          </button>
          {error ? <p className="error-text">{error}</p> : null}
        </form>
        <div className="memory-list">
          {loading ? <p className="muted">Loading memories...</p> : null}
          {memories.map((memory) => (
            <MemoryCard key={memory._id} memory={memory} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memories;
