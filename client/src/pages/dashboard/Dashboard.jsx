import { useEffect, useState } from "react";
//react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";
//context
import { useUser } from "../../context/userContext";
import { usePost } from "../../context/postContext";
//css
import "./dashboard.css";
//components
import DeletePost from "../DeletePost";
import Loader from "../../components/loader/Loader";
//api
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  //context
  const { isAuth } = useUser();
  const { posts, getPostsUser, httpError, loading } = usePost();
  //navigate
  const navigate = useNavigate();
  //useParams
  const { id } = useParams();

  useEffect(() => {
    if (!isAuth.status) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getPostsUser({ id });
  }, []);

  if (loading) return <Loader />;
  return (
    <section className="dashboard">
      {posts.length > 0 ? (
        <div className="container dashboard__container">
          {httpError && <p className="error-message">{httpError}</p>}
          {posts.map((post) => {
            return (
              <article key={post._id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img
                      src={`${API_URL}/uploads/${post.thumbnail}`}
                      alt={post.title}
                    />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post._id}`} className="btn sm">
                    View
                  </Link>
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="btn sm primary"
                  >
                    Edit
                  </Link>
                  <DeletePost postId={post._id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">You have no posts</h2>
      )}
    </section>
  );
}

export default Dashboard;
