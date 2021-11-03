import React, { useState, useEffect } from "react";
import { P5object } from "../../components";

export const Interaction = ({
  messageList,
  postData,
  input,
  setInput,
  number,
  setNumber,
  color,
  setColor,
  showInput,
}) => {
  return (
    <div className="data-container act">
      <div className="memo-list-container">
        {messageList?.map((v, i) => {
          return (
            <div className="memo-container act col">
              <P5object
                entitySize={v.number}
                amountInput={1}
                canvasWidth={100}
                canvasHeight={100}
              />
              {/* <div className="memo-object" /> */}
              <span className="memo-text fc-white">{v.message}</span>
            </div>
          );
        })}
      </div>

      {showInput && (
        <div className="col act data-message-container">
          <span className="fc-white fs-h1 f-bold wow fadeInUp">
            힘을 모아봐요.
          </span>
          <div className="row act jct data-input-container">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={20}
              placeholder={"남기고 싶은 메세지를 적어주세요."}
              className="data-message-input"
            />
            <button onClick={postData} className="data-message-button pointer">
              힘 보태기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
