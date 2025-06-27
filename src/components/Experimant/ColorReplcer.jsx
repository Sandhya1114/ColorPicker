

import { useState, useRef, useEffect } from 'react';
import { KMeans } from 'ml-kmeans'; // Make sure to install ml-kmeans

const ColorReplacer = () => {
  const [dominantColors, setDominantColors] = useState(['#ff0000', '#00ff00', '#0000ff', '#ffff00']);
  const [newColors, setNewColors] = useState(['#ff00ff', '#00ffff', '#ff8800', '#0088ff']);
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [similarityThreshold, setSimilarityThreshold] = useState(30);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setProcessedImage(null);
          extractDominantColors(img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const extractDominantColors = (img) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const colors = [];
    for (let i = 0; i < data.length; i += 4) {
      colors.push([data[i], data[i + 1], data[i + 2]]);
    }

    const kmeans = new KMeans({ k: 4 });
    const result = kmeans.cluster(colors);
    const dominantColorsRGB = result.centroids.map(color => color.map(Math.round));

    setDominantColors(dominantColorsRGB.map(color => rgbToHex(color[0], color[1], color[2])));
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getDistance = (color1, color2) => {
    return Math.sqrt(
      Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
    );
  };

  const adjustBrightness = (color, factor) => {
    return {
      r: Math.min(255, Math.max(0, Math.round(color.r * factor))),
      g: Math.min(255, Math.max(0, Math.round(color.g * factor))),
      b: Math.min(255, Math.max(0, Math.round(color.b * factor))),
    };
  };

  const processImage = () => {
    if (!image) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = image.width;
    canvas.height = image.height;
    
    // Draw original image
    ctx.drawImage(image, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const dominantColorsRGB = dominantColors.map(hexToRgb);
    const newColorsRGB = newColors.map(hexToRgb);
    
    for (let i = 0; i < data.length; i += 4) {
      const pixelColor = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2]
      };
      
      let matched = false;

      for (let j = 0; j < dominantColorsRGB.length; j++) {
        const distance = getDistance(pixelColor, dominantColorsRGB[j]);
        
        if (distance <= similarityThreshold) {
          matched = true;
          const brightnessRatio = (
            (pixelColor.r + pixelColor.g + pixelColor.b) / 
            (dominantColorsRGB[j].r + dominantColorsRGB[j].g + dominantColorsRGB[j].b)
          );

          const adjustedColor = adjustBrightness(newColorsRGB[j], brightnessRatio);
          data[i] = adjustedColor.r;
          data[i + 1] = adjustedColor.g;
          data[i + 2] = adjustedColor.b;
          break; // Exit the loop once a match is found
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    setProcessedImage(canvas.toDataURL());
    setIsProcessing(false);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'color-replaced.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (canvasRef.current && image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    }
  }, [image]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Color Replacer with Shade Matching</h1>
      
      <div style={styles.controls}>
        <div style={styles.colorPicker}>
          <label style={styles.label}>
            Dominant Colors:
            <div style={styles.colorPalette}>
              {dominantColors.map((color, index) => (
                <div key={index} style={{ ...styles.colorBox, backgroundColor: color }} />
              ))}
            </div>
          </label>
        </div>
        
        <div style={styles.colorPicker}>
          <label style={styles.label}>
            New Colors:
            <div style={styles.colorPalette}>
              {newColors.map((color, index) => (
                <input 
                  key={index}
                  type="color" 
                  value={color} 
                  onChange={(e) => {
                    const updatedColors = [...newColors];
                    updatedColors[index] = e.target.value;
                    setNewColors(updatedColors);
                  }}
                  style={styles.colorInput}
                />
              ))}
            </div>
          </label>
        </div>
        
        <div style={styles.sliderContainer}>
          <label style={styles.label}>
            Color Similarity Threshold:
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={similarityThreshold} 
              onChange={(e) => setSimilarityThreshold(parseInt(e.target.value))}
              style={styles.slider}
            />
            <span style={styles.thresholdValue}>{similarityThreshold}</span>
          </label>
        </div>
      </div>
      
      <div style={styles.imageSection}>
        <div style={styles.uploadArea}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={styles.fileInput}
            id="imageUpload"
          />
          <label htmlFor="imageUpload" style={styles.uploadLabel}>
            <div style={styles.uploadBox}>
              {image ? (
                <img 
                  src={image.src} 
                  alt="Original image preview" 
                  style={styles.previewImage}
                />
              ) : (
                <div style={styles.uploadText}>
                  <img 
                    src="https://placehold.co/100x100" 
                    alt="Upload icon" 
                    style={styles.uploadIcon}
                  />
                  <p>Click to upload image</p>
                </div>
              )}
            </div>
          </label>
        </div>
        
        <div style={styles.previewArea}>
          <h3>Processed Result:</h3>
          {processedImage ? (
            <img 
              src={processedImage} 
              alt="Processed image result" 
              style={styles.previewImage}
            />
          ) : (
            <div style={styles.emptyPreview}>
              <img 
                src="https://placehold.co/400x300" 
                alt="Processed image placeholder"
                style={styles.previewPlaceholder}
              />
              <p>Processed image will appear here</p>
            </div>
          )}
        </div>
      </div>
      
      <div style={styles.buttonGroup}>
        <button 
          onClick={processImage} 
          disabled={!image || isProcessing}
          style={styles.processButton}
        >
          {isProcessing ? 'Processing...' : 'Replace Colors'}
        </button>
        
        {processedImage && (
          <button 
            onClick={downloadImage} 
            style={styles.downloadButton}
          >
            Download Result
          </button>
        )}
      </div>
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  colorPicker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  label: {
    marginBottom: '5px',
    fontWeight: '500',
    color: '#444'
  },
  colorPalette: {
    display: 'flex',
    gap: '10px',
    marginTop: '5px'
  },
  colorBox: {
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  colorInput: {
    width: '70px',
    height: '30px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  sliderContainer: {
    width: '300px'
  },
  slider: {
    width: '100%',
    margin: '10px 0'
  },
  thresholdValue: {
    display: 'inline-block',
    marginLeft: '10px',
    fontWeight: 'bold'
  },
  imageSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  uploadArea: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '450px'
  },
  fileInput: {
    display: 'none'
  },
  uploadLabel: {
    display: 'block',
    cursor: 'pointer'
  },
  uploadBox: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    border: '2px dashed #ccc',
    transition: 'border-color 0.3s',
    minHeight: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      borderColor: '#888'
    }
  },
  uploadText: {
    color: '#666'
  },
  uploadIcon: {
    marginBottom: '10px'
  },
  previewArea: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '450px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  previewImage: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
    borderRadius: '4px'
  },
  emptyPreview: {
    textAlign: 'center',
    color: '#666',
    marginTop: '40px'
  },
  previewPlaceholder: {
    marginBottom: '10px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px'
  },
  processButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#45a049'
    },
    ':disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    }
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#0b7dda'
    }
  }
};

