import React, { useState, useEffect, useRef, useMemo } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";

export const AllData = () => {
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
            <a href="/alldata">All Data</a>
          </nav>
        </div>
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
    </div>
  );
};
