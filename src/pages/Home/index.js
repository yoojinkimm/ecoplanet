import React, { useState, useEffect } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";

import IconBasket from "../../assets/icons/icon_basket.png";

import { productList } from "../../assets/data/product.js";
import { CircularSelector } from "../../components";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export const Home = () => {
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
      <div className="main">
        <section>
          <div className="home-contents-container">
            <div className="home-top-container act jct">
              <IoIosArrowDropleftCircle
                className="home-arrow-icon pointer"
                style={{ left: "1rem" }}
                onClick={decreaseIndex}
              />
              <div className="home-product-container act jct">
                <img
                  className="home-product-icon"
                  src={productList[selectedIndex].image}
                />
                <img className="home-basket-icon" src={IconBasket} />
                <span className="home-product-name fc-white fs-h1 f-bold act jct">
                  {productList[selectedIndex].name}
                </span>
              </div>
              <IoIosArrowDroprightCircle
                onClick={increaseIndex}
                className="home-arrow-icon pointer"
                style={{ right: "1rem" }}
              />
            </div>
            <div className="home-bottom-container">
              <div style={{ marginLeft: "calc(5%" }} />
              {productList.map((item, index) => {
                return (
                  <img
                    onClick={() => setSelectedIndex(index)}
                    className="home-product-select pointer"
                    src={productList[index].image}
                  />
                );
              })}
              <div style={{ marginRight: "calc(5%" }} />
            </div>
          </div>
        </section>
      </div>

      {/* footer */}
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
        </div>
      </div>
    </div>
  );
};
