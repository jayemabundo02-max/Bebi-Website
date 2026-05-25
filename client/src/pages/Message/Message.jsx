import { useState } from "react";
import MessageCard from "../../components/MessageCard/MessageCard.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import { useMessage } from "../../hooks/useMessage.js";
import { createMessage, updateMessage } from "../../services/messageService.js";
import "./Message.css";

const blankMessage = {
  title: "",
  body: "",
  authorName: "Bebi",
  isPinned: false
};

const Message = () => {
  const { items: messages, setItems, loading, error, refresh } = useMessage();
  const [form, setForm] = useState(blankMessage);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useNotification();

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleEdit = (message) => {
    setEditingId(message._id);
    setForm({
      title: message.title,
      body: message.body,
      authorName: message.authorName,
      isPinned: Boolean(message.isPinned)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const saved = editingId
        ? await updateMessage(editingId, form)
        : await createMessage(form);
      setItems((current) =>
        editingId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current.filter((item) => !item._id?.startsWith("message-fallback"))]
      );
      setForm(blankMessage);
      setEditingId(null);
      notify(editingId ? "Message updated." : "Message saved.");
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
        <p className="eyebrow">Relationship journal</p>
        <h1>Messages</h1>
        <p>Write monthly letters, pin meaningful notes, and edit them as the story grows.</p>
      </header>
      <div className="message-layout">
        <form className="glass-card form-grid" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit message" : "New message"}</h2>
          <label>
            Title
            <input name="title" required value={form.title} onChange={handleChange} />
          </label>
          <label>
            Author
            <input name="authorName" required value={form.authorName} onChange={handleChange} />
          </label>
          <label>
            Letter
            <textarea name="body" required value={form.body} onChange={handleChange} />
          </label>
          <label className="inline-check">
            <input name="isPinned" type="checkbox" checked={form.isPinned} onChange={handleChange} />
            Pin this letter
          </label>
          <button className="primary-button" disabled={submitting} type="submit">
            {submitting ? "Saving..." : editingId ? "Update Message" : "Save Message"}
          </button>
          {editingId ? (
            <button className="ghost-button" type="button" onClick={() => { setEditingId(null); setForm(blankMessage); }}>
              Cancel Edit
            </button>
          ) : null}
          {error ? <p className="error-text">{error}</p> : null}
        </form>
        <div className="message-list">
          {loading ? <p className="muted">Loading letters...</p> : null}
          {messages.map((message) => (
            <MessageCard key={message._id} message={message} onEdit={handleEdit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Message;
