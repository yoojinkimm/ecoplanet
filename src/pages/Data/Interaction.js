import React, { useState, useEffect, forwardRef, useRef } from "react";
import { P5object } from "../../components";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

export const Interaction = ({
  messageList,
  postData,
  input,
  setInput,
  number,
  setNumber,
  color,
  showInput,
  setShowModal,
  totalAmount,
  show,
}) => {
  const pageRef = useRef(null);

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
    <div className="data-container act" ref={pageRef}>
      <div className="fc-white">{totalAmount} kgCO2eq 만큼 모였습니다.</div>
      <div className="memo-list-container">
        {messageList?.map((v, i) => {
          return (
            <div className="memo-container act col">
              <P5object
                entitySize={v.number}
                amountInput={1}
                canvasWidth={100}
                canvasHeight={100}
                color={v.color}
              />
              {/* <div className="memo-object" /> */}
              <span className="memo-text fc-white">{v.message}</span>
            </div>
          );
        })}
      </div>

      {showInput && (
        <div className="col act data-message-container">
          <span className="fc-primary fs-h1 f-bold wow fadeInUp">
            힘을 모아
          </span>
          <div className="row act jct data-selector-container">
            <div
              className="data-color-picker pointer"
              style={{ backgroundColor: color.hex }}
              onClick={() => setShowModal(true)}
            />
            <div style={{ width: "8rem" }}>
              <Slider
                min={1}
                max={5}
                tooltip={false}
                value={number}
                orientation="horizontal"
                onChange={setNumber}
              />
            </div>
            <span className="fc-primary">{number}</span>
          </div>
          <div className="row act jct data-input-container">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={20}
              placeholder={"남기고 싶은 메세지를 적어주세요."}
              className="data-message-input"
            />
            <button
              onClick={postData}
              className="data-message-button pointer fc-primary"
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
