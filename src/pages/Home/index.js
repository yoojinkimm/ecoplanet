import React, { useState, useEffect } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";

import image1 from "../../assets/images/melting.jpg";
import image2 from "../../assets/images/flower.jpg";
import image3 from "../../assets/images/cat.jpg";
import image4 from "../../assets/images/sea.jpg";

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
              ECO planet
            </a>
          </nav>
          <nav className="home-left-menu">
            <span>All Data</span>
          </nav>
          {/* <nav className="home-right-menu">
            <span>Menu</span>
          </nav> */}
        </div>
      </div>

      {/* main contents */}
      <main>
        <section>
          <div className="home-image-container">
            <div
              className="home-move-image"
              style={{ left: "3%", animationDelay: "1s" }}
            >
              <img className="home-illust" src={image1} />
            </div>
            <div className="home-move-image" style={{ left: "11%" }}>
              <img className="home-illust" src={image2} />
            </div>
            <div
              className="home-move-image"
              style={{ left: "55%", animationDelay: "3s" }}
            >
              <img className="home-illust" src={image3} />
            </div>
            <div
              className="home-move-image"
              style={{ left: "77%", animationDelay: "5s" }}
            >
              <img className="home-illust" src={image4} />
            </div>
          </div>
        </section>
      </main>
      {/* mouse effect */}
      {/* <div
        className="home-mouse-effect"
        style={{ top: mouseY + 10, left: mouseX - 50 }}
      /> */}
    </div>
  );
};
