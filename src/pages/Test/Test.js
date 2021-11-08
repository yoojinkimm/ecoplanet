import React, { useState, useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";

import { productList } from "../../assets/data/product.js";
import { CircularSelector } from "../../components";

export const Test = () => {
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const decreaseIndex = () => {
    if (selectedIndex === 0) setSelectedIndex(productList.length - 1);
    else setSelectedIndex(selectedIndex - 1);
  };

  const increaseIndex = () => {
    if (selectedIndex === productList.length - 1) setSelectedIndex(0);
    else setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="home-background">
      {/* header */}
      <header className="header-container">
        <div className="header-inner">
          <nav>
            <a class="header-logo pointer fc-primary" href="/">
              ECO PLANET
            </a>
          </nav>
          <nav className="header-right-menu  pointer fc-primary">
            <a href="/alldata">All Data</a>
          </nav>
        </div>
      </header>

      {/* main contents */}
      <div className="main">
        <section>
          <div className="home-contents-container">
            <CircularSelector />
          </div>
        </section>
      </div>

      {/* footer */}
      <footer className="footer-container">
        <nav
          class="pointer fc-primary f-bold footer-left-menu"
          onClick={() => history.goBack()}
        >
          <a>
            B<br />A<br />C<br />K
          </a>
        </nav>
        <nav className="footer-right-menu  pointer fc-primary">
          <a
            onClick={() =>
              history.push({
                pathname: "/data",
                state: { index: selectedIndex },
              })
            }
          >
            SELECT
          </a>
        </nav>
      </footer>
    </div>
  );
};
