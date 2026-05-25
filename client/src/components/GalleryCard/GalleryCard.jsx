import { resolveFileUrl } from "../../services/api.js";
import { formatDate } from "../../utils/formatDate.js";
import "./GalleryCard.css";

const GalleryCard = ({ item, onPreview }) => {
  return (
    <button className="gallery-card" type="button" onClick={() => onPreview(item)}>
      {item.imageUrl ? (
        <img alt={item.title} src={resolveFileUrl(item.imageUrl)} />
      ) : (
        <span className="image-placeholder">Photo</span>
      )}
      <span>
        <strong>{item.title}</strong>
        <small>{formatDate(item.uploadDate || item.createdAt)}</small>
      </span>
    </button>
  );
};

export default GalleryCard;
