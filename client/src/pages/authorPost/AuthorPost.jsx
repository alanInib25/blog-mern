//components
import { useEffect } from "react";
import PostItem from "../../components/postItem/PostItem";
import Loader from "../../components/loader/Loader.jsx";
//react-router-dom
import { useParams } from "react-router-dom";
//css
import "./authorPost.css";
//context
import { usePost } from "../../context/postContext.jsx";

function AuthorPost() {
  //context
  const { getPosts, loading, httpError, posts } = usePost();
  //useParams
  const { id } = useParams();
  useEffect(() => {
    getPosts({id});
  }, [id]);

  if (loading) return <Loader />;

  return (
    <section className="posts">
      {httpError && <p className="error-message">{httpError}</p>}
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map((post) => (
            <PostItem key={post._id} item={post} />
          ))}
        </div>
      ) : (
        <h2 className="center">No post founds</h2>
      )}
    </section>
  );
}

export default AuthorPost;
