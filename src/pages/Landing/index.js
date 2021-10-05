import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { Route, Link, useHistory } from "react-router-dom";

import IconBasket from "../../assets/icons/icon_basket.png";

/* canvas 컴포넌트 */
const Canvas = (props) => {
  let canvas = null;
  let context = null;
  let image = null; // image data list
  const imgSize = 512;
  const mapSize = 1024; // size of our height maps

  // returns the distance of point x,y from the origin 0,0
  const distance = (x, y) => Math.sqrt(x * x + y * y);

  const initialMap1 = [];

  for (let u = 0; u < mapSize; u++) {
    for (let v = 0; v < mapSize; v++) {
      // index of coordinate in height map array
      const i = u * mapSize + v;

      // u,v are coordinates with origin at upper left corner
      // cx and cy are coordinates with origin at the
      // center of the map
      const cx = u - mapSize / 2;
      const cy = v - mapSize / 2;

      // distance from middle of map
      const d = distance(cx, cy);

      // stretching so we get the desired ripple density on our map
      const stretch = (3 * Math.PI) / (mapSize / 2);

      // wavy height value between -1 and 1
      const ripple = Math.sin(d * stretch);

      // wavy height value normalized to 0..1
      const normalized = (ripple + 1) / 2;

      // height map value 0..128, integer
      initialMap1[i] = Math.floor(normalized * 128);
    }
  }
  const initialMap2 = [];
  for (let u = 0; u < mapSize; u++) {
    for (let v = 0; v < mapSize; v++) {
      const i = u * mapSize + v;
      const cx = u - mapSize / 2;
      const cy = v - mapSize / 2;

      // skewed distance as input to chaos field calculation,
      // scaled for smoothness over map distance
      const d1 = distance(0.8 * cx, 1.3 * cy) * 0.022;
      const d2 = distance(1.35 * cx, 0.45 * cy) * 0.022;

      const s = Math.sin(d1);
      const c = Math.cos(d2);
      // height value between -2 and +2
      const h = s + c;

      // height value between 0..1
      const normalized = (h + 2) / 4;
      // height value between 0..127, integer
      initialMap2[i] = Math.floor(normalized * 127);
    }
  }

  const canvasRef = useRef(null);
  const [map1, setMap1] = useState(initialMap1);
  const [update, setUpdate] = useState(false);
  const [map2, setMap2] = useState(initialMap2);

  const generateHeightMap1 = () => {
    // init height map 1
    const heightMap1 = [];

    for (let u = 0; u < mapSize; u++) {
      for (let v = 0; v < mapSize; v++) {
        // index of coordinate in height map array
        const i = u * mapSize + v;

        // u,v are coordinates with origin at upper left corner
        // cx and cy are coordinates with origin at the
        // center of the map
        const cx = u - mapSize / 2;
        const cy = v - mapSize / 2;
        // const cx = u - mouseX;
        // const cy = v - mouseY;

        // distance from middle of map
        const d = distance(cx, cy);

        // stretching so we get the desired ripple density on our map
        const stretch = (3 * Math.PI) / (mapSize / 2);

        // wavy height value between -1 and 1
        const ripple = Math.sin(d * stretch);

        // wavy height value normalized to 0..1
        const normalized = (ripple + 1) / 2;

        // height map value 0..128, integer
        heightMap1[i] = Math.floor(normalized * 128);
      }
    }
    console.log(heightMap1);
    setMap1(heightMap1);
    setUpdate(!update);
  };

  const generateHeightMap2 = () => {
    const heightMap2 = [];
    for (let u = 0; u < mapSize; u++) {
      for (let v = 0; v < mapSize; v++) {
        const i = u * mapSize + v;
        const cx = u - mapSize / 2;
        const cy = v - mapSize / 2;
        // const cx = u - mouseX;
        // const cy = v - mouseY;

        // skewed distance as input to chaos field calculation,
        // scaled for smoothness over map distance
        const d1 = distance(0.8 * cx, 1.3 * cy) * 0.022;
        const d2 = distance(1.35 * cx, 0.45 * cy) * 0.022;

        const s = Math.sin(d1);
        const c = Math.cos(d2);
        // height value between -2 and +2
        const h = s + c;

        // height value between 0..1
        const normalized = (h + 2) / 4;
        // height value between 0..127, integer
        heightMap2[i] = Math.floor(normalized * 127);
      }
    }
    console.log(heightMap2);
    setMap2(heightMap2);
    setUpdate(!update);
  };

  let dx1 = 0;
  let dy1 = 0;

  let dx2 = 0;
  let dy2 = 0;

  // update our image data array with greyscale values
  // as per our height maps
  const updateImageData = () => {
    for (let u = 0; u < imgSize; u++) {
      for (let v = 0; v < imgSize; v++) {
        // indexes into height maps for pixel
        const i = (u + dy1) * mapSize + (v + dx1);
        const k = (u + dy2) * mapSize + (v + dx2);

        // index for pixel in image data
        // remember it's 4 bytes per pixel
        const j = u * imgSize * 4 + v * 4;

        // height value of 0..255
        let h = map1[i] + map2[k];

        // greyscale color according to height
        // let c = { r: h, g: h, b: h };
        let c = palette[h];

        // set pixel data
        image.data[j] = c.r;
        image.data[j + 1] = c.g;
        image.data[j + 2] = c.b;
      }
    }
  };

  // adjust height maps offsets
  const moveHeightMaps = (t) => {
    // console.log("time: ", t); // 1000 ~ 그 이상

    dx1 = Math.floor(
      (((Math.cos(t * 0.0002 + 0.4 + Math.PI) + 1) / 2) * mapSize) / 2
    );
    dy1 = Math.floor((((Math.cos(t * 0.0003 - 0.1) + 1) / 2) * mapSize) / 2);
    dx2 = Math.floor((((Math.cos(t * -0.0002 + 1.2) + 1) / 2) * mapSize) / 2);
    dy2 = Math.floor(
      (((Math.cos(t * -0.0003 - 0.8 + Math.PI) + 1) / 2) * mapSize) / 2
    );

    // console.log("mouseX mouseY: ", mouseX, mouseY);

    // dx1 = Math.floor(
    //   (((Math.cos(mouseX * 0.2 + 0.4 + Math.PI) + 1) / 2) * mapSize) / 2
    // );
    // dy1 = Math.floor((((Math.cos(mouseY * 0.3 - 0.1) + 1) / 2) * mapSize) / 2);
    // dx2 = Math.floor((((Math.cos(mouseX * -0.2 + 1.2) + 1) / 2) * mapSize) / 2);
    // dy2 = Math.floor(
    //   (((Math.cos(mouseY * -0.3 - 0.8 + Math.PI) + 1) / 2) * mapSize) / 2
    // );
  };

  const tick = (time) => {
    // mouseX = props.mouseX;
    // mouseY = props.mouseY;

    moveHeightMaps(time);
    updateImageData();

    context.putImageData(image, 0, 0);

    requestAnimationFrame(tick);
  };

  // c1 and c2 are colors
  // f is a fraction between 0..1
  //
  // returns an interpolated color between
  //   c1 (for f=0) and
  //   c2 (for f=1)
  //
  // pass f=0.5 to get the color half-way between c1 and c2
  const interpolate = (c1, c2, f) => {
    return {
      r: Math.floor(c1.r + (c2.r - c1.r) * f),
      g: Math.floor(c1.g + (c2.g - c1.g) * f),
      b: Math.floor(c1.b + (c2.b - c1.b) * f),
    };
  };

  // generates an array of 256 colors
  // forming a linear gradient of the form
  // [c1, ..., c2]
  const linearGradient = (c1, c2) => {
    const g = [];
    // interpolate between the colors in the gradient
    for (let i = 0; i < 256; i++) {
      const f = i / 255;
      g[i] = interpolate(c1, c2, f);
    }
    return g;
  };
  let palette = linearGradient({ r: 148, g: 251, b: 86 }, { r: 0, g: 0, b: 0 });

  useEffect(() => {
    // create canvas ref
    canvas = canvasRef.current;
    context = canvas.getContext("2d");

    canvas.width = imgSize;
    canvas.height = imgSize;

    // init image data with black pixels
    image = context.createImageData(imgSize, imgSize);
    for (let i = 0; i < image.data.length; i += 4) {
      image.data[i] = 0; // R
      image.data[i + 1] = 0; // G
      image.data[i + 2] = 0; // B
      image.data[i + 3] = 255; // A
    }
    generateHeightMap1();
    generateHeightMap2();
  }, []);

  useEffect(() => {
    console.log("update changed ", update);
    if (image) {
      console.log("map changed");

      updateImageData();
      requestAnimationFrame(tick);
    }
  }, [update]);

  // mouse interaction을 넣으려는 시도
  useEffect(() => {
    //  console.log(canvasRef);
    //   canvasRef.current.addEventListener("mousemove", (e) =>
    //     console.log(e.offsetX, e.offsetY)
    //   );
    //   return () => {
    //     canvasRef.current.removeEventListener("mousemove", (e) =>
    //       console.log(e.offsetX, e.offsetY)
    //     );
    //   };
  }, []);

  //   useEffect(() => {
  //     mouseX = props.mouseX;
  //     mouseY = props.mouseY;
  //   }, [props.mouseX, props.mouseY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        padding: 0,
        margin: 0,
        ...props.style,
      }}
    ></canvas>
  );
};

export const Landing = () => {
  const history = useHistory();
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);

  /* for mouse effect */
  const _onMouseMove = (e) => {
    // console.log(e.clientY, e.target.offsetTop);
    // setMouseX(e.clientX);
    // setMouseY(e.clientY);
    // setMouseX(e.clientX + e.target.offsetLeft);
    // if (e.clientY >= e.target.offsetTop) setMouseY(e.clientY);
    // else setMouseY(e.target.offsetTop);
  };

  return (
    <div className="landing-background" onMouseMove={_onMouseMove}>
      <div className="landing-fixed-back">
        <Canvas
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      {/* header */}
      <div className="header-container">
        <nav>
          <a className="header-logo fc-primary pointer" href="/">
            ECO PLANET
          </a>
        </nav>
      </div>

      {/* main contents */}
      <main>
        <section>
          <div className="landing-contents-container ">
            <a className="landing-button-text pointer" href="/home">
              <img className="landing-icon" src={IconBasket} />
              Let's go grocery shopping!
            </a>
          </div>
        </section>
      </main>

      {/* mouse effect */}
      {/* <div
        className="landing-mouse-effect"
        style={{ top: mouseY + 10, left: mouseX - 50 }}
      /> */}
    </div>
  );
};
