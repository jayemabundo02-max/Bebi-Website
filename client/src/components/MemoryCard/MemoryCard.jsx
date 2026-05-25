import { buildUploadUrl } from "../../utils/helpers";
import { formatDate } from "../../utils/formatDate";

export default function MemoryCard({ memory }) {
  return (
    <article className="memory-card glass-card">
      {memory.imageUrl ? (
        <img alt={memory.title || "Relationship memory"} src={buildUploadUrl(memory.imageUrl)} />
      ) : null}
      <div>
        <p className="eyebrow">{memory.milestone ? "Milestone" : "Memory"}</p>
        <h3>{memory.title}</h3>
        <p>{memory.caption}</p>
        <time>{formatDate(memory.date)}</time>
      </div>
    </article>
  );
}
