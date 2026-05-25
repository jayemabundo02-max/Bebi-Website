import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero.jsx";
import SharedCalendar from "../../components/SharedCalendar/SharedCalendar.jsx";
import { getRelationshipStatus } from "../../services/anniversaryService.js";
import { calculateDaysTogether } from "../../utils/calculateDaysTogether.js";
import { getNextMonthsary, isMonthsaryToday } from "../../utils/generateMonthsary.js";
import "./Home.css";

const quickLinks = [
  { to: "/songs", title: "Our Songs", body: "Upload music, captions, and favorite monthly tracks." },
  { to: "/messages", title: "Messages", body: "Save long letters and relationship journal notes." },
  { to: "/gallery", title: "Gallery", body: "Organize photos into soft monthly albums." },
  { to: "/memories", title: "Memories", body: "Capture milestones as timeline memory cards." }
];

const Home = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let active = true;

    getRelationshipStatus()
      .then((data) => {
        if (active) setStatus(data);
      })
      .catch(() => {
        if (active) {
          setStatus({
            daysTogether: calculateDaysTogether(),
            nextMonthsary: getNextMonthsary().toISOString(),
            anniversary: { isToday: false, yearCount: 0 }
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const nextMonthsary = status?.nextMonthsary || getNextMonthsary().toISOString();

  return (
    <>
      <Hero daysTogether={status?.daysTogether ?? calculateDaysTogether()} nextMonthsary={nextMonthsary} />
      {isMonthsaryToday() ? (
        <section className="monthsary-banner glass-card">
          <p className="card-kicker">Today is the 8th</p>
          <h2>Happy monthsary</h2>
          <p>A new monthly chapter is ready for songs, letters, photos, and memories.</p>
        </section>
      ) : null}
      <section className="home-links page-grid">
        {quickLinks.map((item) => (
          <Link className="home-link glass-card" key={item.to} to={item.to}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </Link>
        ))}
      </section>
      <SharedCalendar />
    </>
  );
};

export default Home;
