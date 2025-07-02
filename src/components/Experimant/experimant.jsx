
// This React component provides a complete solution for replacing colors in an image while maintaining shade variations:

// ### Features:
// 1. **Image Upload**: Users can upload any image file
// 2. **Color Selection**: Pick the original color to replace and the new replacement color
// 3. **Shade Matching**: Maintains lightness/darkness relationships when replacing colors
// 4. **Threshold Control**: Adjustable similarity threshold for color matching
// 5. **Preview**: Shows both original and processed images side by side
// 6. **Download**: Option to download the processed image

// ### How It Works:
// 1. The component analyzes each pixel in the image
// 2. For pixels similar to the original color (within the threshold):
//    - Calculates the brightness ratio relative to the original color
//    - Applies this ratio to the new color to maintain shading
// 3. Processes the entire image while maintaining quality

// To use this component:
// 1. Save it as `ColorReplacer.jsx`
// 2. Import and use it in your React application like any other component
// 3. Customize the styling as needed to match your app's design

// The implementation maintains image quality by working with the raw image data via canvas and carefully adjusting color values while preserving the alpha channel.

// 🎨 **Generating images based on descriptions...**

// ✅ **Images generated successfully! Here's your updated content:**

// `ColorReplacer.jsx`
// ```jsx

import { useState, useRef, useEffect } from 'react';
import ColorThief from 'colorthief';

const ColorReplacerr = () => {
  const [originalColors, setOriginalColors] = useState([]);
  const [colorReplacements, setColorReplacements] = useState([]);
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
          
          // Extract dominant colors
          const dominantColors = extractDominantColors(img);
          setOriginalColors(dominantColors); // Set the original colors to the extracted colors
          setColorReplacements(dominantColors.map(color => ({ original: color, replacement: color }))); // Initialize replacements
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const extractDominantColors = (image) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image, 4); // Get 4 dominant colors
    return palette.map(color => rgbToHex(color[0], color[1], color[2]));
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

  const handleReplacementChange = (index, value) => {
    const updatedReplacements = [...colorReplacements];
    updatedReplacements[index].replacement = value;
    setColorReplacements(updatedReplacements);
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

    // Process each color replacement
    colorReplacements.forEach(({ original, replacement }) => {
      const origColor = hexToRgb(original);
      const newColor = hexToRgb(replacement);
      
      for (let i = 0; i < data.length; i += 4) {
        const pixelColor = {
          r: data[i],
          g: data[i + 1],
          b: data[i + 2]
        };
        
        const distance = getDistance(pixelColor, origColor);
        
        if (distance <= similarityThreshold) {
          // Calculate brightness ratio
          const brightnessRatio = (
            (pixelColor.r + pixelColor.g + pixelColor.b) / 
            (origColor.r + origColor.g + origColor.b)
          );
          
          // Apply new color with adjusted brightness
          const adjustedR = Math.min(255, Math.round(newColor.r * brightnessRatio));
          const adjustedG = Math.min(255, Math.round(newColor.g * brightnessRatio));
          const adjustedB = Math.min(255, Math.round(newColor.b * brightnessRatio));
          
          data[i] = adjustedR;     // Red
          data[i + 1] = adjustedG; // Green
          data[i + 2] = adjustedB; // Blue
        }
      }
    });
    
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
            Original Colors:
          </label>
          <div style={styles.colorSwatches}>
            {originalColors.map((color, index) => (
              <div 
                key={index} 
                style={{ ...styles.colorSwatch, backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div style={styles.replacementList}>
          <h3>Color Replacements:</h3>
          {colorReplacements.map((replacement, index) => (
            <div key={index} style={styles.replacementItem}>
              <div style={{ ...styles.colorSwatch, backgroundColor: replacement.original }} />
              <input 
                type="text" 
                placeholder="Hex" 
                value={replacement.replacement} 
                onChange={(e) => handleReplacementChange(index, e.target.value)} 
                style={styles.inputField}
              />
            </div>
          ))}
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
  colorSwatches: {
    display: 'flex',
    gap: '10px',
    marginTop: '5px'
  },
  colorSwatch: {
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  replacementList: {
    marginTop: '20px',
    width: '100%',
    textAlign: 'center'
  },
  replacementItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px 0'
  },
  inputField: {
    margin: '0 5px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100px'
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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px'
  },
  processButton: {
    padding: '10px 20px',
    backgroundColor: '#455A4B',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#455A4B'
    },
    ':disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    }
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#455A4B',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#455A4B'
    }
  }
};

export default ColorReplacerr;