export default ColorReplacer;
// import React, { useState, useRef, useEffect } from 'react';

// const ColorReplacer = () => {
//   // State for color management
//   const [colorPairs, setColorPairs] = useState(
//     Array(4).fill().map((_, i) => ({
//       original: { 
//         hex: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'][i], 
//         locked: false,
//         frequency: 0 
//       },
//       replacement: { 
//         hex: ['#FF33C2', '#33FFF3', '#B533FF', '#A5FF33'][i], 
//         locked: false,
//         name: `Color ${i+1}`
//       }
//     }))
//   );

//   const [image, setImage] = useState(null);
//   const [processedImage, setProcessedImage] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [settings, setSettings] = useState({
//     similarityThreshold: 50,
//     preserveShades: true,
//     samplingResolution: 200,
//     colorSpace: 'lab', // 'rgb' or 'lab'
//     previewQuality: 'high' // 'high' or 'low'
//   });

//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);

//   // Convert RGB to LAB color space (better for human perception)
//   const rgbToLab = (r, g, b) => {
//     // First convert RGB to XYZ
//     r = r / 255;
//     g = g / 255;
//     b = b / 255;

//     r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
//     g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
//     b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

//     r = r * 100;
//     g = g * 100;
//     b = b * 100;

//     const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
//     const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
//     const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

