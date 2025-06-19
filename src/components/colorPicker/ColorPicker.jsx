// ColorPickerButton.jsx
import React, { useState } from "react";
import {
  HexColorPicker,
  RgbColorPicker,
  HslColorPicker,
//   CmykColorPicker,
} from "react-colorful";
// import { defineConfig } from "vite";
// import "react-colorful/dist/index.css";

// defineConfig({
// //   plugins: [react()],
//   optimizeDeps: {
//     include: ["react-colorful/dist/index.css"],
//   },
// });

const ColorPickerButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("hex");
  const [color, setColor] = useState("#aabbcc");

  const renderPicker = () => {
    const pickerProps = { color, onChange: setColor };
    switch (mode) {
      case "hex":
        return <HexColorPicker {...pickerProps} />;
      case "rgb":
        return <RgbColorPicker {...pickerProps} />;
      case "hsl":
        return <HslColorPicker {...pickerProps} />;
    //   case "cmyk":
    //     return <CmykColorPicker {...pickerProps} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Picker" : "Open Color Picker"}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            background: "#fff",
            padding: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <label>
              <input
                type="radio"
                value="hex"
                checked={mode === "hex"}
                onChange={(e) => setMode(e.target.value)}
              />
              HEX
            </label>
            <label style={{ marginLeft: 8 }}>
              <input
                type="radio"
                value="rgb"
                checked={mode === "rgb"}
                onChange={(e) => setMode(e.target.value)}
              />
              RGB
            </label>
            <label style={{ marginLeft: 8 }}>
              <input
                type="radio"
                value="hsl"
                checked={mode === "hsl"}
                onChange={(e) => setMode(e.target.value)}
              />
              HSL
            </label>
            {/* <label style={{ marginLeft: 8 }}>
              <input
                type="radio"
                value="cmyk"
                checked={mode === "cmyk"}
                onChange={(e) => setMode(e.target.value)}
              />
              CMYK
            </label> */}
          </div>

          {renderPicker()}

          <div style={{ marginTop: 10 }}>
            <strong>Selected:</strong> {JSON.stringify(color)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPickerButton;