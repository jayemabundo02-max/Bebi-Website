import { buildUploadUrl } from "../../utils/helpers";
import { formatDate } from "../../utils/formatDate";

export default function GalleryCard({ item, onPreview }) {
  return (
    <button className="gallery-card" onClick={() => onPreview(item)} type="button">
      <img alt={item.title || "Relationship gallery item"} src={buildUploadUrl(item.imageUrl)} />
      <span>
        <strong>{item.title}</strong>
        <small>{formatDate(item.uploadDate || item.createdAt)}</small>
      </span>
    </button>
  );
}
