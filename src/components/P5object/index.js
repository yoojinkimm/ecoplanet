import React, { useState, useEffect } from "react";
import Sketch from "react-p5";

export const P5object = ({
  canvasWidth = window.innerWidth,
  canvasHeight = window.innerHeight,
  entitySize = 15,
  amountInput = 1,
  color,
}) => {
  let timer = 0;
  const speed = 0.001;

  // Setup
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.frameRate(30);
  };

  function hexToRgb(hexType) {
    /* 맨 앞의 "#" 기호를 삭제하기. */
    var hex = hexType.trim().replace("#", "");

    /* rgb로 각각 분리해서 배열에 담기. */
    var rgb =
      3 === hex.length ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

    rgb.forEach(function (str, x, arr) {
      /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */
      if (str.length == 1) str = str + str;

      /* 10진수로 변환하기. */
      arr[x] = parseInt(str, 16);
    });

    return "rgb(" + rgb.join(", ") + ")";
  }

  const draw = (p5) => {
    p5.background(0);
    if (color) p5.fill(hexToRgb(color));
    // hex값으로 저장함
    else p5.fill(148, 251, 86);

    // for centered object
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

    if (color) p5.stroke(hexToRgb(color));
    else p5.stroke(148, 251, 86);
    p5.strokeWeight(1);

    p5.beginShape();
    for (let i = 0; i <= p5.TWO_PI; i += p5.TWO_PI / entitySize) {
      const pointNoiseRaw = p5.noise(
        p5.cos(i + entityNum) * p5.sin(timer) * mult + entitySize * 100,
        p5.sin(i + entityNum) * p5.cos(timer) * mult + entitySize * 100
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
