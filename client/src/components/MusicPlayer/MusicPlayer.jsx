import { useEffect, useRef } from "react";
import "./MusicPlayer.css";

const MusicPlayer = ({ src, title }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && src) {
      audioRef.current.load();
    }
  }, [src]);

  return (
    <section className="music-player glass-card">
      <div>
        <p className="card-kicker">Now selected</p>
        <h3>{title || "Choose a song"}</h3>
      </div>
      {src ? (
        <audio ref={audioRef} controls>
          <source src={src} />
          Your browser does not support audio playback.
        </audio>
      ) : (
        <p className="muted">Upload or select a song to play it here.</p>
      )}
    </section>
  );
};

export default MusicPlayer;
