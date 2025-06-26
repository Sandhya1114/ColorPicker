// ImagePaletteChanger.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ImagePaletteChanger.css';

const ImagePaletteChanger = () => {
  // Define color palettes
  const palettes = {
    pastel: [
      '#FFD1DC', '#FFECB8', '#B5EAD7', '#C7CEEA', '#E2F0CB',
      '#FFDAC1', '#B4E0FF', '#D4A5A5', '#A7C4BC', '#F7D488'
    ],
    vintage: [
      '#8B5A2B', '#A67C52', '#D5B185', '#F5D0A9', '#7E6B54',
      '#9C8B6F', '#C0B094', '#E5D8B8', '#6B5C4D', '#A39382'
    ],
    bright: [
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
      '#00FFFF', '#FF6600', '#6600FF', '#FF0066', '#66FF00'
    ],
    custom: []
  };

  // State
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedPalette, setSelectedPalette] = useState('pastel');
  const [customPalette, setCustomPalette] = useState([]);
  const [intensity, setIntensity] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const originalCanvasRef = useRef(null);
  const modifiedCanvasRef = useRef(null);

  // Initialize with default palette
  useEffect(() => {
    updatePalettePreview('pastel');
  }, []);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setCurrentImage(img);
        
        // Get canvas contexts
        const originalCtx = originalCanvasRef.current.getContext('2d');
        const modifiedCtx = modifiedCanvasRef.current.getContext('2d');
        
        // Calculate dimensions to maintain aspect ratio
        const maxWidth = 400;
        const maxHeight = 300;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        // Set canvas dimensions
        originalCanvasRef.current.width = width;
        originalCanvasRef.current.height = height;
        modifiedCanvasRef.current.width = width;
        modifiedCanvasRef.current.height = height;
        
        // Draw original image
        originalCtx.drawImage(img, 0, 0, width, height);
        // Copy to modified canvas
        modifiedCtx.drawImage(img, 0, 0, width, height);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      fileInputRef.current.files = e.dataTransfer.files;
      const event = new Event('change');
      fileInputRef.current.dispatchEvent(event);
    }
  };

  // Handle palette change
  const handlePaletteChange = (e) => {
    const value = e.target.value;
    setSelectedPalette(value);
  };

  // Update palette preview
  const updatePalettePreview = (paletteName) => {
    return palettes[paletteName].map((color, index) => (
      <div 
        key={index} 
        className="color-swatch"
        style={{ backgroundColor: color }}
      />
    ));
  };

  // Add custom color
  const addCustomColor = () => {
    const color = document.getElementById('customColorPicker').value;
    if (!customPalette.includes(color)) {
      const newCustomPalette = [...customPalette, color];
      setCustomPalette(newCustomPalette);
      palettes.custom = newCustomPalette;
    }
  };

  // Remove custom color
  const removeCustomColor = (color) => {
    const newCustomPalette = customPalette.filter(c => c !== color);
    setCustomPalette(newCustomPalette);
    palettes.custom = newCustomPalette;
  };

  // Get current palette colors
  const getCurrentPalette = () => {
    return selectedPalette === 'custom' ? customPalette : palettes[selectedPalette];
  };

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    return [
      (bigint >> 16) & 255,
      (bigint >> 8) & 255,
      bigint & 255
    ];
  };

  // Calculate color distance
  const colorDistance = (color1, color2) => {
    const dr = color1[0] - color2[0];
    const dg = color1[1] - color2[1];
    const db = color1[2] - color2[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  // Find closest color
  const findClosestColor = (rgbColor, paletteRGB) => {
    let minDistance = Infinity;
    let closestColor = paletteRGB[0];
    
    for (const paletteColor of paletteRGB) {
      const distance = colorDistance(rgbColor, paletteColor);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = paletteColor;
      }
    }
    
    return closestColor;
  };

  // Apply palette
  const applyPalette = () => {
    if (!currentImage) return;
    
    const paletteColors = getCurrentPalette();
    const paletteRGB = paletteColors.map(hexToRgb);
    const intensityFactor = intensity / 100;
    
    const modifiedCtx = modifiedCanvasRef.current.getContext('2d');
    modifiedCtx.drawImage(currentImage, 0, 0, 
      modifiedCanvasRef.current.width, modifiedCanvasRef.current.height);
    
    const imageData = modifiedCtx.getImageData(
      0, 0, 
      modifiedCanvasRef.current.width, 
      modifiedCanvasRef.current.height
    );
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const closestColor = findClosestColor([r, g, b], paletteRGB);
      
      data[i] = r + (closestColor[0] - r) * intensityFactor;
      data[i + 1] = g + (closestColor[1] - g) * intensityFactor;
      data[i + 2] = b + (closestColor[2] - b) * intensityFactor;
    }
    
    modifiedCtx.putImageData(imageData, 0, 0);
  };

  // Download image
  const downloadImage = () => {
    if (!currentImage) return;
    
    const link = document.createElement('a');
    link.download = 'modified-image.png';
    link.href = modifiedCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="image-palette-container">
      <div className="header">
        <h1>Image Palette Changer</h1>
      </div>
      
      <div className="main-content">
        {/* Left Column - Controls */}
        <div className="controls-section">
          <div className="upload-section">
            <label>Upload Image</label>
            <div 
              className={`dropzone ${isDragging ? 'dragover' : ''}`}
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p>Drag and drop your image here, or click to select</p>
              <input 
                type="file" 
                ref={fileInputRef}
                className="file-input"
                accept="image/*" 
                onChange={handleFileSelect}
              />
            </div>
            <div className="file-info">
              Supported formats: JPG, PNG, GIF
            </div>
          </div>

          <div className="palette-selection">
            <label>Select Palette</label>
            <select 
              value={selectedPalette}
              onChange={handlePaletteChange}
            >
              <option value="pastel">Pastel Colors</option>
              <option value="vintage">Vintage Colors</option>
              <option value="bright">Bright Colors</option>
              <option value="custom">Custom Colors</option>
            </select>
          </div>

          <div className="palette-preview">
            <label>Color Palette</label>
            <div className="color-palette">
              {selectedPalette === 'custom' 
                ? customPalette.map((color, index) => (
                    <div 
                      key={index} 
                      className="color-swatch"
                      style={{ backgroundColor: color }}
                    >
                      <span 
                        className="remove-color"
                        onClick={() => removeCustomColor(color)}
                      >
                        ×
                      </span>
                    </div>
                  ))
                : updatePalettePreview(selectedPalette)}
            </div>
          </div>

          {selectedPalette === 'custom' && (
            <div className="custom-colors">
              <label>Custom Colors</label>
              <div className="color-picker-container">
                <input 
                  type="color" 
                  id="customColorPicker"
                  defaultValue="#ff0000"
                  className="color-picker"
                />
                <button 
                  className="add-color-btn"
                  onClick={addCustomColor}
                >
                  Add Color
                </button>
              </div>
            </div>
          )}

          <div className="intensity-control">
            <label>
              Color Mapping Intensity: {intensity}%
            </label>
            <input 
              type="range"
              min="1"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
            />
          </div>

          <div className="action-buttons">
            <button 
              className="apply-btn"
              disabled={!currentImage}
              onClick={applyPalette}
            >
              Apply Palette
            </button>
            <button 
              className="download-btn"
              disabled={!currentImage}
              onClick={downloadImage}
            >
              Download Image
            </button>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="results-section">
          <div className="canvas-headers">
            <h2>Original Image</h2>
            <h2>Modified Image</h2>
          </div>
          <div className="canvas-container">
            <div>
              <canvas 
                ref={originalCanvasRef}
                width="400"
                height="300"
              />
            </div>
            <div>
              <canvas 
                ref={modifiedCanvasRef}
                width="400"
                height="300"
              />
            </div>
          </div>
          <div className="canvas-info">
            <p>Left: Your original image</p>
            <p>Right: Image with the selected color palette applied</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePaletteChanger;
