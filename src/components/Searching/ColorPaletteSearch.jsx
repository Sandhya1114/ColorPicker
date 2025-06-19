
import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './ColorPaletteSearch.css';
import colorData from '../Palattes/Data/colorPalettes';

const ColorPaletteSearch = ({ colorData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [palettes, setPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, color: '' });

  // Memoize categories
  const categories = useMemo(() => {
    return Object.entries(colorData.categories).map(([id, category]) => ({
      id,
      name: category.name
    }));
  }, [colorData.categories]);

  // Memoize all palettes
  const allPalettes = useMemo(() => {
    return Object.entries(colorData.Palettes).map(([id, palette]) => ({
      id,
      colors: palette.colors,
      category: colorData.categories[palette.category_id]?.name || '',
      category_id: palette.category_id
    }));
  }, [colorData.Palettes, colorData.categories]);

  // Debounced search function
  const performSearch = useCallback(
    _.debounce((query, categoryId) => {
      setIsLoading(true);
      let results = [];

      if (query) {
        const normalizedQuery = query.toLowerCase().trim();
        const colorNameMatches = [];

        // Match color names and their variations
        _.forEach(colorData.colorNames, (variations, colorName) => {
          if (_.includes(normalizedQuery, colorName)) {
            colorNameMatches.push(...variations.map(v => v.toLowerCase()));
          }
        });

        results = _.filter(allPalettes, (palette) => {
          const idMatch = _.includes(palette.id.toLowerCase(), normalizedQuery);
          const hexMatch = _.some(palette.colors, (color) =>
            color.toLowerCase() === normalizedQuery
          );
          const colorNameMatch = _.some(palette.colors, (color) =>
            colorNameMatches.includes(color.toLowerCase())
          );

          return idMatch || hexMatch || colorNameMatch;
        });

      } else if (categoryId) {
        results = _.filter(allPalettes, (palette) => palette.category_id === categoryId);
      } else {
        results = allPalettes;
      }

      setPalettes(results);
      setIsLoading(false);
    }, 300),
    [allPalettes, colorData.colorNames]
  );

  // Trigger search on input/category change
  useEffect(() => {
    performSearch(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, performSearch]);

  // Manual search submission
  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      setTooltip({ visible: true, color });
      setTimeout(() => setTooltip({ visible: false, color: '' }), 2000);
    });
  };

  return (
    <div className="color-palette-search">
      <h1>Search Here All Cool Palettes</h1>
      <p>Color is the element of the visual world that has the greatest impact on our emotions</p>
      
      <form onSubmit={handleSearch} className="search-controls">
        <div className="search-section">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by color name or hex code..."
            aria-label="Search color palettes"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="results-grid">
          {palettes.length > 0 ? (
            palettes.map((palette) => (
              <div key={palette.id} className="palette-card">
                <div className="palette-colors">
                  {palette.colors.map((color, index) => (
                    <div
                      key={index}
                      className="color-box"
                      style={{ backgroundColor: color }}
                      title={color}
                      aria-label={`Color ${color}`}
                      onClick={() => copyToClipboard(color)}
                      onMouseEnter={() => setTooltip({ visible: true, color })}
                      onMouseLeave={() => setTooltip({ visible: false, color: '' })}
                    >
                      <div className={`hexTooltip ${tooltip.visible && tooltip.color === color ? 'visible' : ''}`}>
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="palette-info">
                  <p className="palette-category">{palette.category}</p>
                </div> */}
              </div>
            ))
          ) : (
            <p className="no-results">
              {searchQuery ? `No palettes found for "${searchQuery}"` : 'No palettes found'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

ColorPaletteSearch.propTypes = {
  colorData: PropTypes.shape({
    categories: PropTypes.object.isRequired,
    Palettes: PropTypes.object.isRequired,
    categoryPalettes: PropTypes.object, // optional in this implementation
    colorNames: PropTypes.object.isRequired
  }).isRequired
};

export default ColorPaletteSearch;
