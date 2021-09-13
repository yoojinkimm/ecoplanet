import React, { useState, useEffect } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);

  /* for mouse effect */
  const _onMouseMove = (e) => {
    // console.log(e.clientY, e.target.offsetTop);
    // setMouseX(e.clientX);
    // setMouseY(e.clientY);
    //
    // setMouseX(e.clientX + e.target.offsetLeft);
    // if (e.clientY >= e.target.offsetTop) setMouseY(e.clientY);
    // else setMouseY(e.target.offsetTop);
  };

  return (
    <div className="home-background" onMouseMove={_onMouseMove}>
      <div className="home-fixed-back" />
      {/* header */}
      <div className="home-header-container">
        <div className="home-header-inner">
          <nav>
            <a class="home-header-logo" href="/">
              Eugene
            </a>
          </nav>
          <nav className="home-left-menu">
            <span>Archive</span>
          </nav>
          <nav className="home-right-menu">
            <span>Menu</span>
          </nav>
        </div>
      </div>

      {/* main contents */}
      <main>
        <section>
          <div className="home-image-container"></div>
        </section>
      </main>

      <span style={{ color: "white", marginTop: 400 }}>Home</span>

      {/* mouse effect */}
      <div
        className="home-mouse-effect"
        style={{ top: mouseY + 10, left: mouseX - 50 }}
      />
    </div>
  );
};
