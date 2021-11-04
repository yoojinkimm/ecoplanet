import React, { useEffect } from "react";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

export const PaletteModal = ({ color, setColor, setShowModal }) => {
  useEffect(() => {
    // modal이 떠있는 동안만 스크롤 막아놓기
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  return (
    <div className="palette-back act jct">
      <div className="palette-container act jct col">
        <ColorPicker
          width={300}
          height={200}
          color={color}
          onChange={setColor}
          hideHSV
          dark
        />
        <button
          onClick={() => setShowModal(false)}
          style={{ marginTop: "2rem", width: "100%" }}
          className="data-message-button pointer fc-primary"
        >
          SELECT
        </button>
      </div>
    </div>
  );
};
