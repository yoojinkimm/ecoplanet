import React, { useState, useEffect } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";

import IconBasket from "../../assets/icons/icon_basket.png";
import 칠성사이다250 from "../../assets/images/칠성사이다250.png";

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
      {/* header */}
      <div className="header-container">
        <div className="header-inner">
          <nav>
            <a class="header-logo pointer fc-primary" href="/">
              ECO PLANET
            </a>
          </nav>
          <nav className="header-right-menu  pointer fc-primary">
            <span>All Data</span>
          </nav>
        </div>
      </div>

      {/* main contents */}
      <main>
        <section>
          <div className="home-contents-container">
            <div className="home-left-container act jct">
              <div
                className="home-product-select fc-white pointer"
                style={{
                  transform: "translate3d(0px, calc(100%),0px) rotate(70deg)",
                }}
              >
                칠성사이다 250ml
              </div>
              <div
                className="home-product-select fc-white pointer"
                style={{
                  transform: "translate3d(40px, calc(100%),0px) rotate(60deg)",
                }}
              >
                칠성사이다 250ml
              </div>
            </div>
            <div className="home-right-container act jct">
              <div className="home-product-container col act jct">
                <img className="home-product-icon" src={칠성사이다250} />
                <img className="home-basket-icon" src={IconBasket} />
                <span className="home-product-name fc-white fs-24 f-bold">
                  칠성사이다 250ml
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="footer-container">
        <div className="footer-inner">
          <nav>
            <a
              class="pointer fc-primary f-bold"
              onClick={() => history.goBack()}
            >
              B<br />A<br />C<br />K
            </a>
          </nav>
          <nav className="footer-right-menu  pointer fc-primary">
            <a href="/data">SELECT</a>
          </nav>
        </div>
      </div>

      {/* mouse effect */}
      {/* <div
        className="home-mouse-effect"
        style={{ top: mouseY + 10, left: mouseX - 50 }}
      /> */}
    </div>
  );
};
