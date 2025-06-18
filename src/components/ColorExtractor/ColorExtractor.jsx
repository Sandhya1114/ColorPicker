
import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import './ColorExtractor.css';
import PaletteGrid from '../Palattes/PaletteGrid';
//import SearchPalettes from '../Searching/SearchPalettes';

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

export default function ColorExtractor({ history, setHistory, initialItem }) {
  const [imageSrc, setImageSrc] = useState(initialItem?.src || null);
  const [colors, setColors] = useState(initialItem?.palette || []);

  useEffect(() => {
    if (initialItem) {
      setImageSrc(initialItem.src);
      setColors(initialItem.palette);
    }
  }, [initialItem]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setColors([]);
    };
    reader.readAsDataURL(file);
  };

  const handleImgLoad = (e) => {
    const img = e.target;
    if (img.complete && img.naturalWidth > 0) {
      const palette = new ColorThief().getPalette(img, 5);
      setColors(palette);
      setHistory((prev) => {
        const duplicate = prev.some(
          (item) =>
            item.src === imageSrc &&
            JSON.stringify(item.palette) === JSON.stringify(palette)
        );
        return duplicate ? prev : [{ src: imageSrc, palette }, ...prev];
      });
    }
  };

  return (
    <div className='forDivieded'>
    <div className="mainContainer">
      <div className="leftPanel">
        <div className="file-input">
          <h1 className="title">Upload an Image</h1>
          <h2 className="subtitle">The easiest place to get colors from your photos</h2>
          <label htmlFor="file">Select file</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="fileInput file"
            id="file"
          />
        </div>
      </div>

      <div className="rightPanel">
        {imageSrc && (
          <>
            <img
              src={imageSrc}
              alt="Uploaded"
              crossOrigin="anonymous"
              onLoad={handleImgLoad}
              className="imagePreview"
            />
            <div className="colorGrid">
              {colors.map((col, i) => {
                const hex = rgbToHex(...col);
                return (
                  <div key={i} className="colorSwatch">
                    <div className="colorBox" style={{ backgroundColor: hex }} />
                    <span className="hexCode">{hex}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
     <div>
      <PaletteGrid />
      {/* <SearchPalettes /> */}
    </div>
  </div>
  );
}