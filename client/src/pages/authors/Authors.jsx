import { useEffect } from "react";
//css
import "./authors.css";
//react-router-dom
import { Link } from "react-router-dom";
//componets
import Loader from "../../components/loader/Loader";
//Avatar
import Avatar from "react-avatar";
//context
import { useUser } from "../../context/userContext";
//api
const API_URL = import.meta.env.VITE_API_URL;

function Authors() {
  //useUser
  const {loading, httpError, authors, getAuthors} = useUser();

  useEffect(() => {
    getAuthors();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="authors">
      {httpError && <p className="error-message">{httpError}</p>}
      {authors && authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map((author) => {
            return (
              <Link
                key={author._id}
                to={`/posts/users/${author._id}`}
                className="author"
              >
                <div className="author__avatar">
                  {author.avatar ? (
                    <img src={`${API_URL}/uploads/${author.avatar}`} alt={`Image of ${author.name}`} />
                  ) : (
                    <Avatar size="45" name={`${author.name}`} />
                  )}
                </div>
                <div className="author__info">
                  <h4>{author.name}</h4>
                  <p>{author.post}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No authors founds</h2>
      )}
    </section>
  );
}

export default Authors;
