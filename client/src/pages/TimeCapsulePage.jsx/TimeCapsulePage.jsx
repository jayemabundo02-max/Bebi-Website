import TimeCapsule from "../../components/TimeCapsule/TimeCapsule.jsx";
import "./TimeCapsulePage.css";

const TimeCapsulePage = () => {
  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Recaps</p>
        <h1>Time Capsule</h1>
        <p>Yearly relationship recaps will live here.</p>
      </header>
      <TimeCapsule />
    </section>
  );
};

export default TimeCapsulePage;
