// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Image Color Editor</title>
//     <style>
//         :root {
//             --primary: #4f46e5;
//             --secondary: #10b981;
//             --dark: #1f2937;
//             --light: #f9fafb;
//         }
        
//         * {
//             box-sizing: border-box;
//             margin: 0;
//             padding: 0;
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         body {
//             background-color: var(--light);
//             color: var(--dark);
//             min-height: 100vh;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             padding: 2rem;
//         }
        
//         h1 {
//             color: var(--primary);
//             margin-bottom: 2rem;
//             text-align: center;
//         }
        
//         .container {
//             display: flex;
//             flex-direction: column;
//             max-width: 1000px;
//             width: 100%;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             padding: 2rem;
//             gap: 2rem;
//         }
//          .editor-container {
//             display: flex;
//             flex-direction: column;
//             gap: 2rem;
//         }
        
//         @media (min-width: 768px) {
//             .editor-container {
//                 flex-direction: row;
//             }
//         }
        
//         .image-container {
//             flex: 1;
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//         }
        
//         .controls {
//             flex: 1;
//             display: flex;
//             flex-direction: column;
//             gap: 1.5rem;
//         }
        
//         .image-wrapper {
//             width: 100%;
//             aspect-ratio: 1;
//             border: 2px dashed #d1d5db;
//             border-radius: 8px;
//             overflow: hidden;
//             position: relative;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             background-color: #f3f4f6;
//         }
        
//         .image-wrapper img {
//             width: 100%;
//             height: 100%;
//             object-fit: contain;
//             filter: hue-rotate(0deg) saturate(100%) brightness(100%) contrast(100%);
//         }
        
//         .image-wrapper.empty::after {
//             content:  'Upload an image to edit';
//             color: #9ca3af;
//             font-size: 1rem;
//             position: absolute;
//         }
        
//         .upload-btn {
//             background-color: var(--primary);
//             color: white;
//             border: none;
//             padding: 0.75rem 1.5rem;
//             border-radius: 6px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.2s;
//             width: fit-content;
//             align-self: center;
//         }
        
//         .upload-btn:hover {
//             background-color: #4338ca;
//         }
        
//         input[type="file"] {
//             display: none;
//         }
        
//         .control-group {
//             display: flex;
//             flex-direction: column;
//             gap: 0.5rem;
//         }
        
//         .control-label {
//             display: flex;
//             justify-content: space-between;
//             font-weight: 600;
//             color: var(--dark);
//         }
        
//         .control-value {
//             color: var(--primary);
//             font-weight: 700;
//         }
        
//         .slider {
//             width: 100%;
//             height: 8px;
//             border-radius: 4px;
//             bacground: #e5e7eb;
//             outline: none;
//             -webkit-appearance: none;
//         }
        
//         .slider::-webkit-slider-thumb {
//             -webkit-appearance: none;
//             width: 20px;
//             height: 20px;
//             border-radius: 50%;
//             background: var(--primary);
//             cursor: pointer;
//             transition: all 0.2s;
//         }
        
//         .slider::-webkit-slider-thumb:hover {
//             transform: scale(1.1);
//         }
        
//         .reset-btn {
//             background-color: var(--secondary);
//             color: white;
//             border: none;
//             padding: 0.75rem 1.5rem;
//             border-radius: 6px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.2s;
//             margin-top: 1rem;
//         }
        
//         .reset-btn:hover {
//             background-color: #0e9f6e;
//         }
        
//         .download-btn {
//             background-color: var(--dark);
//             color: white;
//             border: none;
//             padding: 0.75rem 1.5rem;
//             border-radius: 6px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.2s;
//             margin-ttop: auto;
//             align-self: center;
//         }
        
//         .download-btn:hover {
//             background-color: #111827;
//         }
        
//         .filter-presets {
//             display: flex;
//             gap: 0.5rem;
//             flex-wrap: wrap;
//         }
        
//         .preset-btn {
//             padding: 0.5rem 1rem;
//             border-radius: 4px;
//             font-size: 0.875rem;
//             cursor: pointer;
//             transition: all 0.2s;
//             border: 1px solid #d1d5db;
//             background-color: white;
//         }
        
//         .preset-btn:hover {
//             background-color: #f3f4f6;
//         }
        
//         .preset-btn.active {
//             background-color: var(--primary);
//             color: white;
//             border-color: var(--primary);
//         }
//     </style>
// </head>
// <body>
//     <h1>Image Color Editor</h1>
    
//     <div class="container">
//         <div class="editor-container">
//             <div class="image-container">
//                 <div class="image-wrapper empty">
//                     <img id="preview-image" src="" alt="Preview" src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d23a55e2-d805-49bd-849f-8f691bb8ee1b.png">
//                 </div>
//                 <label for="file-upload" class="upload-btn">Choose Image</label>
//                 <input type="file" id="file-upload" accept="image/*">
//                 <button class="download-btn" id="download-btn" disabled>Download Edited Image</button>
//             </div>
            
//             <div class="controls">
//                 <div class="filter-presets">
//                     <button class="preset-btn" data-hue="0" data-saturate="100" data-bright="100" data-contrast="100">Original</button>
//                     <button class="preset-btn" data-hue="90" data-saturate="120" data-bright="100" data-contrast="100">Vibrant</button>
//                     <button class="preset-btn" data-hue="180" data-saturate="80" data-bright="90" data-contrast="110">Cool</button>
//                     <button class="preset-btn" data-hue="0" data-saturate="30" data-bright="100" data-contrast="100">B&W</button>
//                     <button class="preset-btn" data-hue="33" data-saturate="150" data-bright="110" data-contrast="90">Warm</button>
//                 </div>
                
//                 <div class="control-group">
//                     <label class="control-label" for="hue-slider">
//                         Hue
//                         <span class="control-value" id="hue-value">0°</span>
//                     </label>
//                     <input type="range" id="hue-slider" class="slider" min="0" max="360" value="0">
//                 </div>
                
//                 <div class="control-group">
//                     <label class="control-label" for="saturate-slider">
//                         Saturation
//                         <span class="control-value" id="saturate-value">100%</span>
//                     </label>
//                     <input type="range" id="saturate-slider" class="slider" min="0" max="200" value="100">
//                 </div>
                
//                 <div class="control-group">
//                     <label class="control-label" for="brightness-slider">
//                         Brightness
//                         <span class="control-value" id="brightness-value">100%</span>
//                     </label>
//                     <input type="range" id="brightness-slider" class="slider" min="0" max="200" value="100">
//                 </div>
                
//                 <div class="control-group">
//                     <label class="control-label" for="contrast-slider">
//                         Contrast
//                         <span class="control-value" id="contrast-value">100%</span>
//                     </label>
//                     <input type="range" id="contrast-slider" class="slider" min="0" max="200" value="100">
//                 </div>
                
//                 <button class="reset-btn" id="reset-btn">Reset All Filters</button>
//             </div>
//         </div>
//     </div>
//     <script>
//          document.addEventListener('DOMContentLoaded', function() {
//             // DOM elements
//             const fileUpload = document.getElementById('file-upload');
//             const previewImage = document.getElementById('preview-image');
//             const imageWrapper = document.querySelector('.image-wrapper');
//             const downloadBtn = document.getElementById('download-btn');
            
//             // Sliders and values
//             const hueSlider = document.getElementById('hue-slider');
//             const saturateSlider = document.getElementById('saturate-slider');
//             const brightnessSlider = document.getElementById('brightness-slider');
//             const contrastSlider = document.getElementById('contrast-slider');
            
//             const hueValue = document.getElementById('hue-value');
//             const saturateValue = document.getElementById('saturate-value');
//             const brightnessValue = document.getElementById('brightness-value');
//             const contrastValue = document.getElementById('contrast-value');
            
//             // Buttons
//             const resetBtn = document.getElementById('reset-btn');
//             const presetBtns = document.querySelectorAll('.preset-btn');
            
//             // Original image source
//             let originalImageSrc = '';
            
//             // Handle file upload
//             fileUpload.addEventListener('change', function(e) {
//                 const file = e.target.files[0];
//                 if (!file) return;
                
//                 const reader = new FileReader();
//                 reader.onload = function(event) {
//                     previewImage.src = event.target.result;
//                     originalImageSrc = event.target.result;
//                     imageWrapper.classList.remove('empty');
//                     downloadBtn.disabled = false;
                    
//                     // Reset all filters to default when new image is uploaded
//                     resetAllFilters();
//                 };
//                 reader.readAsDataURL(file);
//             });
            
//             // Update image filters when sliders change
//             hueSlider.addEventListener('input', updateImageFilters);
//             saturateSlider.addEventListener('input', updateImageFilters);
//             brightnessSlider.addEventListner('input',updateImageFilters);
//             contrastSlider.addEventListener('input', updateImageFilters);
            
//             function updateImageFilters() {
//                 const hue = hueSlider.value;
//                 const saturate = saturateSlider.value;
//                 const brightness = brightnessSlider.value;
//                 const contrast = contrastSlider.value;
                
//                 // Update the preview image
//                 previewImage.style.filter = `
//                     hue-rotate(${hue}deg) 
//                     saturate(${saturate}%) 
//                     brightness(${brightness}%) 
//                     contrast(${contrast}%)
//                 `;
                
//                 // Update the displayed values
//                 hueValue.textContent = `${hue}°`;
//                 saturateValue.textContent = `${saturate}%`;
//                 brightnessValue.textContent = `${brightness}%`;
//                 contrastValue.textContent = `${contrast}%`;
//             }
            
//             // Reset all filters to default
//             resetBtn.addEventListener('click', resetAllFilters);
            
//             function resetAllFilters() {
//                 hueSlider.value = 0;
//                 saturateSlider.value = 100;
//                 brightnessSlider.value = 100;
//                 contrastSlider.value = 100;
                
//                 // Remove active class from all preset buttons
//                 presetBtns.forEach(btn => btn.classList.remove('active'));
//                 // Make the Original button active
//                 presetBtns[0].classList.add('active');
                
//                 updateImageFilters();
//             }
            
//             // Preset buttons
//             presetBtns.forEach(btn => {
//                 btn.addEventListener('click', function() {
//                     const hue = this.dataset.hue;
//                     const  saturate = this.dataset.saturate;
//                     const bright = this.dataset.bright;
//                     const contrast = this.dataset.contrast;
                    
//                     hueSlider.value = hue;
//                     saturateSlider.value = saturate;
//                     brightnessSlider.value = bright;
//                     contrastSlider.value = contrast;
                    
//                     // Remove active class from all buttons
//                     presetBtns.forEach(b => b.classList.remove('active'));
//                     // Add active class to clicked button
//                     this.classList.add('active');
                    
//                     updateImageFilters();
//                 });
//             });
            
//             // Download edited image
//             downloadBtn.addEventListener('click', function() {
//                 if (!previewImage.src) return;
                
//                 // Create a canvas to draw the filtered image
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');
//                 canvas.width = previewImage.naturalWidth;
//                 canvas.height = previewImage.naturalHeight;
                
//                 // Apply the current filters to the canvas
//                 ctx.filter = previewImage.style.filter;
//                 ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
                
//                 // Convert canvas to image and download
//                 const dataUrl = canvas.toDataURL('image/png');
//                 const link = document.createElement('a');
//                 link.href = dataUrl;
//                 link.download = 'edited-image.png';
//                 link.click();
//             });
//         });
//     </script>
// </body>
// </html>