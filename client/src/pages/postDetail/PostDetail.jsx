import { useEffect, useState } from "react";
//components
import PostAuthor from "../../components/postAuthor/PostAuthor";
import Loader from "../../components/loader/Loader";
import DeletePost from "../DeletePost";
//context
import { useUser } from "../../context/userContext";
import { usePost } from "../../context/postContext";
//css
import "./postDetail.css";
//react-router-dom
import { Link, useParams } from "react-router-dom";
//axios
//api
const API_URL = import.meta.env.VITE_API_URL;

function PostDetail() {
  //context
  const { isAuth } = useUser();
  const { getPost, post, httpError, loading } = usePost();
  //usePArams
  const { id } = useParams();

  useEffect(() => {
    getPost({ id });
  }, []);

  if (loading) return <Loader />;
  return (
    <section className="post-detail">
      {httpError && <p className="error">{httpError}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            {isAuth.status && isAuth.data?._id == post.creator?._id && (
              <>
                <PostAuthor creator={post.creator} createdAt={post.createdAt} />
                <div className="post-detail__buttons">
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="btn sm primary"
                  >
                    Edit
                  </Link>
                  <DeletePost postId={post._id} />
                </div>
              </>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img
              src={`${API_URL}/uploads/${post.thumbnail}`}
              alt={post.title}
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
}

export default PostDetail;
