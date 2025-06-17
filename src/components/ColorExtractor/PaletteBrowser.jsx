import { useEffect, useState } from 'react';
import './PaletteBrowser.css';

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

export default function PaletteBrowser() {
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    fetch('http://colormind.io/api/', {
      method: 'POST',
      body: JSON.stringify({ model: 'default' }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setPalette(data.result);
        }
      })
      .catch((err) => {
        console.error('Colormind fetch error:', err);
      });
  }, []);

  return (
    <div className="paletteBrowser">
      <h2>Random Color Palette</h2>
      <div className="colorGrid">
        {palette.map((color, index) => {
          const hex = rgbToHex(...color);
          return (
            <div key={index} className="colorSwatch">
              <div
                className="colorBox"
                style={{ backgroundColor: hex }}
              />
              <span className="hexCode">{hex}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
