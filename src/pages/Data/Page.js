import React, { useState, useEffect, useReducer, useRef } from "react";
import "./index.css";

export const Page = ({ amount, text }) => {
  return (
    <div className="data-container wow">
      {/* <P5object canvasWidth={1200} entitySize={300} amountInput={2.5} /> */}
      <div className="p5-text-container col act jct">
        <span className="fc-white">{text}</span>
        <span className="fc-white fs-h1 f-bold">{amount} gCO2eq</span>
      </div>
    </div>
  );
};
