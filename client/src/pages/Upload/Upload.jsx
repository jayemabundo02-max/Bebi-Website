import { Link } from "react-router-dom";

const adminActions = [
  {
    title: "Manage songs",
    copy: "Upload, favorite, or remove monthly songs.",
    to: "/songs"
  },
  {
    title: "Manage messages",
    copy: "Write and edit private journal letters.",
    to: "/messages"
  },
  {
    title: "Manage gallery",
    copy: "Upload photos and review monthly albums.",
    to: "/gallery"
  },
  {
    title: "Manage memories",
    copy: "Add milestone cards and timeline content.",
    to: "/memories"
  }
];

export default function Upload() {
  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">Private admin</p>
        <h1>Dashboard</h1>
        <p>
          Admin tools stay behind JWT authentication. Use the content pages for upload and editing
          workflows.
        </p>
      </section>

      <section className="feature-grid">
        {adminActions.map((action) => (
          <Link className="glass-card feature-card" key={action.to} to={action.to}>
            <h3>{action.title}</h3>
            <p>{action.copy}</p>
            <span>Open</span>
          </Link>
        ))}
      </section>

      <section className="stats-grid">
        <article className="glass-card stat-card">
          <span>Auth</span>
          <strong>JWT</strong>
        </article>
        <article className="glass-card stat-card">
          <span>Uploads</span>
          <strong>Year/month</strong>
        </article>
        <article className="glass-card stat-card">
          <span>Database</span>
          <strong>Indexed</strong>
        </article>
      </section>
    </main>
  );
}
