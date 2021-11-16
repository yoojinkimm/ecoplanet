import React, { useState, useEffect, useReducer, useRef } from "react";
import "./index.css";
import WOW from "wowjs";

export const Page = ({ amount, text, caption, show }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const wow = new WOW.WOW().init();
  }, []);

  const callback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      show();
      // console.log("entries: ", entries);
      pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const options = {
    root: null,
    threshold: 0.6,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (pageRef.current) {
      observer.observe(pageRef.current);
    }

    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
    };
  }, [pageRef, options]);

  return (
    <div className="data-container" ref={pageRef}>
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
