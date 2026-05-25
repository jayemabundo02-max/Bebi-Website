import { formatDate } from "../../utils/formatDate";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

export default function SongCard({ song }) {
  return (
    <article className="glass-card song-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">{song.monthKey || "Monthly archive"}</p>
          <h3>{song.title}</h3>
        </div>
        {song.isFavorite ? <span className="status-pill">Favorite</span> : null}
      </div>
      <p>{song.caption || "No caption yet."}</p>
      <MusicPlayer audioUrl={song.audioUrl} title={song.artist || "Saved song"} />
      <time>{formatDate(song.uploadDate || song.createdAt)}</time>
    </article>
  );
}