//     // XYZ to LAB
//     const xRef = 95.047;
//     const yRef = 100.0;
//     const zRef = 108.883;

//     const xNormalized = x / xRef;
//     const yNormalized = y / yRef;
//     const zNormalized = z / zRef;

//     const fx = xNormalized > 0.008856 ? Math.pow(xNormalized, 1/3) : (7.787 * xNormalized) + (16 / 116);
//     const fy = yNormalized > 0.008856 ? Math.pow(yNormalized, 1/3) : (7.787 * yNormalized) + (16 / 116);
//     const fz = zNormalized > 0.008856 ? Math.pow(zNormalized, 1/3) : (7.787 * zNormalized) + (16 / 116);

//     const l = (116 * fy) - 16;
//     const a = 500 * (fx - fy);
//     const bVal = 200 * (fy - fz);

//     return [l, a, bVal];
//   };

//   // RGB to Hex conversion
//   const rgbToHex = (r, g, b) => {
//     return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
//   };

//   // Hex to RGB conversion
//   const hexToRgb = (hex) => {
//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? [
//       parseInt(result[1], 16),
//       parseInt(result[2], 16),
//       parseInt(result[3], 16)
//     ] : [0, 0, 0];
//   };

//   // Calculate color distance based on selected color space
//   const colorDistance = (c1, c2) => {
//     if (settings.colorSpace === 'lab') {
//       // Using CIE76 formula for LAB color distance
//       return Math.sqrt(
//         Math.pow(c1[0] - c2[0], 2) +
//         Math.pow(c1[1] - c2[1], 2) +
//         Math.pow(c1[2] - c2[2], 2)
//       );
//     } else {
//       // RGB distance
//       return Math.sqrt(
//         Math.pow(c1[0] - c2[0], 2) +
//         Math.pow(c1[1] - c2[1], 2) +
//         Math.pow(c1[2] - c2[2], 2)
//       );
//     }
//   };

//   // Median Cut algorithm for color quantization
//   const medianCutQuantization = (pixels, depth = 0, maxDepth = 2) => {
//     if (depth >= maxDepth || pixels.length === 0) {
//       // Calculate average color for this box
//       const avg = pixels.reduce((acc, val) => {
//         return [acc[0] + val[0], acc[1] + val[1], acc[2] + val[2]];
//       }, [0, 0, 0]).map(v => Math.round(v / pixels.length));
//       return [avg];
//     }

//     // Find which color channel has the greatest range
//     const channels = pixels.reduce((acc, color) => {
//       return {
//         r: { min: Math.min(acc.r.min, color[0]), max: Math.max(acc.r.max, color[0]) },
//         g: { min: Math.min(acc.g.min, color[1]), max: Math.max(acc.g.max, color[1]) },
//         b: { min: Math.min(acc.b.min, color[2]), max: Math.max(acc.b.max, color[2]) }
//       };
//     }, { r: { min: 256, max: 0 }, g: { min: 256, max: 0 }, b: { min: 256, max: 0 } });

//     const ranges = {
//       r: channels.r.max - channels.r.min,
//       g: channels.g.max - channels.g.min,
//       b: channels.b.max - channels.b.min
//     };

//     const channelToSort = ranges.r > ranges.g && ranges.r > ranges.b ? 0 : 
//                          ranges.g > ranges.b ? 1 : 2;

//     // Sort pixels by the channel with greatest range
//     pixels.sort((a, b) => a[channelToSort] - b[channelToSort]);

//     // Split at median and recurse
//     const median = Math.floor(pixels.length / 2);
//     return [
//       ...medianCutQuantization(pixels.slice(0, median), depth + 1, maxDepth),
//       ...medianCutQuantization(pixels.slice(median), depth + 1, maxDepth)
//     ];
//   };

//   // Extract dominant colors from image
//   const extractDominantColors = (img) => {
//     setIsProcessing(true);
    
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const size = settings.samplingResolution;
//     canvas.width = size;
//     canvas.height = size;
    
//     // Draw and scale image
//     ctx.drawImage(img, 0, 0, size, size);
//     const imageData = ctx.getImageData(0, 0, size, size);
//     const data = imageData.data;
    
