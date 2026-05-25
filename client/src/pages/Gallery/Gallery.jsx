import { useState } from "react";
import GalleryCard from "../../components/GalleryCard/GalleryCard.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import { useGallery } from "../../hooks/useGallery.js";
import { resolveFileUrl } from "../../services/api.js";
import { createGalleryItem } from "../../services/galleryService.js";
import { formatDate } from "../../utils/formatDate.js";
import { groupByMonth } from "../../utils/helpers.js";
import "./Gallery.css";

const Gallery = () => {
  const { items: gallery, setItems, loading, error, refresh } = useGallery();
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("image")?.name) {
      notify("Choose an image before uploading.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const item = await createGalleryItem(formData);
      setItems((current) => [item, ...current.filter((entry) => !entry._id?.startsWith("gallery-fallback"))]);
      form.reset();
      notify("Photo uploaded to gallery.");
      refresh();
    } catch (requestError) {
      notify(requestError.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const grouped = groupByMonth(gallery, "uploadDate");

  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Photo archive</p>
        <h1>Gallery</h1>
        <p>Upload relationship pictures, browse monthly albums, and preview each memory.</p>
      </header>
      <form className="gallery-upload glass-card form-grid" onSubmit={handleSubmit}>
        <label>
          Photo title
          <input name="title" required />
        </label>
        <label>
          Caption
          <input name="caption" />
        </label>
        <label>
          Image
          <input accept="image/*" name="image" required type="file" />
        </label>
        <button className="primary-button" disabled={submitting} type="submit">
          {submitting ? "Uploading..." : "Upload Photo"}
        </button>
        {error ? <p className="error-text">{error}</p> : null}
      </form>
      <section className="gallery-sections">
        {loading ? <p className="muted">Loading gallery...</p> : null}
        {Object.entries(grouped).map(([month, items]) => (
          <div key={month}>
            <h2>{month}</h2>
            <div className="masonry-gallery">
              {items.map((item) => (
                <GalleryCard key={item._id} item={item} onPreview={setPreview} />
              ))}
            </div>
          </div>
        ))}
      </section>
      {preview ? (
        <button className="modal-backdrop" type="button" onClick={() => setPreview(null)}>
          <article className="preview-modal glass-card" onClick={(event) => event.stopPropagation()}>
            {preview.imageUrl ? <img alt={preview.title} src={resolveFileUrl(preview.imageUrl)} /> : null}
            <h2>{preview.title}</h2>
            <p>{preview.caption}</p>
            <small>{formatDate(preview.uploadDate || preview.createdAt)}</small>
          </article>
        </button>
      ) : null}
    </section>
  );
};

export default Gallery;
