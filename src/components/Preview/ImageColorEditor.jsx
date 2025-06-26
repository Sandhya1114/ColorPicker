
// import { useEffect, useRef, useState } from 'react';
// import './ImageColorEditor.css'; 
// import BottomFooter from '../Footer/BottomFooter';

// const ImageColorEditor = () => {
//     const dropAreaRef = useRef(null);
//     const fileInputRef = useRef(null);
//     const imageCanvasRef = useRef(null);
//     const [originalImageData, setOriginalImageData] = useState(null);
//     const [currentImageData, setCurrentImageData] = useState(null);
//     const [originalImage, setOriginalImage] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [targetColor, setTargetColor] = useState('#000000');
//     const [replacementColor, setReplacementColor] = useState('#FFFFFF');
//     const [tolerance, setTolerance] = useState(30);

//     useEffect(() => {
//         const dropArea = dropAreaRef.current;

//         const preventDefaults = (e) => {
//             e.preventDefault();
//             e.stopPropagation();
//         };

//         const highlight = () => {
//             dropArea.classList.add('highlight');
//         };

//         const unhighlight = () => {
//             dropArea.classList.remove('highlight');
//         };

//         const handleDrop = (e) => {
//             const dt = e.dataTransfer;
//             const files = dt.files;
//             handleFiles({ target: { files } });
//         };

//         dropArea.addEventListener('dragenter', preventDefaults);
//         dropArea.addEventListener('dragover', preventDefaults);
//         dropArea.addEventListener('dragleave', preventDefaults);
//         dropArea.addEventListener('drop', handleDrop);
//         dropArea.addEventListener('click', () => fileInputRef.current.click());

//         return () => {
//             dropArea.removeEventListener('dragenter', preventDefaults);
//             dropArea.removeEventListener('dragover', preventDefaults);
//             dropArea.removeEventListener('dragleave', preventDefaults);
//             dropArea.removeEventListener('drop', handleDrop);
//         };
//     }, []);

//     const handleFiles = (e) => {
//         const files = e.target.files;
//         if (files.length) {
//             processImage(files[0]);
//         }
//     };

//     const processImage = (file) => {
//         showLoading();
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const img = new Image();
//             img.onload = () => {
//                 setOriginalImage(img);
//                 const canvas = imageCanvasRef.current;
//                 const ctx = canvas.getContext('2d');

//                 const maxWidth = 600;
//                 const maxHeight = 400;
//                 let width = img.width;
//                 let height = img.height;

//                 if (width > maxWidth) {
//                     height = Math.round((maxWidth / width) * height);
//                     width = maxWidth;
//                 }

//                 if (height > maxHeight) {
//                     width = Math.round((maxHeight / height) * width);
//                     height = maxHeight;
//                 }

//                 canvas.width = width;
//                 canvas.height = height;
//                 ctx.drawImage(img, 0, 0, width, height);
//                 setOriginalImageData(ctx.getImageData(0, 0, width, height));
//                 setCurrentImageData(ctx.getImageData(0, 0, width, height));
//                 hideLoading();
//             };
//             img.onerror = () => {
//                 hideLoading();
//                 alert('Error loading image. Please try another file.');
//             };
//             img.src = event.target.result;
//         };
//         reader.readAsDataURL(file);
//     };

//     const showLoading = () => {
//         setLoading(true);
//     };

//     const hideLoading = () => {
//         setLoading(false);
//     };

//     const replaceColor = () => {
//         if (!targetColor || !replacementColor) {
//             alert('Please enter both target and replacement colors');
//             return;
//         }

//         if (!isValidHex(targetColor) || !isValidHex(replacementColor)) {
//             alert('Please enter valid hex color codes (e.g., #FF0000 or #F00)');
//             return;
//         }

//         showLoading();
//         const targetRgb = hexToRgb(targetColor);
//         const replacementRgb = hexToRgb(replacementColor);
//         const canvas = imageCanvasRef.current;
//         const ctx = canvas.getContext('2d');
//         const imageData = currentImageData;
//         const pixels = imageData.data;
//         const maxDistance = (tolerance / 100) * 442;

