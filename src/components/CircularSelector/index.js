import React, { useState, useEffect } from "react";
import "./index.css";
import { productList } from "../../assets/data/product.js";

const r = 600;

export const CircularSelector = ({ selectedIndex, setSelectedIndex }) => {
  const height = (2 * r * 3.14) / productList.length;
  const angle = 360 / productList.length;

  return (
    <div className="circular-container act jct" style={{ left: -r / 1.2 }}>
      {productList.map((item, index) => {
        return (
          <div
            className="circular-product-select fc-white pointer"
            onClick={() => setSelectedIndex(item.index)}
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
  );
};
