
import { useState, useEffect, useRef } from 'react';
import colorData from './Data/colorPalettes'; // Updated import to match new structure
import './PaletteGrid.css';

const PaletteGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [palettesToShow, setPalettesToShow] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  // Load palettes based on selected category and current page
  const loadPalettes = () => {
    setLoading(true);
    const palettes = selectedCategory
      ? colorData.categoryPalettes[selectedCategory].map(paletteId => colorData.Palettes[paletteId])
      : Object.values(colorData.Palettes);

    const newPalettes = palettes.slice(0, page * 10); // Load 10 palettes per page
    setPalettesToShow(newPalettes);
    setLoading(false);
  };

  useEffect(() => {
    loadPalettes();
  }, [selectedCategory, page]);

  // Toggle category selection
  const handleCategoryClick = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    setPage(1); // Reset to first page when category changes
  };

  // Intersection Observer to detect when to load more palettes
  const lastPaletteRef = useRef();
  useEffect(() => {
    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const currentObserver = observer.current;
    if (currentObserver) {
      currentObserver.disconnect();
    }

    observer.current = new IntersectionObserver(observerCallback);
    if (lastPaletteRef.current) {
      observer.current.observe(lastPaletteRef.current);
    }

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [loading, palettesToShow]);

  return (
    <div className="paletteGridContainer">
      {/* Category Buttons */}
      <div className="categoryButtons">
        {Object.entries(colorData.categories).map(([id, category]) => (
          <button
            key={id}
            onClick={() => handleCategoryClick(Number(id))}
            className={`categoryButton ${
              selectedCategory === Number(id) ? 'active' : ''
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Palette Display */}
      <div className="paletteList">
        {palettesToShow.length > 0 ? (
          palettesToShow.map((palette, index) => (
            <div
              key={index}
              className="paletteBox"
              ref={index === palettesToShow.length - 1 ? lastPaletteRef : null}
            >
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
        {loading && <p>Loading more palettes...</p>}
      </div>
    </div>
  );
};

export default PaletteGrid;
