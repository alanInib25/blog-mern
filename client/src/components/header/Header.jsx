import { useState } from "react";
//react-router-dom
import { Link } from "react-router-dom";
//react-icons
import { FaBlogger } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
//context
import { useUser } from "../../context/userContext";
//css
import "./header.css";

function Header() {
  const [isNav, setIsNav] = useState(window.innerWidth > 800 ? true : false);//solo estado unicial, despues se setea con boton toggle
  //context
  const { isAuth } = useUser();

  function handleClickNav() {
    if (window.innerWidth > 800) return setIsNav(true);
    else return setIsNav(false);
  }

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={handleClickNav}>
          <FaBlogger />
        </Link>
        {isAuth.status && isNav && (
          <ul className="nav__menu">
            <li>
              <Link to={`/profile/${isAuth.data._id}`} onClick={handleClickNav}>
                {`${isAuth.data?.name}`}
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={handleClickNav}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={handleClickNav}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={handleClickNav}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!isAuth.status && isNav && (
          <ul className="nav__menu">
            <li>
              <Link to="/authors" onClick={handleClickNav}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={handleClickNav}>
                Login
              </Link>
            </li>
          </ul>
        )}
        <button className="nav__toggle-btn" onClick={() => setIsNav(!isNav)}>
          {isNav ? <IoMdClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Header;
