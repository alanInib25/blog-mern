//react-router-dom
import { Link } from "react-router-dom";
//css
import "./postItem.css";
//componets
import PostAuthor from "../postAuthor/PostAuthor";
//api
const API_URL = import.meta.env.VITE_API_URL;
//custom hook
import { useShortString } from "../../customHook/useShortString.js";

function PostItem({ item }) {
  const {
    _id: id,
    thumbnail,
    category,
    title,
    description,
    creator,
    createdAt,
  } = item;
  //hook
  const { text: descriptionMin } = useShortString({
    stringText: description,
    stringLength: 145,
  });
  const { text: titleMin } = useShortString({
    stringText: title,
    stringLength: 30,
  });

  return (
    <article className="post">
      <div className="post__thumbnail">
        <img src={`${API_URL}/uploads/${thumbnail}`} alt={title} />
      </div>
      <div className="post__content">
        <Link to={`/posts/${id}`}>
          <h3>{titleMin}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: descriptionMin }}></p>
        <div className="post__footer">
          <PostAuthor creator={creator} createdAt={createdAt} />
          <Link to={`/posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
}
export default PostItem;
