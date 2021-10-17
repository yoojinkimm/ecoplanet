import React, { useState, useEffect, useRef, useMemo } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";
import { Page } from "./Page";
import { P5object } from "../../components";
import { throttle } from "lodash";
import { productList } from "../../assets/data/product";
import { IoIosArrowDown } from "react-icons/io";
import WOW from "wowjs";

export const Data = () => {
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const [eSize, setESize] = useState(5);
  const [aInput, setAInput] = useState(1);

  const width = window.innerWidth;
  const height = window.innerHeight - 100;

  const [mouseX, setMouseX] = useState(width / 2);
  const [mouseY, setMouseY] = useState(height / 2);
  const [objectX, setObjectX] = useState(mouseX);
  const [objectY, setObjectY] = useState(mouseY);
  const fast = 0.01;
  const slow = 0.005;

  const scrollRef = useRef();

  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        // if (!scrollRef.current) return;
        //  console.log(window.scrollY);

        // 해당 제품의 탄소배출량
        if (window.scrollY <= height) setESize(productList[index]?.amount);
        // 제품을 생산한 기업의 총 탄소배출량
        else if (window.scrollY > height && window.scrollY < height * 2)
          setESize(productList[index]?.company_amount / 2000);
        // 기업의 원단위 탄소배출량 대비 가격으로 계산한 탄소배출량
        else if (window.scrollY > height * 2 && window.scrollY < height * 3)
          setESize(productList[index]?.amount_per_won / 2);
      }, 300),
    []
  );

  const mouseFunc = (e) => {
    // 가운데 위치를 중심으로
    setMouseX(e.clientX - window.innerWidth / 2);
    setMouseY(e.clientY - window.innerHeight / 2);

    console.log(e.clientX, e.clientY);
  };

  const loop = () => {
    setObjectX(objectX + (mouseX - objectX) * fast);
    setObjectY(objectY + (mouseY - objectY) * fast);

    window.requestAnimationFrame(loop);
  };

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [throttledScroll]);

  useEffect(() => {
    console.log("selected index: ", history.location.state?.index);
    setIndex(history.location.state?.index);
    // const wow = new WOW.WOW().init();

    // 동작하지 않습니다! ㅠㅠ
    // window.addEventListener("mousemove", mouseFunc, false);
    // loop();
    return () => {
      // window.removeEventListener("mousemove", mouseFunc, false);
    };
  }, []);

  return (
    <div className="data-background">
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

      <div className="p5-container">
        <P5object entitySize={eSize} amountInput={aInput} />
      </div>

      {/* main contents */}
      <div
        className="data-main-container"
        ref={scrollRef}
        // style={{ transform: `translate(${objectX / 5}, ${objectY / 5})` }}
      >
        <Page
          index={index}
          text={"you made"}
          amount={productList[index]?.amount}
          caption={"해당 제품의 탄소배출량"}
        />
        <Page
          index={index}
          text={"company made"}
          amount={productList[index]?.company_amount}
          caption={"제품을 생산한 기업의 총 탄소배출량"}
        />
        <Page
          index={index}
          text={"you and company made"}
          amount={productList[index]?.amount_per_won}
          caption={
            "기업의 원단위 탄소배출량 과 제품 가격으로 계산한 탄소배출량"
          }
        />
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
            <a href="/">FINISH</a>
          </nav>
        </div>
      </div>

      <div className="data-arrow-container wow fadeInUp act jct">
        <IoIosArrowDown className="fc-primary" />
      </div>
    </div>
  );
};
