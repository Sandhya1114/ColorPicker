// import React, { useState } from "react";
// import {
//     HexColorPicker,
//     RgbColorPicker,
//     HslColorPicker,
// } from "react-colorful";
// import './ColorPickerButton.css';

// const ColorPickerButton = () => {
//     const [isOpen, setIsOpen] = useState(true);
//     const [mode, setMode] = useState("hex");
//     const [color, setColor] = useState("#aabbcc");
//     const [hoveredColor, setHoveredColor] = useState("");

//     const renderPicker = () => {
//         const pickerProps = { color, onChange: setColor };
//         switch (mode) {
//             case "hex": return <HexColorPicker {...pickerProps} />;
//             case "rgb": return <RgbColorPicker {...pickerProps} />;
//             case "hsl": return <HslColorPicker {...pickerProps} />;
//             default: return null;
//         }
//     };

//     const generateColorVariations = (baseColor) => {
//         const variations = [];
//         const increment = 100 / 6; // 14 increments for 15 variations
//         for (let i = 0; i <= 14; i++) {
//             variations.push(adjustColorBrightness(baseColor, (i - 7) * increment));
//         }
//         return variations;
//     };

//     const adjustColorBrightness = (hex, percent) => {
//         let R = parseInt(hex.slice(1, 3), 16);
//         let G = parseInt(hex.slice(3, 5), 16);
//         let B = parseInt(hex.slice(5, 7), 16);

//         R = Math.min(255, Math.max(0, R + (R * percent) / 100));
//         G = Math.min(255, Math.max(0, G + (G * percent) / 100));
//         B = Math.min(255, Math.max(0, B + (B * percent) / 100));

//         return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
//     };

//     const colorVariations = generateColorVariations(color);

//     const handleColorCopy = (colorToCopy) => {
//         navigator.clipboard.writeText(colorToCopy);
       
//     };

//     return (
//         <div className="color-picker-container">
//             {/* <button className="color-picker-button" onClick={() => setIsOpen(!isOpen)}>
//                 {isOpen ? "Close Picker" : "Open Color Picker"}
//             </button> */}
//             <div className="pickerAndColor">
//                {isOpen && (
//                 <div className="color-picker-dropdown">
//                     <div className="mode-selector">
//                         {["hex", "rgb", "hsl"].map(selectedMode => (
//                             <label key={selectedMode}>
//                                 <input
//                                     type="radio"
//                                     value={selectedMode}
//                                     checked={mode === selectedMode}
//                                     onChange={() => setMode(selectedMode)}
//                                 />
//                                 {selectedMode.toUpperCase()}
//                             </label>
//                         ))}
//                     </div>
//                     {renderPicker()}
//                     <div className="selected-color">
//                         <strong>Selected:</strong> {color}
//                         <button onClick={() => handleColorCopy(color)}>Copy</button>
//                     </div>
//                 </div>
//                 )}
//                 <div className="color-display" style={{ display: 'flex', marginTop: '10px' }}>
//                     {colorVariations.map((variation, index) => (
//                         <div 
//                             key={index}
//                             style={{ 
//                                 backgroundColor: variation, 
//                                 height: '300px', 
//                                 width: '32px', 
//                                 position: 'relative',
//                                 cursor: 'pointer',
//                             }}
//                             onMouseEnter={() => setHoveredColor(variation)}
//                             onMouseLeave={() => setHoveredColor("")}
//                             onClick={() => handleColorCopy(variation)}
//                         >
//                             {hoveredColor === variation && (
//                                 <div style={{
//                                     position: 'absolute',
//                                     bottom: '0',
//                                     left: '50%',
//                                     transform: 'translateX(-50%)',
//                                     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                                     color: 'white',
//                                     borderRadius: '5px',
//                                     whiteSpace: 'nowrap',
//                                     padding: '5px',
//                                 }}>
//                                     {variation}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
            
//         </div>
//     );
// };

