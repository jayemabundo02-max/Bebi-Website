import { resolveFileUrl } from "../../services/api.js";
import { formatDate } from "../../utils/formatDate.js";
import "./SongCard.css";

const SongCard = ({ song, onPlay }) => {
  return (
    <article className="song-card glass-card">
      <div>
        <p className="card-kicker">{song.favorite ? "Favorite" : song.monthKey}</p>
        <h3>{song.title}</h3>
        <p>{song.artist || "Shared song"}</p>
      </div>
      <p className="card-caption">{song.caption}</p>
      <div className="card-actions">
        <span>{formatDate(song.uploadedAt || song.createdAt)}</span>
        <button
          className="primary-button compact"
          disabled={!song.fileUrl}
          type="button"
          onClick={() => onPlay(resolveFileUrl(song.fileUrl), song.title)}
        >
          Play
        </button>
      </div>
    </article>
  );
};

export default SongCard;
