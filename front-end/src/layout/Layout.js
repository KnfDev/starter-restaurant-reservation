import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import "./Layout.css";
import Slideshow from "./Slideshow";
import Footer from "./Footer";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100 wrapper">
        <div className="col-md-2 side-bar">
          <Menu />
        <Slideshow/>
        </div>
        <div className="col css-test">
          <Routes />
        </div>
      </div>
      <div className="footer">
        <Footer/>
      </div>
    </div>
  );
}

export default Layout;
