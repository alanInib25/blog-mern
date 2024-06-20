//react-router-dom
import { Link } from "react-router-dom";

//css
import "./footer.css";

function Footer() {
  return (
    <footer>
      <ul className="footer__categories">
        <li>
          <Link to="/posts/categories/Agriculture">Agriculture</Link>
        </li>
        <li>
          <Link to="/posts/categories/Business">Business</Link>
        </li>
        <li>
          <Link to="/posts/categories/Education">Education</Link>
        </li>
        <li>
          <Link to="/posts/categories/Entretainment">Entretainment</Link>
        </li>
        <li>
          <Link to="/posts/categories/Art">Art</Link>
        </li>
        <li>
          <Link to="/posts/categories/Investment">Investment</Link>
        </li>
        <li>
          <Link to="/posts/categories/Uncategorized">Uncategorized</Link>
        </li>
        <li>
          <Link to="/posts/categories/Weater">Weater</Link>
        </li>
      </ul>
      <div className="footer__copyright">
        <br></br>
        <Link
          className="link"
          to="https://www.youtube.com/watch?v=9hoyiyut0lE&list=WL&index=34"
          target="_blank"
        >
          All Rights Reserved &copy; Copyright, EGATOR
        </Link>
        <br></br>
        <small>Cloned by AlanInib</small>
      </div>
    </footer>
  );
}
export default Footer;
