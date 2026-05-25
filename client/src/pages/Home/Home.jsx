import { Link } from "react-router-dom";
import AnniversaryIntro from "../../components/AnniversaryIntro/AnniversaryIntro";
import Hero from "../../components/Hero/Hero";
import TimeCapsule from "../../components/TimeCapsule/TimeCapsule";

const quickLinks = [
  {
    title: "Our Song",
    copy: "Upload monthly tracks, captions, and favorites.",
    to: "/songs"
  },
  {
    title: "Messages",
    copy: "Keep long letters and editable journal notes.",
    to: "/messages"
  },
  {
    title: "Gallery",
    copy: "Collect photos into month-based albums.",
    to: "/gallery"
  },
  {
    title: "Memories",
    copy: "Save milestone cards with date, image, and caption.",
    to: "/memories"
  }
];

export default function Home() {
  return (
    <main className="page-shell">
      <Hero />
      <AnniversaryIntro />

      <section className="section-heading">
        <p className="eyebrow">Archive map</p>
        <h2>Everything has a place</h2>
      </section>

      <section className="feature-grid">
        {quickLinks.map((item) => (
          <Link className="glass-card feature-card" key={item.to} to={item.to}>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <span>Open</span>
          </Link>
        ))}
      </section>

      <TimeCapsule />
    </main>
  );
}
