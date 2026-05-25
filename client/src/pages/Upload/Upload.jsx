import { Link } from "react-router-dom";
import "./Upload.css";

const Upload = () => {
  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Uploads</p>
        <h1>Upload Center</h1>
        <p>Use the dedicated feature pages to upload songs, gallery images, and memories.</p>
      </header>
      <div className="upload-grid page-grid">
        <Link className="glass-card" to="/songs">Upload songs</Link>
        <Link className="glass-card" to="/gallery">Upload photos</Link>
        <Link className="glass-card" to="/memories">Upload memories</Link>
      </div>
    </section>
  );
};

export default Upload;
