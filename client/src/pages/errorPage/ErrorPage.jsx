//react-router-dom
import { Link } from "react-router-dom";
//css
import "./errorPage.css"

function ErrorPage(){
  return(
    <section className="error-page">
      <div className="center">
        <Link to="/" className="btn primary">Go back to home</Link>
        <h2>Page not Found</h2>
      </div>
    </section>
  )
}

export default ErrorPage;