//     // Collect pixel colors (sample every few pixels for performance)
//     const pixels = [];
//     const step = settings.previewQuality === 'high' ? 4 : 8;
//     for (let i = 0; i < data.length; i += 4 * step) {
//       pixels.push([data[i], data[i+1], data[i+2]]);
//     }

//     // Use median cut algorithm for color quantization
//     const dominantColors = medianCutQuantization(pixels)
//       .slice(0, 4) // Get top 4 colors
//       .sort((a, b) => (b[0]+b[1]+b[2]) - (a[0]+a[1]+a[2])); // Sort by brightness

//     // Calculate frequencies for each dominant color
//     const colorFrequencies = dominantColors.map(color => {
//       return pixels.reduce((count, pixel) => {
//         return count + (colorDistance(color, pixel) < 30 ? 1 : 0);
//       }, 0);
//     });

//     // Update original colors (only unlocked ones)
//     setColorPairs(prev => {
//       return prev.map((pair, i) => {
//         if (i >= dominantColors.length) return pair;
//         return {
//           ...pair,
//           original: pair.original.locked ? pair.original : { 
//             ...pair.original, 
//             hex: rgbToHex(...dominantColors[i]),
//             frequency: colorFrequencies[i] 
//           }
//         };
//       });
//     });

//     setIsProcessing(false);
//   };

//   // Process image with color replacement
//   const processImage = () => {
//     if (!image) return;
//     setIsProcessing(true);
    
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const scale = settings.previewQuality === 'high' ? 1 : 0.5;
    
//     canvas.width = image.width * scale;
//     canvas.height = image.height * scale;
//     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     // Prepare color mappings (pre-convert to LAB if needed)
//     const originalColors = colorPairs.map(pair => 
//       settings.colorSpace === 'lab' 
//         ? rgbToLab(...hexToRgb(pair.original.hex)) 
//         : hexToRgb(pair.original.hex)
//     );
//     const replacementColors = colorPairs.map(pair => hexToRgb(pair.replacement.hex));

//     // Calculate brightness for original/replacement pairs (for shade preservation)
//     const brightnessRatios = colorPairs.map((pair, i) => {
//       const origRgb = hexToRgb(pair.original.hex);
//       const replRgb = hexToRgb(pair.replacement.hex);
//       return {
//         originalBrightness: 0.299*origRgb[0] + 0.587*origRgb[1] + 0.114*origRgb[2],
//         replacementBrightness: 0.299*replRgb[0] + 0.587*replRgb[1] + 0.114*replRgb[2]
//       };
//     });

//     // Process each pixel
//     for (let i = 0; i < data.length; i += 4) {
//       const r = data[i], g = data[i+1], b = data[i+2];
//       const currentColor = settings.colorSpace === 'lab' 
//         ? rgbToLab(r, g, b) 
//         : [r, g, b];
      
//       // Find closest original color
//       let closestIndex = 0;
//       let minDistance = colorDistance(currentColor, originalColors[0]);
      
//       for (let j = 1; j < originalColors.length; j++) {
//         const distance = colorDistance(currentColor, originalColors[j]);
//         if (distance < minDistance) {
//           minDistance = distance;
//           closestIndex = j;
//         }
//       }

//       // Replace if within threshold
//       if (minDistance <= settings.similarityThreshold) {
//         const replacement = replacementColors[closestIndex];
        
//         if (settings.preserveShades) {
//           // Calculate current brightness relative to original brightness
//           const currentBrightness = 0.299*r + 0.587*g + 0.114*b;
//           const { originalBrightness, replacementBrightness } = brightnessRatios[closestIndex];
          
//           // Maintain brightness ratio
//           const brightnessRatio = currentBrightness / originalBrightness;
//           const adjustedBrightness = replacementBrightness * brightnessRatio;
//           const adjustment = adjustedBrightness / replacementBrightness;

