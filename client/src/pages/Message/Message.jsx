import { useState } from "react";
import MessageCard from "../../components/MessageCard/MessageCard";
import { useMessage } from "../../hooks/useMessage";
import { useNotification } from "../../hooks/useNotification";
import { createMessage, updateMessage } from "../../services/messageService";
import { getErrorMessage } from "../../utils/helpers";

const initialForm = {
  authorName: "Bebi",
  body: "",
  isPinned: false,
  title: ""
};

export default function Message() {
  const { error, isLoading, loadMessages, messages } = useMessage();
  const { showNotification } = useNotification();
  const [form, setForm] = useState(initialForm);
  const [localMessages, setLocalMessages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const visibleMessages = localMessages.length ? localMessages : messages;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await createMessage(form);
      setForm(initialForm);
      await loadMessages();
      setLocalMessages([]);
      showNotification({ title: "Message saved", message: "Your journal has a new letter." });
    } catch (submitError) {
      showNotification({
        title: "Save failed",
        message: getErrorMessage(submitError, "Could not save the message."),
        tone: "error"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async (id, payload) => {
    if (id.startsWith("sample-")) {
      setLocalMessages(
        visibleMessages.map((message) => (message._id === id ? { ...message, ...payload } : message))
      );
      return;
    }

    await updateMessage(id, payload);
    await loadMessages();
  };

  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">Shared journal</p>
        <h1>Messages</h1>
        <p>Write long letters, pin important notes, and keep monthly messages in MongoDB.</p>
      </section>

      <section className="content-split">
        <form className="glass-card stack-form" onSubmit={handleSubmit}>
          <h2>Write a letter</h2>
          <label htmlFor="message-title">Title</label>
          <input
            id="message-title"
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            required
            value={form.title}
          />
          <label htmlFor="message-author">Author</label>
          <input
            id="message-author"
            onChange={(event) =>
              setForm((current) => ({ ...current, authorName: event.target.value }))
            }
            value={form.authorName}
          />
          <label htmlFor="message-body">Message</label>
          <textarea
            id="message-body"
            onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
            required
            rows="8"
            value={form.body}
          />
          <label className="check-row">
            <input
              checked={form.isPinned}
              onChange={(event) =>
                setForm((current) => ({ ...current, isPinned: event.target.checked }))
              }
              type="checkbox"
            />
            Pin this message
          </label>
          <button className="primary-button full" disabled={isSaving} type="submit">
            {isSaving ? "Saving..." : "Save message"}
          </button>
        </form>

        <section className="stack-list">
          {error ? <p className="soft-warning">{error}</p> : null}
          <div className="section-heading inline">
            <p className="eyebrow">Letters</p>
            <h2>Monthly archive</h2>
          </div>
          {isLoading ? (
            <p className="empty-state">Loading messages...</p>
          ) : (
            visibleMessages.map((message) => (
              <MessageCard key={message._id} message={message} onSave={handleSave} />
            ))
          )}
        </section>
      </section>
    </main>
  );
}
