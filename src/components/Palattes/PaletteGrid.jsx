import { useState } from 'react';
import palettesData from './Data/colorPalettes';
import './PaletteGrid.css';

const PaletteGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Toggle category selection
  const handleCategoryClick = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);

    if (newCategory) {
      const themeData = palettesData.find((item) => item.category === newCategory);
      if (themeData) {
        console.log(`Palettes for ${newCategory}:`, themeData.palettes);
      }
    } else {
      console.log('Showing all palettes');
    }
  };

  // If a category is selected, use its palettes, otherwise show all
  const palettesToShow = selectedCategory
    ? palettesData.find((item) => item.category === selectedCategory)?.palettes || []
    : palettesData.flatMap((item) => item.palettes);

  return (
    <div className="paletteGridContainer">
      {/* Category Buttons */}
      <div className="categoryButtons">
        {palettesData.map((item) => (
          <button
            key={item.category}
            onClick={() => handleCategoryClick(item.category)}
            className={`categoryButton ${
              selectedCategory === item.category ? 'active' : ''
            }`}
          >
            {item.category}
          </button>
        ))}
      </div>

      {/* Palette Display */}
      <div className="paletteList">
        {palettesToShow.length > 0 ? (
          palettesToShow.map((palette) => (
            <div key={palette.id} className="paletteBox">
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
                  ></div>
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

export default PaletteGrid;