//           // Scale the replacement color while preserving hue
//           data[i] = Math.max(0, Math.min(255, Math.round(replacement[0] * adjustment)));
//           data[i+1] = Math.max(0, Math.min(255, Math.round(replacement[1] * adjustment)));
//           data[i+2] = Math.max(0, Math.min(255, Math.round(replacement[2] * adjustment)));
//         } else {
//           // Simple replacement
//           data[i] = replacement[0];
//           data[i+1] = replacement[1];
//           data[i+2] = replacement[2];
//         }
//       }
//     }

//     ctx.putImageData(imageData, 0, 0);
//     setProcessedImage(canvas.toDataURL());
//     setIsProcessing(false);
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const img = new Image();
//       img.onload = () => {
//         setImage(img);
//         setProcessedImage(null);
//         extractDominantColors(img);
//       };
//       img.src = event.target.result;
//     };
//     reader.readAsDataURL(file);
//   };

//   // Update color
//   const updateColor = (type, index, hex) => {
//     setColorPairs(prev => {
//       const updated = [...prev];
//       updated[index] = {
//         ...updated[index],
//         [type]: { ...updated[index][type], hex }
//       };
//       return updated;
//     });
//   };

//   // Toggle color lock
//   const toggleLock = (type, index) => {
//     setColorPairs(prev => {
//       const updated = [...prev];
//       updated[index] = {
//         ...updated[index],
//         [type]: { ...updated[index][type], locked: !updated[index][type].locked }
//       };
//       return updated;
//     });
//   };

//   // Download processed image
//   const downloadImage = () => {
//     if (!processedImage) return;
//     const link = document.createElement('a');
//     link.href = processedImage;
//     link.download = 'color-replaced.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   useEffect(() => {
//     if (canvasRef.current && image) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       const size = settings.previewQuality === 'high' ? 300 : 150;
//       canvas.width = size;
//       canvas.height = size;
      
//       // Maintain aspect ratio
//       const ratio = Math.min(
//         size / image.width,
//         size / image.height
//       );
//       const newWidth = image.width * ratio;
//       const newHeight = image.height * ratio;
      
//       ctx.clearRect(0, 0, size, size);
//       ctx.drawImage(
//         image, 
//         (size - newWidth)/2, 
//         (size - newHeight)/2, 
//         newWidth, 
//         newHeight
//       );
//     }
//   }, [image, settings.previewQuality]);

//   return (
//     <div className="color-replacer-app">
//       <header>
//         <h1>Advanced Color Replacer</h1>
//         <p>Upload an image to extract and replace dominant colors</p>
//       </header>

//       <main>
//         {/* Settings Panel */}
//         <div className="settings-panel">
//           <div className="settings-group">
//             <h3>Color Settings</h3>
//             <label>
//               Color Space:
//               <select
//                 value={settings.colorSpace}
//                 onChange={e => setSettings({...settings, colorSpace: e.target.value})}
//               >
//                 <option value="rgb">RGB</option>
//                 <option value="lab">CIELAB (Perceptual)</option>
//               </select>
//             </label>
//             <label>
//               Similarity Threshold:
//               <input
//                 type="range"
//                 min="1"
//                 max="150"
//                 value={settings.similarityThreshold}
//                 onChange={e => setSettings({...settings, similarityThreshold: parseInt(e.target.value)})}
//               />
//               {settings.similarityThreshold}
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={settings.preserveShades}
//                 onChange={e => setSettings({...settings, preserveShades: e.target.checked})}
//               />
//               Preserve Shades
//             </label>
//           </div>

//           <div className="settings-group">
//             <h3>Performance Settings</h3>
//             <label>
//               Sample Resolution:
//               <input
//                 type="range"
//                 min="50"
//                 max="300"
//                 value={settings.samplingResolution}
//                 onChange={e => setSettings({...settings, samplingResolution: parseInt(e.target.value)})}
//               />
//               {settings.samplingResolution}px
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={settings.previewQuality === 'high'}
//                 onChange={e => setSettings({...settings, previewQuality: e.target.checked ? 'high' : 'low'})}
//               />
//               High Quality Preview
//             </label>
//           </div>
//         </div>

