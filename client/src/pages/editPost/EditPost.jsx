import { useState, useRef, useEffect } from "react";
//react-router-dom
import { useNavigate, useParams } from "react-router-dom";
//context
import { useUser } from "../../context/userContext";
import { usePost } from "../../context/postContext";
//css
import "./editPost.css";
//react-quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//data
import { modules, formats, post_categories } from "../../data/data.js";

function EditPost() {
  //states
  const [form, setForm] = useState({});
  const [desc, setDesc] = useState("");
  //context
  const { isAuth } = useUser();
  const { getPost, post, updatePost, httpError } = usePost();
  //ref
  const reactQuillRef = useRef(null);
  //navigate
  const navigate = useNavigate();
  //useParams
  const { id } = useParams();

  //valida token para sesion
  useEffect(() => {
    if (!isAuth.status) {
      navigate("/login");
    }
  }, []);

  //obtiene el post a editar
  useEffect(() => {
    getPost({ id });
  }, [id]);

  //setea el form con los datos del post
  useEffect(() => {
    if (Object.keys(post).length) {
      const { title, description, category, thumbnail } = post;
      setForm((prevForm) => {
        return {
          ...prevForm,
          title,
          category,
          thumbnail,
        };
      });
      setDesc(description);
    }
  }, [post]);

  //controla descripcion de post
  function handleDesc(e) {
    return setDesc(e);
  }

  //controla el formulario
  function handleChangue(e) {
    return setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]:
        e.target.name === "thumbnail" ? e.target.files[0] : e.target.value,
    }));
  }

  //envio de formulario
  function handleSubmit(e) {
    e.preventDefault();
    //valida datos
    if (
      !form["title"].length ||
      !desc.length ||
      !Object.keys(form["thumbnail"])
    ) {
      return setError("All field required");
    }
    const data = new FormData(e.target);
    data.append("description", desc);
    updatePost({ id, data }).then((ok) => {
      if (ok === "ok") return navigate("/");
    });
  }

  return (
    <section className="edit-post">
      <div className="container">
        <h2>Edit Post</h2>
        {httpError && <p className="form__error-message">{httpError}</p>}
        <form onSubmit={handleSubmit} className="form edit-post__form">
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
            Update
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;
