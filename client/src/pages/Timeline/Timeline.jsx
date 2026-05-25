import { useCallback, useEffect, useState } from "react";
import TimelineCard from "../../components/TimelineCard/TimelineCard";
import { sampleTimeline } from "../../data/timeline";
import { getTimelineEvents } from "../../services/timelineService";

export default function Timeline() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadTimeline = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getTimelineEvents();
      setEvents(response.data);
    } catch (loadError) {
      setError(loadError?.response?.data?.message || "Using sample timeline until the API is ready.");
      setEvents(sampleTimeline);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTimeline();
  }, [loadTimeline]);

  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">Relationship history</p>
        <h1>Timeline</h1>
        <p>Important dates, monthly celebrations, and milestone events in one vertical story.</p>
      </section>

      {error ? <p className="soft-warning">{error}</p> : null}
      {isLoading ? (
        <p className="empty-state">Loading timeline...</p>
      ) : (
        <section className="vertical-timeline">
          {events.map((event, index) => (
            <TimelineCard event={event} index={index} key={event._id} />
          ))}
        </section>
      )}
    </main>
  );
}
