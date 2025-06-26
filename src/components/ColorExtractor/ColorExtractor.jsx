
// import { useState, useEffect } from 'react';
// import ColorThief from 'colorthief';
// import './ColorExtractor.css';
// import PaletteGrid from '../Palattes/PaletteGrid';


// function rgbToHex(r, g, b) {
//   return (
//     '#' +
//     [r, g, b]
//       .map((x) => {
//         const hex = x.toString(16);
//         return hex.length === 1 ? '0' + hex : hex;
//       })
//       .join('')
//   );
// }

// export default function ColorExtractor({ history, setHistory, initialItem }) {
//   const [imageSrc, setImageSrc] = useState(initialItem?.src || null);
//   const [colors, setColors] = useState(initialItem?.palette || []);

//   useEffect(() => {
//     if (initialItem) {
//       setImageSrc(initialItem.src);
//       setColors(initialItem.palette);
//     }
//   }, [initialItem]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setImageSrc(event.target.result);
//       setColors([]);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleImgLoad = (e) => {
//     const img = e.target;
//     if (img.complete && img.naturalWidth > 0) {
//       const palette = new ColorThief().getPalette(img, 5);
//       setColors(palette);
//       setHistory((prev) => {
//         const duplicate = prev.some(
//           (item) =>
//             item.src === imageSrc &&
//             JSON.stringify(item.palette) === JSON.stringify(palette)
//         );
//         return duplicate ? prev : [{ src: imageSrc, palette }, ...prev];
//       });
//     }
//   };

//   return (
//     <div className='forDivieded'>
//     <div className="mainContainer">
//       <div className="leftPanel">
//         <div className="file-input">
//           <h1 className="title">Upload an Image</h1>
//           <h2 className="subtitle">The easiest place to get colors from your photos</h2>
//           <label htmlFor="file">Select file</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="fileInput file"
//             id="file"
//           />
//         </div>
//       </div>
//        {/* https://images.unsplash.com/photo-1699043787902-84a29a6a286a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYXV0aWZ1bCUyMGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D */}
//       <div className="rightPanel">
//         {imageSrc && (
//           <>
//             <img
//               src={imageSrc}
//               alt="Uploaded"
//               crossOrigin="anonymous"
//               onLoad={handleImgLoad}
//               className="imagePreview"
//             />
//             <div className="colorGrid">
//               {colors.map((col, i) => {
//                 const hex = rgbToHex(...col);
//                 return (
//                   <div key={i} className="colorSwatch">
//                     <div className="colorBox" style={{ backgroundColor: hex }} />
//                     <span className="hexCode">{hex}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//     <div>
//       <PaletteGrid />
//       {/* <SearchPalettes /> */}
//     </div>
    
//   </div>
//   );
// }
import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import './ColorExtractor.css';
import PaletteGrid from '../Palattes/PaletteGrid';
import BottomFooter from '../Footer/BottomFooter';
import { useNavigate } from 'react-router-dom';

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

const dummyImage =
  'https://images.unsplash.com/photo-1699043787902-84a29a6a286a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYXV0aWZ1bCUyMGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D';

export default function ColorExtractor({ history,user,setUser, setHistory, initialItem }) {
  const [imageSrc, setImageSrc] = useState(initialItem?.src || dummyImage);
  const [colors, setColors] = useState(initialItem?.palette || []);
  const navigate = useNavigate();

  const handleProtectedNav = (path) => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: path,
          message: 'Please sign in to access this feature'
        } 
      });
    } else {
      navigate(path);
    }
  };
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
      setColors([]); // reset while loading new palette
    };
    reader.readAsDataURL(file);
  };

  const handleImgLoad = (e) => {
    const img = e.target;
    if (img.complete && img.naturalWidth > 0) {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 5);
        setColors(palette);

        setHistory((prev) => {
          const duplicate = prev.some(
            (item) =>
              item.src === imageSrc &&
              JSON.stringify(item.palette) === JSON.stringify(palette)
          );
          return duplicate ? prev : [{ src: imageSrc, palette }, ...prev];
        });
      } catch (error) {
        console.error('Color extraction failed:', error);
      }
    }
  };

  return (
    <div className="forDivieded">
      {history.length > 0 && (
            <button 
              onClick={() => handleProtectedNav('/history')}
              className="nav-link history-btn"
            >
              View History
            </button>
          )}
      <div className="mainContainer">
        <div className="leftPanel">
          <div className="file-input">
            <h1 className="title">Upload an Image</h1>
            <h2 className="subtitle">
              The easiest place to get colors from your photos
            </h2>
            <label htmlFor="file">Select Image</label>
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
                      <div
                        className="colorBox"
                        style={{ backgroundColor: hex }}
                      />
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
        <BottomFooter/>
      </div>
    </div>
  );
}
