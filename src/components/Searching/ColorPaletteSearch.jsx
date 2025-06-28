
// import { useState, useEffect, useMemo, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import _ from 'lodash';
// import './ColorPaletteSearch.css';
// import colorData from '../Palattes/Data/colorPalettes';

// import BottomFooter from '../Footer/BottomFooter';

// const ColorPaletteSearch = ({ colorData }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [palettes, setPalettes] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [tooltip, setTooltip] = useState({ visible: false, color: '' });

//   // Memoize categories
//   const categories = useMemo(() => {
//     return Object.entries(colorData.categories).map(([id, category]) => ({
//       id,
//       name: category.name
//     }));
//   }, [colorData.categories]);

//   // Memoize all palettes
//   const allPalettes = useMemo(() => {
//     return Object.entries(colorData.Palettes).map(([id, palette]) => ({
//       id,
//       colors: palette.colors,
//       category: colorData.categories[palette.category_id]?.name || '',
//       category_id: palette.category_id
//     }));
//   }, [colorData.Palettes, colorData.categories]);

//   // Debounced search function
//   const performSearch = useCallback(
//     _.debounce((query, categoryId) => {
//       setIsLoading(true);
//       let results = [];

//       if (query) {
//         const normalizedQuery = query.toLowerCase().trim();
//         const colorNameMatches = [];

//         // Match color names and their variations
//         _.forEach(colorData.colorNames, (variations, colorName) => {
//           if (_.includes(normalizedQuery, colorName)) {
//             colorNameMatches.push(...variations.map(v => v.toLowerCase()));
//           }
//         });

//         results = _.filter(allPalettes, (palette) => {
//           const idMatch = _.includes(palette.id.toLowerCase(), normalizedQuery);
//           const hexMatch = _.some(palette.colors, (color) =>
//             color.toLowerCase() === normalizedQuery
//           );
//           const colorNameMatch = _.some(palette.colors, (color) =>
//             colorNameMatches.includes(color.toLowerCase())
//           );

//           return idMatch || hexMatch || colorNameMatch;
//         });

//       } else if (categoryId) {
//         results = _.filter(allPalettes, (palette) => palette.category_id === categoryId);
//       } else {
//         results = allPalettes;
//       }

//       setPalettes(results);
//       setIsLoading(false);
//     }, 300),
//     [allPalettes, colorData.colorNames]
//   );

//   // Trigger search on input/category change
//   useEffect(() => {
//     performSearch(searchQuery, selectedCategory);
//   }, [searchQuery, selectedCategory, performSearch]);

//   // Manual search submission
//   const handleSearch = (e) => {
//     e.preventDefault();
//     performSearch(searchQuery, selectedCategory);
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   const copyToClipboard = (color) => {
//     navigator.clipboard.writeText(color).then(() => {
//       setTooltip({ visible: true, color });
//       setTimeout(() => setTooltip({ visible: false, color: '' }), 2000);
//     });
//   };

//   return (
//     <>
//       <div className="color-palette-search">
//         <h1>Search Here All Cool Palettes</h1>
//         <p>Color is the element of the visual world that has the greatest impact on our emotions</p>
        
//         <form onSubmit={handleSearch} className="search-controls">
//           <div className="search-section">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by color name or hex code..."
//               aria-label="Search color palettes"
//             />
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? 'Searching...' : 'Search'}
//             </button>
//           </div>
//         </form>

//         {isLoading ? (
//           <div className="loading-indicator">Loading...</div>
//         ) : (
//           <div className="results-grid">
//             {palettes.length > 0 ? (
//               palettes.map((palette) => (
//                 <div key={palette.id} className="palette-card">
//                   <div className="palette-colors">
//                     {palette.colors.map((color, index) => (
//                       <div
//                         key={index}
//                         className="color-box"
//                         style={{ backgroundColor: color }}
//                         title={color}
//                         aria-label={`Color ${color}`}
//                         onClick={() => copyToClipboard(color)}
//                         onMouseEnter={() => setTooltip({ visible: true, color })}
//                         onMouseLeave={() => setTooltip({ visible: false, color: '' })}
//                       >
//                         <div className={`hexTooltip ${tooltip.visible && tooltip.color === color ? 'visible' : ''}`}>
//                           {color}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   {/* <div className="palette-info">
//                     <p className="palette-category">{palette.category}</p>
//                   </div> */}
//                 </div>
//               ))
//             ) : (
//               <p className="no-results">
//                 {searchQuery ? `No palettes found for "${searchQuery}"` : 'No palettes found'}
//               </p>
//             )}
//           </div>
//         )}
        
//       </div>
//       <BottomFooter/>
//     </>
    
//   );
// };

// ColorPaletteSearch.propTypes = {
//   colorData: PropTypes.shape({
//     categories: PropTypes.object.isRequired,
//     Palettes: PropTypes.object.isRequired,
//     categoryPalettes: PropTypes.object, // optional in this implementation
//     colorNames: PropTypes.object.isRequired
//   }).isRequired
// };

