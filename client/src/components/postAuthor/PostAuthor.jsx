//react-router-dom
import { Link } from "react-router-dom";
//css
import "./postAuthor.css";
//react-avatar
import Avatar from "react-avatar";
//ract-time-ago
import ReactTimeAgo from "react-time-ago";
//javascript-time-ago
import TimeAgo from "javascript-time-ago";
//para fecha
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
//api
const API_URL = import.meta.env.VITE_API_URL;

function PostAuthor({ creator, createdAt }) {
  //fechas
  TimeAgo.addLocale(en);
  TimeAgo.addLocale(ru);

  return (
    <Link to={`/posts/users/${creator?._id}`} className="post__author">
      <div className="post__author-avatar">
        {creator.avatar ? (
          <img src={`${API_URL}/uploads/${creator?.avatar}`} alt={creator.title} />
        ) : (
          <Avatar size="30" name={`${creator.name}`} />
        )}
      </div>
      <div className="post__author-details">
        <h5>By: {creator.name}</h5>
        <small>
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
}

export default PostAuthor;
