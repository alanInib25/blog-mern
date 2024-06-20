import { useEffect } from "react";
//context
import { usePost } from "../../context/postContext";
//components
import PostItem from "../postItem/PostItem";
import Loader from "../../components/loader/Loader";
//css
import "./posts.css";

function Posts() {
  //context
  const { getPosts, posts, loading, httpError } = usePost();

  useEffect(() => {
    getPosts()
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="posts">
      { httpError && <p className="error-message">{httpError}</p>}
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

export default Posts;