// export default ColorPickerButton;
import React, { useState } from "react";
import {
    HexColorPicker,
    RgbColorPicker,
    HslColorPicker,
} from "react-colorful";
import './ColorPickerButton.css';

const ColorPickerButton = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [mode, setMode] = useState("hex");
    const [color, setColor] = useState("#3d605c");
    const [hoveredColor, setHoveredColor] = useState("");

    const renderPicker = () => {
        const pickerProps = { color, onChange: setColor };
        switch (mode) {
            case "hex": return <HexColorPicker {...pickerProps} />;
            case "rgb": return <RgbColorPicker {...pickerProps} />;
            case "hsl": return <HslColorPicker {...pickerProps} />;
            default: return null;
        }
    };

    // const generateColorVariations = (baseColor) => {
    //     const variations = [];
    //     const increment = 100 / 6;
    //     for (let i = 0; i <= 14; i++) {
    //         variations.push(adjustColorBrightness(baseColor, (i - 7) * increment));
    //     }
    //     return variations;
    // };

    // const adjustColorBrightness = (hex, percent) => {
    //     let R = parseInt(hex.slice(1, 3), 16);
    //     let G = parseInt(hex.slice(3, 5), 16);
    //     let B = parseInt(hex.slice(5, 7), 16);
        
    //     R = Math.min(255, Math.max(0, R + (R * percent) / 100));
    //     G = Math.min(255, Math.max(0, G + (G * percent) / 100));
    //     B = Math.min(255, Math.max(0, B + (B * percent) / 100));

    //     return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
    // };
    const generateColorVariations = (baseColor) => {
    const variations = [];
    const increment = 100 / 6;
    for (let i = 0; i <= 14; i++) {
        variations.push(adjustColorBrightness(baseColor, (i - 7) * increment));
    }
    return variations;
};

const adjustColorBrightness = (hex, percent) => {
    let R = parseInt(hex.slice(1, 3), 16);
    let G = parseInt(hex.slice(3, 5), 16);
    let B = parseInt(hex.slice(5, 7), 16);
    
    R = Math.min(255, Math.max(0, R + (R * percent) / 100));
    G = Math.min(255, Math.max(0, G + (G * percent) / 100));
    B = Math.min(255, Math.max(0, B + (B * percent) / 100));

    // Convert each component to a two-digit hex string
    const toHex = (value) => {
        const hex = Math.round(value).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return` #${toHex(R)}${toHex(G)}${toHex(B)}`;
};

    const colorVariations = generateColorVariations(color);

    const handleColorCopy = (colorToCopy) => {
        navigator.clipboard.writeText(colorToCopy);
    };

    return (
        <div className="color-picker-container">
            <h1>Color Picker</h1>
            <p>find color that you love and choose variation customize your color </p>
            <div className="pickerAndColor">
                {isOpen && (
                    <div className="color-picker-dropdown">
                        <div className="mode-selector">
                            {["hex"].map(selectedMode => (
                                <label key={selectedMode}>
                                    <input
                                        type="radio"
                                        value={selectedMode}
                                        checked={mode === selectedMode}
                                        onChange={() => setMode(selectedMode)}
                                    />
                                    {selectedMode.toUpperCase()}
                                </label>
                            ))}
                        </div>
                        {renderPicker()}
                        <div className="selected-color">
                            <strong>Selected:</strong> {color}
                            <button onClick={() => handleColorCopy(color) }>Copy</button>
                        </div>
                    </div>
                )}
                <div className="color-display">
                    {colorVariations.map((variation, index) => (
                        <div 
                            key={index}
                            className="color-variation"
                            style={{ backgroundColor: variation }}
                            onMouseEnter={() => setHoveredColor(variation)}
                            onMouseLeave={() => setHoveredColor("")}
                            onClick={() => handleColorCopy(variation)}
                        >
                            {hoveredColor === variation && (
                                <div className="hovered-color-label">{variation}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPickerButton;
