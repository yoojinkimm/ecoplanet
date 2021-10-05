import React, { useState, useEffect } from "react";
import Sketch from "react-p5";

export const P5object = ({
  canvasWidth = window.innerWidth,
  canvasHeight = window.innerHeight,
  entitySize = 15,
  amountInput = 1,
}) => {
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
    let amount = easeInOutQuad(amountInput, 0, 1, 1);

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

  return <Sketch setup={setup} draw={draw} />;
};
