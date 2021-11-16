import React, { useState, useEffect, useRef, useMemo } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";

import { productList } from "../../assets/data/product.js";

export const AllData = () => {
  const history = useHistory();

  return (
    <div className="all-background">
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

      <div style={{ flex: 1, paddingTop: 120 }}>
        <div className="all-item-container">
          {productList.map((v, i) => {
            return (
              <div className="all-item act jct col">
                <img className="all-product-icon" src={v.image} />
                <span className="all-product-name fc-white act jct f-bold">
                  {v.name}
                </span>
                <div className="all-product-badge fc-primary act jct f-bold">
                  {v.badge}
                </div>
                <span className="all-product-caption fc-white act jct">
                  {v.company}
                </span>
                <span className="all-product-caption fc-white act jct">
                  제품 {v.amount} kgCO2eq
                </span>
                <span className="all-product-caption fc-white act jct">
                  기업 {v.company_amount} tCO2eq
                </span>
                <span className="all-product-caption fc-white act jct">
                  원단위 {(v.price * v.amount_per_won).toFixed(2)} kgCO2eq
                </span>
              </div>
            );
          })}
        </div>

        <div className="all-explanation-container col">
          <span className="all-product-caption fc-white f-bold">자료 출처</span>
          <br />
          <a
            style={{ zIndex: 100 }}
            className="pointer"
            href="http://www.me.go.kr/home/web/public_info/read.do;jsessionid=mDrhYq13lP9jbDNNkbhfOjg6EDhqQpukaE7h7rQImkWDfNGg0IG8A0SPHIlQM9Gg.meweb2vhost_servlet_engine1?pagerOffset=40&maxPageItems=10&maxIndexPages=10&searchKey=&searchValue=&menuId=10357&orgCd=&condition.publicInfoMasterId=10&condition.deleteYn=N&publicInfoId=50&menuId=10357"
          >
            <h2 className="all-product-caption fc-white">
              환경부 환경성적표지인증현황
            </h2>
          </a>

          <a
            style={{ zIndex: 100 }}
            className="pointer"
            href="http://comp.wisereport.co.kr/company/dart.aspx?cmp_cd=009290&cn="
          >
            <h2 className="all-product-caption fc-white">
              금융감독원 기업 공시자료
            </h2>
          </a>

          <a
            style={{ zIndex: 100 }}
            className="pointer"
            href="http://www.gir.go.kr/home/index.do?menuId=37"
          >
            <h2 className="all-product-caption fc-white">
              환경부 온실가스종합정보센터 온실가스통게
            </h2>
          </a>
        </div>
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
          <a href="/">MAIN</a>
        </nav>
      </footer>
    </div>
  );
};
