//components
import { useEffect } from "react";
import PostItem from "../../components/postItem/PostItem";
import Loader from "../../components/loader/Loader.jsx";
//react-router-dom
import { useParams } from "react-router-dom";
//css
import "./categoryPost.css";
//context
import { usePost } from "../../context/postContext.jsx";

function CategoryPost() {
  //context
  const { posts, getPosts, loading, httpError} = usePost();
  //useParams
  const { category } = useParams();
  //solcitca post por categoria
  useEffect(() => {
    getPosts({category});
  }, [category]);

  if (loading) return <Loader />;

  return (
    <section className="category-posts">
      {httpError && <p className="error_message">{httpError}</p>}
      {posts.length > 0 ? (
        <div className="container category-posts__container">
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

export default CategoryPost;
