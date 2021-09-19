import React, { useState, useEffect } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";

export const Landing = () => {
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
    <div className="landing-background" onMouseMove={_onMouseMove}>
      <div className="landing-fixed-back" />
      {/* header */}
      <div className="landing-header-container">
        <div className="home-header-inner">
          <nav>
            <a className="landing-header-logo" href="/">
              ECO planet
            </a>
          </nav>
        </div>
      </div>

      {/* main contents */}
      <main>
        <section>
          <div className="landing-contents-container">
            <a className="landing-button-text" href="/home">
              Do not Click me
            </a>
          </div>
        </section>
      </main>

      {/* mouse effect */}
      {/* <div
        className="landing-mouse-effect"
        style={{ top: mouseY + 10, left: mouseX - 50 }}
      /> */}
    </div>
  );
};
