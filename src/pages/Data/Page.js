import React, { useState, useEffect, useReducer, useRef } from "react";
import "./index.css";
import WOW from "wowjs";

export const Page = ({ amount, text, caption, ref }) => {
  useEffect(() => {
    const wow = new WOW.WOW().init();
  }, []);

  return (
    <div className="data-container" ref={ref}>
      {/* <P5object canvasWidth={1200} entitySize={300} amountInput={2.5} /> */}
      <div className="p5-text-container col act jct">
        <span className="fc-white wow fadeInUp">{text}</span>
        <span
          className="fc-white fs-h1 f-bold wow fadeInUp"
          style={{ marginTop: "0.8rem" }}
        >
          {amount} kgCO2eq
        </span>
        <span
          className="fc-white fs-c1 wow fadeInUp"
          style={{ marginTop: "0.6rem" }}
        >
          {caption}
        </span>
      </div>
    </div>
  );
};
