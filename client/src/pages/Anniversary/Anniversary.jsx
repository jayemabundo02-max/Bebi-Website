import { useEffect, useState } from "react";
import AnniversaryIntro from "../../components/AnniversaryIntro/AnniversaryIntro.jsx";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer.jsx";
import TimeCapsule from "../../components/TimeCapsule/TimeCapsule.jsx";
import { getRelationshipStatus } from "../../services/anniversaryService.js";
import { getAnniversaryInfo } from "../../utils/anniversaryChecker.js";
import { getNextMonthsary } from "../../utils/generateMonthsary.js";
import "./Anniversary.css";

const Anniversary = () => {
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
            anniversary: { ...getAnniversaryInfo(), yearCount: 0 },
            nextMonthsary: getNextMonthsary().toISOString()
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const anniversaryDate = new Date(new Date().getFullYear(), 11, 8);

  if (anniversaryDate < new Date()) {
    anniversaryDate.setFullYear(anniversaryDate.getFullYear() + 1);
  }

  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Anniversary system</p>
        <h1>Anniversary</h1>
        <p>December 8 has a dedicated mode, yearly counter, recap area, and event countdowns.</p>
      </header>
      <div className="anniversary-grid">
        <AnniversaryIntro
          isAnniversary={Boolean(status?.anniversary?.isToday)}
          yearCount={status?.anniversary?.yearCount || 0}
        />
        <CountdownTimer label="Next anniversary" targetDate={anniversaryDate.toISOString()} />
        <CountdownTimer label="Next monthsary" targetDate={status?.nextMonthsary || getNextMonthsary().toISOString()} />
        <TimeCapsule />
      </div>
    </section>
  );
};

export default Anniversary;
