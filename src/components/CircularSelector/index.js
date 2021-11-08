import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { productList } from "../../assets/data/product.js";

const r = 600;

export const CircularSelector = ({ selectedIndex, setSelectedIndex }) => {
  const [rotate, setRotate] = useState(0);
  const height = (2 * r * 3.14) / productList.length;
  const angle = 360 / productList.length;

  const element = useRef();

  const scrollRotate = () => {
    console.log("scroll");
    setRotate((p) => p + 10);
    console.log("scroll end");
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollRotate);
    return () => window.removeEventListener("scroll", scrollRotate);
  }, []);

  useEffect(() => {
    console.log("rotate: ", rotate);
  }, [rotate]);

  return (
    <>
      <div className="scroll-container" />
      <div
        className="circular-container act jct"
        style={{ left: -r / 1.2, transform: `rotate(${rotate}deg)` }}
      >
        {productList.map((item, index) => {
          return (
            <div
              className="circular-product-select fc-white pointer"
              // onClick={() => setSelectedIndex(item.index)}
              style={{
                paddingLeft: r,
                transform: `rotate(${angle * index}deg)`,
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
};
