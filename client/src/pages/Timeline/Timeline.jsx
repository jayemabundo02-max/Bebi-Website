import { useCallback, useState } from "react";
import TimelineCard from "../../components/TimelineCard/TimelineCard.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import { fallbackTimeline } from "../../data/timeline.js";
import { useAsyncResource } from "../../hooks/useAsyncResource.js";
import { createTimelineEvent, getTimelineEvents } from "../../services/timelineService.js";
import "./Timeline.css";

const Timeline = () => {
  const loader = useCallback(() => getTimelineEvents(), []);
  const { items: events, setItems, loading, error, refresh } = useAsyncResource(loader, fallbackTimeline);
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useNotification();

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const form = submitEvent.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setSubmitting(true);

    try {
      const event = await createTimelineEvent(payload);
      setItems((current) => [event, ...current.filter((item) => !item._id?.startsWith("timeline-fallback"))]);
      form.reset();
      notify("Timeline event saved.");
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
        <p className="eyebrow">Relationship history</p>
        <h1>Timeline</h1>
        <p>Track important dates, milestones, monthsaries, anniversaries, and custom events.</p>
      </header>
      <div className="timeline-layout">
        <form className="glass-card form-grid" onSubmit={handleSubmit}>
          <h2>Add event</h2>
          <label>
            Title
            <input name="title" required />
          </label>
          <label>
            Description
            <textarea name="description" required />
          </label>
          <label>
            Event date
            <input name="eventDate" required type="date" />
          </label>
          <label>
            Type
            <select name="type">
              <option value="custom">Custom</option>
              <option value="milestone">Milestone</option>
              <option value="memory">Memory</option>
              <option value="monthsary">Monthsary</option>
              <option value="anniversary">Anniversary</option>
            </select>
          </label>
          <button className="primary-button" disabled={submitting} type="submit">
            {submitting ? "Saving..." : "Save Event"}
          </button>
          {error ? <p className="error-text">{error}</p> : null}
        </form>
        <div className="timeline-list">
          {loading ? <p className="muted">Loading timeline...</p> : null}
          {events.map((event) => (
            <TimelineCard event={event} key={event._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
