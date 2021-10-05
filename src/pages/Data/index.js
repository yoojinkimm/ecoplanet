import React, { useState, useEffect } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";
import { P5object } from "../../components";

export const Data = () => {
  const history = useHistory();

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

      {/* main contents */}
      <main>
        <section>
          <div style={{ display: "flex", width: "100%" }}>
            <P5object canvasWidth={500} entitySize={5} amountInput={1} />
            <P5object canvasWidth={1200} entitySize={300} amountInput={2.5} />
          </div>
        </section>
      </main>

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
    </div>
  );
};
