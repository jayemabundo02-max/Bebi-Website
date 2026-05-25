import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import { useGallery } from "../../hooks/useGallery";
import { useNotification } from "../../hooks/useNotification";
import { createGalleryItem } from "../../services/galleryService";
import { buildUploadUrl, getErrorMessage } from "../../utils/helpers";

const initialForm = {
  caption: "",
  image: null,
  title: ""
};

export default function Gallery() {
  const { error, gallery, isLoading, loadGallery } = useGallery();
  const { showNotification } = useNotification();
  const [form, setForm] = useState(initialForm);
  const [previewItem, setPreviewItem] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      await createGalleryItem(form);
      setForm(initialForm);
      await loadGallery();
      showNotification({ title: "Photo uploaded", message: "The gallery has a new picture." });
    } catch (submitError) {
      showNotification({
        title: "Upload failed",
        message: getErrorMessage(submitError, "Could not save the photo."),
        tone: "error"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">Photo albums</p>
        <h1>Gallery</h1>
        <p>Upload relationship pictures into responsive monthly albums with smooth previews.</p>
      </section>

      <section className="content-split">
        <form className="glass-card stack-form" onSubmit={handleSubmit}>
          <h2>Upload photo</h2>
          <label htmlFor="gallery-title">Title</label>
          <input
            id="gallery-title"
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            required
            value={form.title}
          />
          <label htmlFor="gallery-caption">Caption</label>
          <textarea
            id="gallery-caption"
            onChange={(event) => setForm((current) => ({ ...current, caption: event.target.value }))}
            rows="4"
            value={form.caption}
          />
          <label htmlFor="gallery-file">Image</label>
          <input
            accept="image/*"
            id="gallery-file"
            onChange={(event) =>
              setForm((current) => ({ ...current, image: event.target.files?.[0] || null }))
            }
            required
            type="file"
          />
          <button className="primary-button full" disabled={isUploading} type="submit">
            {isUploading ? "Uploading..." : "Save photo"}
          </button>
        </form>

        <section className="stack-list">
          {error ? <p className="soft-warning">{error}</p> : null}
          <div className="section-heading inline">
            <p className="eyebrow">Masonry archive</p>
            <h2>Pictures</h2>
          </div>
          {isLoading ? (
            <p className="empty-state">Loading gallery...</p>
          ) : (
            <div className="masonry-gallery">
              {gallery.map((item) => (
                <GalleryCard item={item} key={item._id} onPreview={setPreviewItem} />
              ))}
            </div>
          )}
        </section>
      </section>

      <AnimatePresence>
        {previewItem ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="modal-backdrop"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setPreviewItem(null)}
          >
            <motion.article
              animate={{ scale: 1, y: 0 }}
              className="preview-modal glass-card"
              exit={{ scale: 0.96, y: 18 }}
              initial={{ scale: 0.96, y: 18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img alt={previewItem.title} src={buildUploadUrl(previewItem.imageUrl)} />
              <h2>{previewItem.title}</h2>
              <p>{previewItem.caption}</p>
              <button className="ghost-button small" onClick={() => setPreviewItem(null)} type="button">
                Close
              </button>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
