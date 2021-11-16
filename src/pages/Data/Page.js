import React, { useState, useEffect, useReducer, useRef } from "react";
import "./index.css";
import WOW from "wowjs";

export const Page = ({ amount, text, caption, show, pageIndex }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const wow = new WOW.WOW().init();
  }, []);

  let prevRatio = 0.0;

  const callback = (entries) => {
    const [entry] = entries;

    // 0.5로 안하면 서로 충돌납니다.
    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      if (entry.intersectionRatio > prevRatio) {
        // 증가하는 경우
        console.log(pageIndex, "increase");
        show();
        window.scrollTo({
          top: window.innerHeight * pageIndex,
          behavior: "smooth",
          block: "start",
        });
        // pageRef.current.scrollIntoView({
        //   behavior: "smooth",
        //   block: "start",
        // });
      }
    }

    prevRatio = entry.intersectionRatio;
  };

  const options = {
    root: null,
    threshold: [0, 0.25, 0.5, 0.75, 1],
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