//         for (let i = 0; i < pixels.length; i += 4) {
//             const r = pixels[i];
//             const g = pixels[i + 1];
//             const b = pixels[i + 2];
//             const distance = Math.sqrt(
//                 Math.pow(r - targetRgb.r, 2) +
//                 Math.pow(g - targetRgb.g, 2) +
//                 Math.pow(b - targetRgb.b, 2)
//             );

//             if (distance <= maxDistance) {
//                 pixels[i] = replacementRgb.r;
//                 pixels[i + 1] = replacementRgb.g;
//                 pixels[i + 2] = replacementRgb.b;
//             }
//         }

//         ctx.putImageData(imageData, 0, 0);
//         hideLoading();
//     };

//     const resetImage = () => {
//         if (originalImageData) {
//             showLoading();
//             const canvas = imageCanvasRef.current;
//             const ctx = canvas.getContext('2d');
//             ctx.putImageData(originalImageData, 0, 0);
//             setCurrentImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
//             hideLoading();
//         }
//     };

//     const downloadImage = () => {
//         if (!originalImage) {
//             alert('Please upload an image first');
//             return;
//         }

//         const link = document.createElement('a');
//         link.download = 'edited-image.png';
//         link.href = imageCanvasRef.current.toDataURL('image/png');
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const isValidHex = (color) => {
//         return /^#([0-9A-F]{3}){1,2}$/i.test(color);
//     };

//     const hexToRgb = (hex) => {
//         hex = hex.replace('#', '');
//         if (hex.length === 3) {
//             hex = hex.split('').map(c => c + c).join('');
//         }
//         const bigint = parseInt(hex, 16);
//         const r = (bigint >> 16) & 255;
//         const g = (bigint >> 8) & 255;
//         const b = bigint & 255;
//         return { r, g, b };
//     };

//     const rgbToHex = (r, g, b) => {
//         return '#' + [r, g, b].map(x => {
//             const hex = x.toString(16);
//             return hex.length === 1 ? '0' + hex : hex;
//         }).join('');
//     };

//     return (
//         <div className="editor-container">
//             <div className="editor-header">
//                 <h1>Image Color Editor</h1>
//                 <p>Upload an image and replace colors using hex codes</p>
//             </div>

//             <div className="editor-grid">
//                 {/* Upload Section */}
//                 <div className="upload-section">
//                     <h2>Upload Image</h2>
//                     <div className="upload-area" ref={dropAreaRef}>
//                         <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                         </svg>
//                         <p>Drag & drop your image here</p>
//                         <p>or</p>
//                         <label htmlFor="file-input" className="browse-button">Browse Files</label>
//                         <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFiles} />
//                     </div>
//                 </div>
               

//                 {/* Preview Section */}
//                 <div className="preview-section">
//                     <h2>Image Preview & Edit</h2>
//                     <div className="canvas-container">
//                         <canvas ref={imageCanvasRef} width="600" height="400"></canvas>
//                         {loading && (
//                             <div className="loading">
//                                 <div className="spinner"></div>
//                             </div>
//                         )}
//                     </div>

//                     <div className="color-replacement">
//                         <h3>Color Replacement</h3>
//                         <div className="color-inputs">
//                             <div className="color-input">
//                                 <label htmlFor="target-color">Replacement Color</label>

//                                 <div className="color-swatch" style={{ backgroundColor: targetColor }}></div>
                                
//                                 <input
//                                     type="text"
//                                     id="target-color"
//                                     value={targetColor}
//                                     onChange={(e) => setTargetColor(e.target.value)}
//                                     placeholder="#RRGGBB"
//                                 />
//                             </div>
//                             <div className="color-input">
//                                 <label htmlFor="replacement-color">Replacement Color</label>
//                                 <div className="color-swatch" style={{ backgroundColor: replacementColor }}></div>
//                                 <input
//                                     type="text"
//                                     id="replacement-color"
//                                     value={replacementColor}
//                                     onChange={(e) => setReplacementColor(e.target.value)}
//                                     placeholder="#RRGGBB"
//                                 />
//                             </div>
//                         </div>
//                         <div className="tolerance-input">
//                             <label htmlFor="tolerance">Color Match Tolerance (0-100)</label>
//                             <input
//                                 type="range"
//                                 id="tolerance"
//                                 min="0"
//                                 max="100"
//                                 value={tolerance}
//                                 onChange={(e) => setTolerance(e.target.value)}
//                             />
//                         </div>
//                         <div className="button-group">
//                             <button onClick={replaceColor} className="action-button">Replace Color</button>
//                             <button onClick={resetImage} className="action-button">Reset Original</button>
//                             <button onClick={downloadImage} className="action-button">Download Image</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <BottomFooter/>
//         </div>
//     );
// };

// export default ImageColorEditor;
import { useEffect, useRef, useState } from 'react';
import './ImageColorEditor.css'; 
import BottomFooter from '../Footer/BottomFooter';

const ImageColorEditor = () => {
    const dropAreaRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageCanvasRef = useRef(null);
    const [originalImageData, setOriginalImageData] = useState(null);
    const [currentImageData, setCurrentImageData] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dominantColor, setDominantColor] = useState('#000000');
    const [replacementColor, setReplacementColor] = useState('#FFFFFF');
    const [tolerance, setTolerance] = useState(30);

    useEffect(() => {
        const dropArea = dropAreaRef.current;

        const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const highlight = () => {
            dropArea.classList.add('highlight');
        };

        const unhighlight = () => {
            dropArea.classList.remove('highlight');
        };

        const handleDrop = (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles({ target: { files } });
        };

        dropArea.addEventListener('dragenter', preventDefaults);
        dropArea.addEventListener('dragover', preventDefaults);
        dropArea.addEventListener('dragleave', preventDefaults);
        dropArea.addEventListener('drop', handleDrop);
        dropArea.addEventListener('click', () => fileInputRef.current.click());

        return () => {
            dropArea.removeEventListener('dragenter', preventDefaults);
            dropArea.removeEventListener('dragover', preventDefaults);
            dropArea.removeEventListener('dragleave', preventDefaults);
            dropArea.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleFiles = (e) => {
        const files = e.target.files;
        if (files.length) {
            processImage(files[0]);
        }
    };

    const processImage = (file) => {
        showLoading();
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                setOriginalImage(img);
                const canvas = imageCanvasRef.current;
                const ctx = canvas.getContext('2d');

                const maxWidth = 600;
                const maxHeight = 400;
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((maxWidth / width) * height);
                    width = maxWidth;
                }

                if (height > maxHeight) {
                    width = Math.round((maxHeight / height) * width);
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                setOriginalImageData(ctx.getImageData(0, 0, width, height));
                setCurrentImageData(ctx.getImageData(0, 0, width, height));
                extractDominantColor(ctx.getImageData(0, 0, width, height));
                hideLoading();
            };
            img.onerror = () => {
                hideLoading();
                alert('Error loading image. Please try another file.');
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const extractDominantColor = (imageData) => {
        const colorCount = {};
        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const rgb = `${r},${g},${b}`;

            if (colorCount[rgb]) {
                colorCount[rgb]++;
            } else {
                colorCount[rgb] = 1;
            }
        }

        const dominantColor = Object.keys(colorCount).reduce((a, b) => colorCount[a] > colorCount[b] ? a : b);
        const [r, g, b] = dominantColor.split(',').map(Number);
        setDominantColor(rgbToHex(r, g, b));
    };

    const showLoading = () => {
        setLoading(true);
    };

    const hideLoading = () => {
        setLoading(false);
    };

    const replaceColor = () => {
        if (!dominantColor || !replacementColor) {
            alert('Please enter both target and replacement colors');
            return;
        }

        if (!isValidHex(dominantColor) || !isValidHex(replacementColor)) {
            alert('Please enter valid hex color codes (e.g., #FF0000 or #F00)');
            return;
        }

        showLoading();
        const targetRgb = hexToRgb(dominantColor);
        const replacementRgb = hexToRgb(replacementColor);
        const canvas = imageCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageData = currentImageData;
        const pixels = imageData.data;
        const maxDistance = (tolerance / 100) * 442;

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const distance = Math.sqrt(
                Math.pow(r - targetRgb.r, 2) +
                Math.pow(g - targetRgb.g, 2) +
                Math.pow(b - targetRgb.b, 2)
            );

            if (distance <= maxDistance) {
                pixels[i] = replacementRgb.r;
                pixels[i + 1] = replacementRgb.g;
                pixels[i + 2] = replacementRgb.b;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        hideLoading();
    };

    const resetImage = () => {
        if (originalImageData) {
            showLoading();
            const canvas = imageCanvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.putImageData(originalImageData, 0, 0);
            setCurrentImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
            hideLoading();
        }
    };

    const downloadImage = () => {
        if (!originalImage) {
            alert('Please upload an image first');
            return;
        }

        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = imageCanvasRef.current.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const isValidHex = (color) => {
        return /^#([0-9A-F]{3}){1,2}$/i.test(color);
    };

    const hexToRgb = (hex) => {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };

    const rgbToHex = (r, g, b) => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h1>Image Color Editor</h1>
                <p>Upload an image and replace colors using hex codes</p>
            </div>

            <div className="editor-grid">
                {/* Upload Section */}
                <div className="upload-section">
                    <h2>Upload Image</h2>
                    <div className="upload-area" ref={dropAreaRef}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p>Drag & drop your image here</p>
                        <p>or</p>
                        <label htmlFor="file-input" className="browse-button">Browse Files</label>
                        <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFiles} />
                    </div>
                </div>

                {/* Preview Section */}
                <div className="preview-section">
                    <h2>Image Preview & Edit</h2>
                    <div className="canvas-container">
                        <canvas ref={imageCanvasRef} width="600" height="400"></canvas>
                        {loading && (
                            <div className="loading">
                                <div className="spinner"></div>
                            </div>
                        )}
                    </div>

                    <div className="color-replacement">
                        <h3>Color Replacement</h3>
                        <div className="color-inputs">
                            <div className="color-input">
                                <label htmlFor="dominant-color">Dominant Color</label>
                                <div className="color-swatch" style={{ backgroundColor: dominantColor }}></div>
                                <input
                                    type="text"
                                    id="dominant-color"
                                    value={dominantColor}
                                    readOnly
                                />
                            </div>
                            <div className="color-input">
                                <label htmlFor="replacement-color">Replacement Color</label>
                                <div className="color-swatch" style={{ backgroundColor: replacementColor }}></div>
                                <input
                                    type="text"
                                    id="replacement-color"
                                    value={replacementColor}
                                    onChange={(e) => setReplacementColor(e.target.value)}
                                    placeholder="#RRGGBB"
                                />
                            </div>
                        </div>
                        <div className="tolerance-input">
                            <label htmlFor="tolerance">Color Match Tolerance (0-100)</label>
                            <input
                                type="range"
                                id="tolerance"
                                min="0"
                                max="100"
                                value={tolerance}
                                onChange={(e) => setTolerance(e.target.value)}
                            />
                        </div>
                        <div className="button-group">
                            <button onClick={replaceColor} className="action-button">Replace Color</button>
                            <button onClick={resetImage} className="action-button">Reset Original</button>
                            <button onClick={downloadImage} className="action-button">Download Image</button>
                        </div>
                    </div>
                </div>
            </div>
            <BottomFooter/>
        </div>
    );
};

export default ImageColorEditor;
