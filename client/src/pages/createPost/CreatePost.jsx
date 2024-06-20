import { useState, useRef, useEffect } from "react";
//css
import "./createPost.css";
//react-quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//context
import { useUser } from "../../context/userContext";
import { usePost } from "../../context/postContext";
//react-router-dom
import { useNavigate } from "react-router-dom";
//data
import { modules, formats, post_categories } from "../../data/data.js";

function CreatePost() {
  //states
  const [form, setForm] = useState({
    title: "",
    category: "Uncategorized",
    thumbnail: {},
  });
  const [desc, setDesc] = useState("");
  //ref;
  const reactQuillRef = useRef(null);
  //context;
  const { isAuth } = useUser();
  const { createPost, httpError } = usePost();
  //navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth.status) {
      navigate("/login");
    }
  }, []);

  function handleDesc(e) {
    return setDesc(e);
  }

  function handleChangue(e) {
    return setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]:
        e.target.name === "thumbnail" ? e.target.files[0] : e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !form["title"].length ||
      !desc.length ||
      !Object.keys(form["thumbnail"])
    ) {
      return setError("All field required");
    }
    const data = new FormData(e.target);
    data.append("description", desc);
    createPost({data}).then((ok) => {
      if (ok === "ok") return navigate("/");
    });
  }

  return (
    <section className="create-post">
      <div className="container create-post__container">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit} className="form create-post__form">
          {httpError && <p className="form__error-message">{httpError}</p>}
          <input
            type="text"
            placeholder="title"
            name="title"
            value={form.title}
            onChange={handleChangue}
          />
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChangue}
          >
            {post_categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            name="description"
            value={desc}
            defaultValue={desc}
            onChange={handleDesc}
            ref={reactQuillRef}
          />
          <input
            name="thumbnail"
            type="file"
            accept="jpg, jpeg, png"
            onChange={handleChangue}
          />
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
