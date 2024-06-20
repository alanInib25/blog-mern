import { useEffect } from "react";
//react-router-dom
import { Link, useNavigate } from "react-router-dom";
//css
import "./login.css";
//hook
import { useFormHook } from "../../customHook/useFormHook.js";
//context
import { useUser } from "../../context/userContext";


function Login() {
  //context
  const { httpError, userSignin, isAuth } = useUser();
  //useFormHook
  const { register, handleSubmit, errors} = useFormHook(["email", "password"]);
  //useNavigate
  const navigate = useNavigate();
  //valida sesion
  useEffect(() => {
    if(isAuth.status){
      navigate("/")
    }
  }, [])
  //envio de datos
   function onSubmit(user) {
    userSignin(user).then((ok) => {
      if(ok === "ok"){
        navigate("/");
      }
    })
  }

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form login__form">
          {httpError && <p className="form__error-message">{httpError}</p>}
          <input
            autoFocus
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
          <button className="btn primary">Login</button>
        </form>
        <small>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </small>
      </div>
    </section>
  );
}

export default Login;
