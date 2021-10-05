import React, { useState, useEffect } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";
import Sketch from "react-p5";

export const Data = () => {
  const history = useHistory();

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const entitySize = 15;

  let timer = 0;
  const speed = 0.001;

  // Setup
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.frameRate(30);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.fill(148, 251, 86);
    p5.stroke(239);
    p5.strokeWeight(1);

    const xPos = canvasWidth / 2;
    const yPos = canvasHeight / 2;
    let amount = easeInOutQuad(2, 0, 1, 1);

    // Draw entity
    drawEntity(p5, xPos, yPos, amount, 1);
    drawEntity(p5, xPos, yPos, amount, 2);
    drawEntity(p5, xPos, yPos, amount, 3);

    // Timer
    timer += speed;
    if (timer >= p5.TWO_PI) {
      timer = 0;
    }
  };

  // Draw circle
  function drawEntity(p5, x, y, crazy, entityNum) {
    const mult = p5.map(crazy, 0, 1, 0, 20);

    p5.stroke(148, 251, 86);
    p5.strokeWeight(1);

    p5.beginShape();
    for (let i = 0; i <= p5.TWO_PI; i += p5.TWO_PI / entitySize) {
      const pointNoiseRaw = p5.noise(
        p5.cos(i + entityNum) * p5.sin(timer) * mult + 1000,
        p5.sin(i + entityNum) * p5.cos(timer) * mult + 1000
      );
      const pointNoise = p5.map(pointNoiseRaw, 0, 1, -mult, mult);
      const radius = entitySize + pointNoise;
      const posX = p5.cos(i) * radius + x;
      const posY = p5.sin(i) * radius + y;
      p5.vertex(posX, posY);
    }
    p5.endShape(p5.CLOSE);
  }

  // Easing
  function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  }

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
          <Sketch setup={setup} draw={draw} />
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
