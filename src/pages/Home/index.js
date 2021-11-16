import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";

import IconBasket from "../../assets/icons/icon_basket.png";

import { productList } from "../../assets/data/product.js";
import { CircularSelector } from "../../components";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

export const Home = () => {
  const history = useHistory();
  const productRef = useRef([]);
  const imageRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const decreaseIndex = () => {
    if (selectedIndex === 0) setSelectedIndex(productList.length - 1);
    else setSelectedIndex(selectedIndex - 1);
  };

  const increaseIndex = () => {
    if (selectedIndex === productList.length - 1) setSelectedIndex(0);
    else setSelectedIndex(selectedIndex + 1);
  };

  useEffect(() => {
    console.log("selected: ", selectedIndex, productRef.current[selectedIndex]);
    productRef.current[selectedIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
    // if (imageRef) imageRef.current.style.transform = "rotate(180deg)";
  }, [selectedIndex]);

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
            <div className="home-top-container act jct">
              <IoArrowBackOutline
                className="home-arrow-icon pointer"
                style={{ left: "1rem" }}
                onClick={decreaseIndex}
              />
              <div className="home-product-container act jct">
                <div ref={imageRef}>
                  <img
                    className="home-product-icon"
                    src={productList[selectedIndex].image}
                  />
                </div>
                <img className="home-basket-icon" src={IconBasket} />
                <span className="home-product-name fc-white fs-h1 f-bold act jct">
                  {productList[selectedIndex].name}
                </span>
              </div>
              <IoArrowForwardOutline
                onClick={increaseIndex}
                className="home-arrow-icon pointer"
                style={{ right: "1rem" }}
              />
            </div>
            <div className="home-bottom-container">
              <div style={{ marginLeft: "50%" }} />
              {productList.map((item, index) => {
                return (
                  <div ref={(el) => (productRef.current[index] = el)}>
                    <img
                      onClick={() => setSelectedIndex(index)}
                      className="home-product-select pointer"
                      src={productList[index].image}
                    />
                  </div>
                );
              })}
              <div style={{ marginRight: "50%" }} />
            </div>
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
