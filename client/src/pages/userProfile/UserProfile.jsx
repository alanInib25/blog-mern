import { useEffect, useState } from "react";
//context
import { useUser } from "../../context/userContext";
//react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";
//css
import "./userProfile.css";
//Avatar
import Avatar from "react-avatar";
//react-icons
import { FaEdit, FaCheck } from "react-icons/fa";
//hook
import { useFormHook } from "../../customHook/useFormHook.js";
//api
const API_URL = import.meta.env.VITE_API_URL;

function UserProfile() {
  const [avatarClick, setAvatarClick] = useState(false);
  //context
  const {
    isAuth,
    updateUser,
    httpError,
    updateUserAvatar,
    setAvatarHandle,
    avatar,
  } = useUser();
  //navigate
  const navigate = useNavigate();
  //useFormHook
  const { register, handleSubmit, errors, reset, setValue } = useFormHook([
    "name",
    "email",
    "password",
    "newPassword",
    "confirmPassword",
  ]);


  //redirecciona si no hay login
  useEffect(() => {
    if (!isAuth.status) navigate("/login");
  }, [isAuth]);

  //recupera usuario y limpia los campos
  useEffect(() => {
    if (Object.keys(isAuth.data).length) {
      setAvatarHandle(isAuth.data.avatar);
      setValue("name", isAuth.data.name);
      setValue("email", isAuth.data.email);
    }
  }, [isAuth]);

  //update Data
  function onSubmit(data) {
    updateUser(data).then((ok) => {
      if (ok === "ok") {
        navigate("/");
        return reset();
      }
    });
  }

  //update avatar
  function handlerChangeAvatar(e) {
    setAvatarClick(true);
    const formData = new FormData();
    formData.set("avatar", avatar);
    updateUserAvatar(formData);
  }

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/mypost/${isAuth.data?._id}`} className="btn">
          My post
        </Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              {avatar ? (
                <img src={`${API_URL}/uploads/${avatar}`} />
              ) : (
                <Avatar size="120" name={isAuth.data?.name} />
              )}
            </div>
            {/* formulario para actualizar avatar*/}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png, jpg, jpeg"
                onChange={(e) => setAvatarHandle(e.target.files[0])}
              />
              <label htmlFor="avatar" onClick={() => setAvatarClick(true)}>
                <FaEdit />
              </label>
            </form>
            {avatarClick && (
              <button
                className="profile__avatar-btn"
                onClick={(e)=>handlerChangeAvatar(e)}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{isAuth.data?.name}</h1>

          {/* formulario para actualizar datos de usuario */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form profile__form"
          >
            {httpError && <p className="error-message">{httpError}</p>}
            <input
              autoFocus
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name required",
                },
              })}
            />
            {errors?.name?.message && (
              <p className="form__error-message">{errors?.name?.message}</p>
            )}
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email required",
                },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Email bad format",
                },
              })}
            />
            {errors?.email?.message && (
              <p className="form__error-message">{errors?.email?.message}</p>
            )}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Current Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password required",
                },
                minLength: {
                  value: 6,
                  message: "Min length password 6 chracters",
                },
                maxLength: {
                  value: 12,
                  message: "Max length password 12 characters",
                },
              })}
            />
            {errors?.password?.message && (
              <p className="form__error-message">{errors?.password?.message}</p>
            )}
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="New Password"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "New Password required",
                },
                minLength: {
                  value: 6,
                  message: "Min length password 6 chracters",
                },
                maxLength: {
                  value: 12,
                  message: "Max length password 12 characters",
                },
              })}
            />
            {errors?.newPassword?.message && (
              <p className="form__error-message">
                {errors?.newPassword?.message}
              </p>
            )}
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm New Password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm Password required",
                },
                minLength: {
                  value: 6,
                  message: "Min length password 6 chracters",
                },
                maxLength: {
                  value: 12,
                  message: "Max length password 12 characters",
                },
              })}
            />
            {errors?.confirmPassword?.message && (
              <p className="form__error-message">
                {errors?.confirmPassword?.message}
              </p>
            )}
            <button className="btn primary">Update Details</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