// export default ColorPaletteSearch;

import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './ColorPaletteSearch.css';
import colorData from '../Palattes/Data/colorPalettes';
import BottomFooter from '../Footer/BottomFooter';

const ColorPaletteSearch = ({ colorData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPalettes, setFilteredPalettes] = useState([]);
  const [displayedPalettes, setDisplayedPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, color: '' });
  const [page, setPage] = useState(1);
  const PALETTES_PER_PAGE = 12;

  // Initialize with all palettes
  useEffect(() => {
    const palettes = Object.entries(colorData.Palettes).map(([id, palette]) => ({
      id,
      colors: palette.colors,
      category: colorData.categories[palette.category_id]?.name || '',
      category_id: palette.category_id
    }));
    setFilteredPalettes(palettes);
    setDisplayedPalettes(palettes.slice(0, PALETTES_PER_PAGE));
  }, [colorData]);

  // Memoize categories for dropdown
  const categories = useMemo(() => {
    return Object.entries(colorData.categories).map(([id, category]) => ({
      id,
      name: category.name
    }));
  }, [colorData.categories]);

  // Search and filter function
  const filterPalettes = useCallback(() => {
    setIsLoading(true);
    
    let results = Object.entries(colorData.Palettes).map(([id, palette]) => ({
      id,
      colors: palette.colors,
      category: colorData.categories[palette.category_id]?.name || '',
      category_id: palette.category_id
    }));

    // Apply category filter first
    if (selectedCategory) {
      results = results.filter(palette => palette.category_id === selectedCategory);
    }

    // Then apply search query
    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      
      results = results.filter(palette => {
        // Check if palette ID matches
        if (palette.id.toLowerCase().includes(normalizedQuery)) return true;
        
        // Check if any color hex matches
        if (palette.colors.some(color => color.toLowerCase().includes(normalizedQuery))) {
          return true;
        }
        
        // Check if any color name matches in colorNames
        for (const [name, hexes] of Object.entries(colorData.colorNames)) {
          if (name.toLowerCase().includes(normalizedQuery) && 
              palette.colors.some(color => hexes.includes(color))) {
            return true;
          }
        }
        
        return false;
      });
    }

    setFilteredPalettes(results);
    setDisplayedPalettes(results.slice(0, PALETTES_PER_PAGE));
    setPage(1); // Reset to first page on new search
    setIsLoading(false);
  }, [searchQuery, selectedCategory, colorData]);

  // Handle loading more palettes on scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop < 
      document.documentElement.offsetHeight - 100 || 
      isLoading ||
      displayedPalettes.length >= filteredPalettes.length
    ) return;

    setIsLoading(true);
    const nextPage = page + 1;
    const newPalettes = filteredPalettes.slice(0, nextPage * PALETTES_PER_PAGE);
    setDisplayedPalettes(newPalettes);
    setPage(nextPage);
    setIsLoading(false);
  }, [page, isLoading, displayedPalettes.length, filteredPalettes.length]);

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Perform search when search button is clicked
  const handleSearch = (e) => {
    e.preventDefault();
    filterPalettes();
  };

  // Reset to show all palettes when search query is cleared
  useEffect(() => {
    if (searchQuery === '') {
      const allPalettes = Object.entries(colorData.Palettes).map(([id, palette]) => ({
        id,
        colors: palette.colors,
        category: colorData.categories[palette.category_id]?.name || '',
        category_id: palette.category_id
      }));
      setFilteredPalettes(allPalettes);
      setDisplayedPalettes(allPalettes.slice(0, PALETTES_PER_PAGE));
      setPage(1); // Reset to first page
    }
  }, [searchQuery, colorData]);

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      setTooltip({ visible: true, color });
      setTimeout(() => setTooltip({ visible: false, color: '' }), 2000);
    });
  };

  return (
    <>
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
            
            {/* <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select> */}
            
            <button type="submit" disabled={isLoading} className='SearchBtnn'>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {isLoading && displayedPalettes.length === 0 ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <div className="results-grid">
            {displayedPalettes.length > 0 ? (
              displayedPalettes.map((palette) => (
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
                </div>
              ))
            ) : (
              <p className="no-results">
                {searchQuery || selectedCategory ? 'No matching palettes found' : 'No palettes available'}
              </p>
            )}
          </div>
        )}
      </div>
      <BottomFooter/>
    </>
  );
};

ColorPaletteSearch.propTypes = {
  colorData: PropTypes.shape({
    categories: PropTypes.object.isRequired,
    Palettes: PropTypes.object.isRequired,
    categoryPalettes: PropTypes.object,
    colorNames: PropTypes.object.isRequired
  }).isRequired
};

export default ColorPaletteSearch;
