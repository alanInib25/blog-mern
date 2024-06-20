import { useEffect } from "react";
//context
import { useUser } from "../context/userContext";
import { usePost } from "../context/postContext";
//react-router-dom
import { useNavigate, Link } from "react-router-dom";

function DeletePost({ postId }) {
  //context
  const { isAuth } = useUser();
  const { deletePost } = usePost();
  //react-touter-dom
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth.status) navigate("/login");
  }, []);

  function handleClick() {
    deletePost({ id: postId }).then((ok) => {
      if (ok === "ok") {
        return navigate("/");
      }
    });
  }

  return (
    <Link className="btn sm danger" onClick={handleClick}>
      Delete
    </Link>
  );
}

export default DeletePost;
