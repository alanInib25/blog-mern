import { useEffect } from "react";
//react-router-dom
import { Link, useNavigate } from "react-router-dom";
//css
import "./register.css";
//context
import { useUser } from "../../context/userContext";
//hook
import { useFormHook } from "../../customHook/useFormHook.js";

function Register() {
  //context
  const { httpError, userSignup, isAuth } = useUser();
  //useFormHook
  const { register, handleSubmit, errors} = useFormHook(["name", "email", "password", "confirmPassword"]);

  //navigate
  const navigate = useNavigate();
  //valida sesion
  useEffect(() => {
    if(isAuth.status){
      navigate("/")
    }
  }, [isAuth])

  function onSubmit(userData) {
    userSignup(userData).then((ok) => {
      if (ok === "ok") {
        navigate("/login");
      }
    });
  }

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form register__form">
          {httpError && <p className="form__error-message">{httpError}</p>}
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
            placeholder="Password"
            maxLength="12"
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
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            maxLength="12"
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
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </section>
  );
}

export default Register;