//         {/* Color Palettes */}
//         <div className="palette-container">
//           <div className="palette original-colors">
//             <h3>Extracted Colors</h3>
//             <div className="color-grid">
//               {colorPairs.map((pair, i) => (
//                 <div className="color-item" key={`original-${i}`}>
//                   <div className="color-header">
//                     <button
//                       className={`lock-btn ${pair.original.locked ? 'locked' : ''}`}
//                       onClick={() => toggleLock('original', i)}
//                       title={pair.original.locked ? 'Unlock color' : 'Lock color'}
//                     >
//                       {pair.original.locked ? '🔒' : '🔓'}
//                     </button>
//                     <span>Color {i+1}</span>
//                   </div>
//                   <div className="color-preview" style={{ backgroundColor: pair.original.hex }}>
//                     <input
//                       type="color"
//                       value={pair.original.hex}
//                       onChange={e => updateColor('original', i, e.target.value)}
//                       className="color-picker"
//                     />
//                   </div>
//                   <div className="color-info">
//                     <div className="hex-value">{pair.original.hex}</div>
//                     {pair.original.frequency > 0 && (
//                       <div className="frequency">{Math.round((pair.original.frequency / 1000) * 100)}%</div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="palette replacement-colors">
//             <h3>Replacement Colors</h3>
//             <div className="color-grid">
//               {colorPairs.map((pair, i) => (
//                 <div className="color-item" key={`replacement-${i}`}>
//                   <div className="color-header">
//                     <button
//                       className={`lock-btn ${pair.replacement.locked ? 'locked' : ''}`}
//                       onClick={() => toggleLock('replacement', i)}
//                       title={pair.replacement.locked ? 'Unlock color' : 'Lock color'}
//                     >
//                       {pair.replacement.locked ? '🔒' : '🔓'}
//                     </button>
//                     <span>Color {i+1}</span>
//                   </div>
//                   <div className="color-preview" style={{ backgroundColor: pair.replacement.hex }}>
//                     <input
//                       type="color"
//                       value={pair.replacement.hex}
//                       onChange={e => updateColor('replacement', i, e.target.value)}
//                       className="color-picker"
//                     />
//                   </div>
//                   <div className="color-info">
//                     <div className="hex-value">{pair.replacement.hex}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Image Upload and Preview */}
//         <div className="image-panel">
//           <div className="upload-area">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               ref={fileInputRef}
//               id="imageUpload"
//               className="file-input"
//             />
//             <label htmlFor="imageUpload" className="upload-button">
//               {image ? (
//                 <>
//                   <canvas ref={canvasRef} className="image-preview" />
//                   <span className="change-image">Change Image</span>
//                 </>
//               ) : (
//                 <div className="upload-prompt">
//                   <div className="upload-icon">📁</div>
//                   <p>Click to upload image</p>
//                 </div>
//               )}
//             </label>
//           </div>

//           <div className="preview-area">
//             <h3>Preview Result</h3>
//             {processedImage ? (
//               <img src={processedImage} alt="Processed preview" className="processed-preview" />
//             ) : (
//               <div className="empty-preview">
//                 <div className="placeholder">Processed result will appear here</div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="action-buttons">
//           <button
//             onClick={processImage}
//             disabled={!image || isProcessing}
//             className={`process-btn ${isProcessing ? 'processing' : ''}`}
//           >
//             {isProcessing ? 'Processing...' : 'Apply Color Replacement'}
//           </button>
          
//           {processedImage && (
//             <button onClick={downloadImage} className="download-btn">
//               Download Result
//             </button>
//           )}
//         </div>
//       </main>

//       <style jsx>{`
//         .color-replacer-app {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           color: #333;
//         }
        
//         header {
//           text-align: center;
//           margin-bottom: 30px;
//         }
        
//         h1, h2, h3 {
//           color: #444;
//         }
        
//         .settings-panel {
//           display: flex;
//           gap: 20px;
//           margin-bottom: 30px;
//           flex-wrap: wrap;
//         }
        
//         .settings-group {
//           flex: 1;
//           min-width: 300px;
//           background: #f8f9fa;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 2px 5px rgba(0,0,0,0.1);
//         }
        
//         label {
//           display: block;
//           margin-bottom: 15px;
//         }
        
//         input[type="range"] {
//           width: 100%;
//         }
        
