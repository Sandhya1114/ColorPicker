// SearchPalettes.jsx
import { useState } from 'react';
//import colorData from '../Palattes/Data/colorPalettes'; // adjust path as needed
import './SearchPalettes.css';

const SearchPalettes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter palettes based on search term matching any hex color substring (case-insensitive)
  const filteredPalettes = Object.values(colorData.Palettes).filter(palette =>
    palette.colors.some(color =>
      color.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="searchPalettesContainer">
      <input
        type="text"
        placeholder="Search for color palettes (by hex code)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <div className="paletteList">
        {filteredPalettes.length > 0 ? (
          filteredPalettes.map((palette, idx) => (
            <div key={idx} className="paletteBox">
              {palette.colors.map((color, i) => (
                <div
                  key={i}
                  className="colorBlockContainer"
                  onClick={() => navigator.clipboard.writeText(color)}
                  title="Click to copy"
                >
                  <div
                    className="colorBlock"
                    style={{ backgroundColor: color }}
                  />
                  <span className="hexTooltip">{color}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No palettes found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPalettes;
