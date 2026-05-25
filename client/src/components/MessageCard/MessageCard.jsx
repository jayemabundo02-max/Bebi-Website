import { formatDate } from "../../utils/formatDate.js";
import "./MessageCard.css";

const MessageCard = ({ message, onEdit }) => {
  return (
    <article className="message-card glass-card">
      <div className="card-actions">
        <p className="card-kicker">{message.monthKey}</p>
        <button className="ghost-button compact" type="button" onClick={() => onEdit(message)}>
          Edit
        </button>
      </div>
      <h3>{message.title}</h3>
      <p className="message-body">{message.body}</p>
      <footer>
        <span>{message.authorName}</span>
        <span>{formatDate(message.createdAt)}</span>
      </footer>
    </article>
  );
};

export default MessageCard;