//         select, input[type="color"] {
//           padding: 5px;
//           border-radius: 4px;
//           border: 1px solid #ddd;
//         }
        
//         .palette-container {
//           display: flex;
//           gap: 20px;
//           margin-bottom: 30px;
//           flex-wrap: wrap;
//         }
        
//         .palette {
//           flex: 1;
//           min-width: 300px;
//           background: #f8f9fa;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 2px 5px rgba(0,0,0,0.1);
//         }
        
//         .color-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 15px;
//         }
        
//         .color-item {
//           background: white;
//           padding: 10px;
//           border-radius: 6px;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//         }
        
//         .color-header {
//           display: flex;
//           align-items: center;
//           margin-bottom: 10px;
//         }
        
//         .lock-btn {
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-size: 16px;
//           margin-right: 8px;
//         }
        
//         .lock-btn.locked {
//           color: #f44;
//         }
        
//         .color-preview {
//           width: 100%;
//           height: 60px;
//           border-radius: 4px;
//           position: relative;
//           overflow: hidden;
//           margin-bottom: 8px;
//           cursor: pointer;
//         }
        
//         .color-picker {
//           position: absolute;
//           opacity: 0;
//           width: 100%;
//           height: 100%;
//           cursor: pointer;
//         }
        
//         .color-info {
//           display: flex;
//           justify-content: space-between;
//         }
        
//         .hex-value {
//           font-family: monospace;
//           font-size: 14px;
//           color: #666;
//         }
        
//         .frequency {
//           font-size: 12px;
//           color: #666;
//         }
        
//         .image-panel {
//           display: flex;
//           gap: 20px;
//           margin-bottom: 20px;
//           flex-wrap: wrap;
//         }
        
//         .upload-area, .preview-area {
//           flex: 1;
//           min-width: 300px;
//         }
        
//         .file-input {
//           display: none;
//         }
        
//         .upload-button {
//           display: block;
//           background: #f8f9fa;
//           border: 2px dashed #ccc;
//           border-radius: 8px;
//           height: 300px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s;
//           overflow: hidden;
//           position: relative;
//         }
        
//         .upload-button:hover {
//           border-color: #999;
//         }
        
//         .image-preview {
//           width: 100%;
//           height: 100%;
//           object-fit: contain;
//         }
        
//         .change-image {
//           position: absolute;
//           background: rgba(0,0,0,0.7);
//           color: white;
//           padding: 8px 16px;
//           border-radius: 20px;
//           font-size: 14px;
//         }
        
//         .upload-prompt {
//           text-align: center;
//         }
        
//         .upload-icon {
//           font-size: 40px;
//           margin-bottom: 10px;
//         }
        
//         .processed-preview {
//           width: 100%;
//           max-height: 300px;
//           object-fit: contain;
//           background: #f8f9fa;
//           border-radius: 8px;
//         }
        
//         .empty-preview {
//           background: #f8f9fa;
//           border: 2px dashed #ccc;
//           border-radius: 8px;
//           height: 300px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #666;
//         }
        
//         .action-buttons {
//           display: flex;
//           justify-content: center;
//           gap: 15px;
//           margin-top: 30px;
//         }
        
//         .process-btn, .download-btn {
//           padding: 12px 24px;
//           border: none;
//           border-radius: 4px;
//           font-size: 16px;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
        
//         .process-btn {
//           background: #4CAF50;
//           color: white;
//         }
        
//         .process-btn:hover {
//           background: #45a049;
//         }
        
//         .process-btn:disabled {
//           background: #ccc;
//           cursor: not-allowed;
//         }
        
//         .process-btn.processing {
//           position: relative;
//           padding-right: 40px;
//         }
        
//         .process-btn.processing:after {
//           content: '';
//           position: absolute;
//           right: 10px;
//           top: 50%;
//           width: 20px;
//           height: 20px;
//           margin-top: -10px;
//           border: 2px solid rgba(255,255,255,0.3);
//           border-radius: 50%;
//           border-top-color: white;
//           animation: spin 1s linear infinite;
//         }
        
//         .download-btn {
//           background: #2196F3;
//           color: white;
//         }
        
//         .download-btn:hover {
//           background: #0b7dda;
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ColorReplacer;



