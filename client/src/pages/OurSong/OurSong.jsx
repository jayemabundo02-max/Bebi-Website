import { useMemo, useState } from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer.jsx";
import SongCard from "../../components/SongCard/SongCard.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import { fallbackSongs } from "../../data/songs.js";
import { useMusic } from "../../hooks/useMusic.js";
import { createSong } from "../../services/musicService.js";
import { groupByMonth } from "../../utils/helpers.js";
import "./OurSong.css";

const initialForm = {
  title: "",
  artist: "",
  caption: "",
  favorite: false,
  file: null
};

const OurSong = () => {
  const { items: songs, setItems, loading, error, refresh } = useMusic();
  const [form, setForm] = useState(initialForm);
  const [selected, setSelected] = useState({ src: "", title: "" });
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useNotification();

  const groupedSongs = useMemo(() => groupByMonth(songs, "uploadedAt"), [songs]);
  const favoriteSongs = songs.filter((song) => song.favorite);

  const handleChange = (event) => {
    const { name, type, checked, files, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : files ? files[0] : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.file) {
      notify("Choose an audio file before uploading.", "error");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("artist", form.artist);
    formData.append("caption", form.caption);
    formData.append("favorite", String(form.favorite));
    formData.append("file", form.file);

    try {
      const song = await createSong(formData);
      setItems((current) => [song, ...current.filter((item) => !item._id?.startsWith("song-fallback"))]);
      setForm(initialForm);
      event.currentTarget.reset();
      notify("Song uploaded and saved.");
      refresh();
    } catch (requestError) {
      notify(requestError.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const displaySongs = songs.length ? songs : fallbackSongs;

  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Music archive</p>
        <h1>Our Song</h1>
        <p>Upload songs, mark favorites, and keep a monthly archive of your shared soundtrack.</p>
      </header>
      <div className="song-layout">
        <form className="glass-card form-grid" onSubmit={handleSubmit}>
          <h2>Upload a song</h2>
          <label>
            Song title
            <input name="title" required value={form.title} onChange={handleChange} />
          </label>
          <label>
            Artist
            <input name="artist" value={form.artist} onChange={handleChange} />
          </label>
          <label>
            Caption
            <textarea name="caption" value={form.caption} onChange={handleChange} />
          </label>
          <label className="inline-check">
            <input name="favorite" type="checkbox" checked={form.favorite} onChange={handleChange} />
            Add to favorites
          </label>
          <label>
            Audio file
            <input accept="audio/*" name="file" type="file" onChange={handleChange} />
          </label>
          <button className="primary-button" disabled={submitting} type="submit">
            {submitting ? "Uploading..." : "Save Song"}
          </button>
          {error ? <p className="error-text">{error}</p> : null}
        </form>
        <MusicPlayer src={selected.src} title={selected.title} />
      </div>
      {favoriteSongs.length ? (
        <section className="feature-section">
          <h2>Favorite songs</h2>
          <div className="page-grid">
            {favoriteSongs.map((song) => (
              <SongCard key={song._id} song={song} onPlay={(src, title) => setSelected({ src, title })} />
            ))}
          </div>
        </section>
      ) : null}
      <section className="feature-section">
        <h2>Monthly archive {loading ? <small>Loading...</small> : null}</h2>
        {Object.entries(groupedSongs).length ? (
          Object.entries(groupedSongs).map(([month, monthSongs]) => (
            <div className="archive-group" key={month}>
              <h3>{month}</h3>
              <div className="page-grid">
                {monthSongs.map((song) => (
                  <SongCard key={song._id} song={song} onPlay={(src, title) => setSelected({ src, title })} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="page-grid">
            {displaySongs.map((song) => (
              <SongCard key={song._id} song={song} onPlay={(src, title) => setSelected({ src, title })} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default OurSong;
