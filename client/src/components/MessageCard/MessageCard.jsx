import { useState } from "react";
import { formatDate } from "../../utils/formatDate";

export default function MessageCard({ message, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ body: message.body, title: message.title });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave(message._id, draft);
    setIsEditing(false);
  };

  return (
    <article className={message.isPinned ? "glass-card message-card pinned" : "glass-card message-card"}>
      <div className="card-header">
        <div>
          <p className="eyebrow">{message.monthKey || "Letter"}</p>
          <h3>{message.title}</h3>
        </div>
        <time>{formatDate(message.createdAt)}</time>
      </div>

      {isEditing ? (
        <form className="inline-edit" onSubmit={handleSubmit}>
          <input
            aria-label="Message title"
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            value={draft.title}
          />
          <textarea
            aria-label="Message body"
            onChange={(event) => setDraft((current) => ({ ...current, body: event.target.value }))}
            rows="5"
            value={draft.body}
          />
          <div className="form-actions">
            <button className="primary-button small" type="submit">
              Save
            </button>
            <button className="ghost-button small" onClick={() => setIsEditing(false)} type="button">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>{message.body}</p>
          <button className="ghost-button small" onClick={() => setIsEditing(true)} type="button">
            Edit
          </button>
        </>
      )}
    </article>
  );
}
