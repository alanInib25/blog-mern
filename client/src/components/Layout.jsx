//react-router-dom
import { Outlet } from "react-router-dom";

//components
import Header from "./header/Header";
import Footer from "./footer/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
