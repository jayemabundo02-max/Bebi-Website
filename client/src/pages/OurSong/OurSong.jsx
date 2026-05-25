import { useState } from "react";
import SongCard from "../../components/SongCard/SongCard";
import { useMusic } from "../../hooks/useMusic";
import { useNotification } from "../../hooks/useNotification";
import { createSong } from "../../services/musicService";
import { getErrorMessage } from "../../utils/helpers";

const initialForm = {
  artist: "",
  audio: null,
  caption: "",
  isFavorite: false,
  title: ""
};

export default function OurSong() {
  const { error, isLoading, loadSongs, songs } = useMusic();
  const { showNotification } = useNotification();
  const [form, setForm] = useState(initialForm);
  const [isUploading, setIsUploading] = useState(false);

  const favoriteSongs = songs.filter((song) => song.isFavorite);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      await createSong(form);
      setForm(initialForm);
      await loadSongs();
      showNotification({
        title: "Song uploaded",
        message: "The monthly archive has a new track.",
        tone: "success"
      });
    } catch (submitError) {
      showNotification({
        title: "Upload failed",
        message: getErrorMessage(submitError, "Could not save the song."),
        tone: "error"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">Monthly soundtrack</p>
        <h1>Our Song</h1>
        <p>Upload music, add captions, and keep favorite songs easy to find.</p>
      </section>

      <section className="content-split">
        <form className="glass-card stack-form" onSubmit={handleSubmit}>
          <h2>Upload a song</h2>
          <label htmlFor="song-title">Title</label>
          <input
            id="song-title"
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            required
            value={form.title}
          />
          <label htmlFor="song-artist">Artist</label>
          <input
            id="song-artist"
            onChange={(event) => setForm((current) => ({ ...current, artist: event.target.value }))}
            value={form.artist}
          />
          <label htmlFor="song-caption">Caption</label>
          <textarea
            id="song-caption"
            onChange={(event) => setForm((current) => ({ ...current, caption: event.target.value }))}
            rows="4"
            value={form.caption}
          />
          <label htmlFor="song-file">Music file</label>
          <input
            accept="audio/*"
            id="song-file"
            onChange={(event) =>
              setForm((current) => ({ ...current, audio: event.target.files?.[0] || null }))
            }
            type="file"
          />
          <label className="check-row">
            <input
              checked={form.isFavorite}
              onChange={(event) =>
                setForm((current) => ({ ...current, isFavorite: event.target.checked }))
              }
              type="checkbox"
            />
            Mark as favorite
          </label>
          <button className="primary-button full" disabled={isUploading} type="submit">
            {isUploading ? "Saving..." : "Save song"}
          </button>
        </form>

        <div className="stack-list">
          {error ? <p className="soft-warning">{error}</p> : null}
          <section>
            <div className="section-heading inline">
              <p className="eyebrow">Favorites</p>
              <h2>Most replayed</h2>
            </div>
            <div className="card-grid">
              {favoriteSongs.length ? (
                favoriteSongs.map((song) => <SongCard key={song._id} song={song} />)
              ) : (
                <p className="empty-state">No favorite songs yet.</p>
              )}
            </div>
          </section>

          <section>
            <div className="section-heading inline">
              <p className="eyebrow">Archive</p>
              <h2>Monthly songs</h2>
            </div>
            {isLoading ? (
              <p className="empty-state">Loading songs...</p>
            ) : (
              <div className="card-grid">
                {songs.map((song) => (
                  <SongCard key={song._id} song={song} />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
