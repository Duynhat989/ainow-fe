<template>
    <div class="canvas-editor-container">
        <button class="tools-toggle-btn" @click="showTools = !showTools">
            <span v-if="showTools">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19V5"></path> </svg>
            </span>
            <span v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14M5 12h14"></path> </svg>
            </span>
        </button>

        <div class="canvas-main" ref="canvasContainer">
            <canvas ref="canvasElement" :width="canvasWidth - 10" :height="canvasHeight - 10"
                    @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"
                    @mouseleave="stopDrawing" @touchstart="handleTouchStart"
                    @touchmove="handleTouchMove" @touchend="stopDrawing"></canvas>
        </div>

        <div class="tools-panel" :class="{ 'tools-panel-visible': showTools }">
            <div class="panel-header">
                <h3>{{ $t('CANVAS_TOOLS_TITLE') }}</h3>
                <button class="btn-close" @click="showTools = false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="tools-content">
                <div class="control-group">
                    <label for="brush_size">{{ $t('CANVAS_BRUSH_SIZE') }}:</label>
                    <div class="size-control">
                        <input type="range" id="brush_size" v-model="brushSize" min="1" max="50" class="slider" />
                        <span class="value-display">{{ brushSize }}px</span>
                    </div>
                </div>

                <div class="control-group">
                    <label>{{ $t('CANVAS_COLOR') }}:</label>
                    <div class="color-palette">
                        <button v-for="color in colorPalette" :key="color" :style="{ backgroundColor: color }"
                                :class="{ active: currentColor === color }" @click="currentColor = color"
                                class="color-btn"></button>
                        <input type="color" v-model="currentColor" class="color-picker" />
                    </div>
                </div>

                <div class="control-group">
                    <label>{{ $t('CANVAS_TOOLS') }}:</label>
                    <div class="drawing-tools">
                        <button v-for="tool in drawingTools" :key="tool.name"
                                :class="{ active: currentTool === tool.name }" @click="currentTool = tool.name"
                                class="tool-btn" :title="tool.title">
                            {{ tool.icon }}
                        </button>
                    </div>
                </div>

                <div class="control-group">
                    <button class="btn-reset" @click="resetCanvas">{{ $t('CANVAS_RESET') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, computed } from 'vue';

// Props & Emits
const props = defineProps({
    imagePreview: {
        type: String,
        default: null
    }
});
const emit = defineEmits(['update:imagePreview']);

// Refs
const canvasElement = ref(null);
const canvasContainer = ref(null);
const ctx = ref(null);

// State
const showTools = ref(false);
const canvasWidth = ref(600); // Initial value, will be overwritten
const canvasHeight = ref(450); // Initial value, will be overwritten
const isDrawing = ref(false);
const lastX = ref(0);
const lastY = ref(0);
const currentAspectRatio = ref(null); // null = fill container, number = image aspect ratio
const brushSize = ref(5);
const currentColor = ref('#6366f1');
const currentTool = ref('brush');
let startX = 0;
let startY = 0;
let pattern = null;

// Constants
const colorPalette = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#00ffff', '#ff00ff', '#6366f1', '#f97316'
];
const drawingTools = [
    { name: 'brush', icon: '✏️', title: 'Bút vẽ' },
    { name: 'eraser', icon: '🧽', title: 'Tẩy' },
    { name: 'line', icon: '⁄', title: 'Đường thẳng' },
    { name: 'rectangle', icon: '□', title: 'Hình chữ nhật' },
    { name: 'circle', icon: '○', title: 'Hình tròn' }
];
const patternImage = new Image();
patternImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABoSURBVDiNY/z//z8DNQETI41dRnUDGRkZqRdGTEyM1AsjqhnIBKMGjhg4aiBtDPxPJcC4gUrmM85ngjCyesYFjC7MFKll/P+f7vH8n9JkQ/1kQ3nhoXpFQ3nldj7jejAja3DIyKEAAACJ0SdeNByBswAAAABJRU5ErkJggg==';

// Computed
const previewImage = computed(() => props.imagePreview);

// --- Lifecycle Hooks ---
onMounted(() => {
    const canvas = canvasElement.value;
    if (!canvas) return;
    ctx.value = canvas.getContext('2d');

    setupPattern();

    if (previewImage.value) {
        loadImageToCanvas(previewImage.value);
    } else {
        currentAspectRatio.value = null; // Set default to fill
        adjustCanvasSize(currentAspectRatio.value);
        initializeCanvasBackground();
    }

    window.addEventListener('resize', handleResize);
    updateCursor();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

// --- Watchers ---
watch(previewImage, (newValue, oldValue) => {
    if (newValue && newValue !== oldValue && ctx.value) {
        console.log("imagePreview prop changed, reloading canvas.");
        loadImageToCanvas(newValue);
    } else if (!newValue && oldValue) {
        console.log("imagePreview prop removed, resetting canvas.");
        resetCanvas();
    }
});

watch(currentTool, updateCursor);

// --- Methods ---
function setupPattern() {
    patternImage.onload = () => {
        if (ctx.value) {
            pattern = ctx.value.createPattern(patternImage, 'repeat');
            // Redraw background if canvas is in default state and pattern just loaded
            if (!previewImage.value && !currentAspectRatio.value) {
                 initializeCanvasBackground();
            }
        }
    };
    // If image already loaded (e.g., cached)
    if (patternImage.complete && patternImage.naturalWidth > 0 && ctx.value) {
         pattern = ctx.value.createPattern(patternImage, 'repeat');
    }
}

function adjustCanvasSize(aspectRatio /* number | null */) {
    const container = canvasContainer.value;
    if (!container) return; // No need to check ctx here, as it might be called before ctx is ready

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    if (containerWidth <= 0 || containerHeight <= 0) return;

    let newWidth, newHeight;

    if (aspectRatio === null || aspectRatio <= 0) { // Fill mode
        newWidth = containerWidth;
        newHeight = containerHeight;
    } else { // Maintain aspect ratio
        newWidth = containerWidth;
        newHeight = containerWidth / aspectRatio;
        if (newHeight > containerHeight) {
            newHeight = containerHeight;
            newWidth = containerHeight * aspectRatio;
        }
        // Ensure it doesn't exceed container bounds after calculation
        newWidth = Math.min(newWidth, containerWidth);
        newHeight = Math.min(newHeight, containerHeight);
    }

    newWidth = Math.max(1, Math.round(newWidth));
    newHeight = Math.max(1, Math.round(newHeight));

    if (canvasWidth.value !== newWidth || canvasHeight.value !== newHeight) {
        canvasWidth.value = newWidth;
        canvasHeight.value = newHeight;
        console.log(`Canvas size set to: ${newWidth}x${newHeight}`);

        // Ensure canvas context operations happen after DOM update
        nextTick(() => {
             if(!ctx.value) return; // Context might not be ready yet if called very early
            // Always redraw background after size change if not loading an image immediately after
            if (!(previewImage.value && aspectRatio > 0)) {
                initializeCanvasBackground();
            }
            updateCursor(); // Cursor might need update if canvas element changed
        });
    }
}

function handleResize() {
     // Adjust size based on the current mode (fill or image aspect ratio)
     adjustCanvasSize(currentAspectRatio.value);

     // Use nextTick to ensure canvas element has resized before redrawing
     nextTick(() => {
         if (!ctx.value) return;
         // If an image is supposed to be displayed, reload it for best quality
         if (previewImage.value && currentAspectRatio.value) {
             console.log("Resize: Reloading image for quality");
             loadImageToCanvas(previewImage.value);
         } else {
              // Otherwise, just ensure the background is redrawn correctly
              initializeCanvasBackground();
         }
     });
}

function loadImageToCanvas(imageSrc) {
    if (!ctx.value) return;
    console.log("Loading image...");

    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = () => {
        console.log("Image loaded.");
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        currentAspectRatio.value = aspectRatio; // Store the aspect ratio

        adjustCanvasSize(aspectRatio); // Adjust size first

        nextTick(() => { // Wait for DOM update
            if (!ctx.value) return;
            ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
            ctx.value.drawImage(image, 0, 0, canvasWidth.value, canvasHeight.value);
            console.log("Image drawn.");
        });
    };

    image.onerror = (error) => {
        console.error('Error loading image:', error);
        alert('Không thể tải ảnh. Vui lòng thử lại.'); // Notify user
        resetCanvas(); // Reset to default state on error
    };

    image.src = imageSrc;
}

function initializeCanvasBackground() {
    if (!ctx.value) return;
    const context = ctx.value;
    context.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    context.fillStyle = '#f8fafc'; // Fallback background
    context.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
    if (pattern) {
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
    }
    console.log("Canvas background initialized/redrawn.");
}

function updatePreview() {
    if (!canvasElement.value || !ctx.value) return;
    const dataUrl = canvasElement.value.toDataURL('image/png');
    console.log("Updating preview...");
    emit('update:imagePreview', dataUrl);
}

function resetCanvas() {
    console.log("Resetting canvas...");
    currentAspectRatio.value = null; // Back to fill mode
    adjustCanvasSize(currentAspectRatio.value);

    nextTick(() => {
        if (!ctx.value) return;
        initializeCanvasBackground();
        updatePreview(); // Emit the cleared state
    });
}

function getCoords(e) {
    const rect = canvasElement.value.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    // Clamp coordinates within canvas boundaries
    const x = Math.max(0, Math.min(clientX - rect.left, canvasWidth.value));
    const y = Math.max(0, Math.min(clientY - rect.top, canvasHeight.value));
    return { x, y };
}

// --- Drawing Handlers ---
function startDrawing(e) {
    if (!ctx.value) return;
     // Allow drawing only with left mouse button (button 0) or touch
     if (e.button && e.button !== 0) return;

    isDrawing.value = true;
    const { x, y } = getCoords(e);
    lastX.value = x;
    lastY.value = y;
    startX = x;
    startY = y;
    ctx.value.beginPath(); // Start path for all tools
}

function draw(e) {
    if (!isDrawing.value || !ctx.value) return;

    const { x, y } = getCoords(e);
    const context = ctx.value;

    // Continuous drawing for brush and eraser
    if (currentTool.value === 'brush' || currentTool.value === 'eraser') {
        context.lineWidth = brushSize.value;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        if (currentTool.value === 'brush') {
            context.strokeStyle = currentColor.value;
            context.globalCompositeOperation = 'source-over';
        } else { // Eraser
            context.globalCompositeOperation = 'destination-out'; // True erase
        }

        context.moveTo(lastX.value, lastY.value);
        context.lineTo(x, y);
        context.stroke();

        // Reset composite operation if eraser
        if (currentTool.value === 'eraser') {
            context.globalCompositeOperation = 'source-over';
        }
    }
    // Shapes are drawn on stopDrawing

    lastX.value = x;
    lastY.value = y;
}

function stopDrawing(e) {
    if (!isDrawing.value || !ctx.value) {
         isDrawing.value = false; // Ensure state is correct even if triggered unexpectedly
         return;
     }

    const context = ctx.value;
    // Use last known coords as fallback for events like mouseleave
    let finalX = lastX.value;
    let finalY = lastY.value;
    // Try to get precise coords if available (mouseup, touchend)
    if (e && e.type !== 'mouseleave' && e.type !== 'touchcancel') {
        try {
            const { x, y } = getCoords(e);
            finalX = x;
            finalY = y;
        } catch (err) { /* Use last coords */ }
    }

    // Draw final shapes
    if (currentTool.value !== 'brush' && currentTool.value !== 'eraser') {
        context.strokeStyle = currentColor.value;
        context.lineWidth = brushSize.value;
        context.lineJoin = 'miter'; // Sharp corners for shapes
        context.lineCap = 'butt';   // Sharp ends for lines/rects

        // Start a new path specific to the shape drawing operation
        // Note: A path was already begun in startDrawing, ensure it's clear or reused correctly.
        // For simplicity, let's assume the path started in startDrawing is intended for this shape.
        // context.beginPath(); // Re-starting path here might discard brush dots made on startDrawing if implemented

        if (currentTool.value === 'line') {
            context.moveTo(startX, startY); // Ensure starting point
            context.lineTo(finalX, finalY);
        } else if (currentTool.value === 'rectangle') {
            context.rect(
                Math.min(startX, finalX), Math.min(startY, finalY),
                Math.abs(finalX - startX), Math.abs(finalY - startY)
            );
        } else if (currentTool.value === 'circle') {
             // Circle drawn from center (startX, startY) with radius to (finalX, finalY)
             const radius = Math.sqrt(Math.pow(finalX - startX, 2) + Math.pow(finalY - startY, 2));
            context.arc(startX, startY, radius, 0, Math.PI * 2);
             // If you prefer ellipse based on bounding box:
             // const radiusX = Math.abs(finalX - startX) / 2;
             // const radiusY = Math.abs(finalY - startY) / 2;
             // const centerX = Math.min(startX, finalX) + radiusX;
             // const centerY = Math.min(startY, finalY) + radiusY;
             // context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        }
        context.stroke(); // Stroke the shape
    }

    // Brush/Eraser paths don't need explicit closing here

     // context.closePath(); // Close the path if shapes require it (e.g., for filling)

    isDrawing.value = false; // Set state AFTER completing drawing

    updatePreview(); // Update preview with the final result
}


// --- Touch Handlers ---
function handleTouchStart(e) {
    if (e.touches.length === 1) { // Process only single touch for drawing
         e.preventDefault(); // Prevent scroll/zoom ONLY when starting a drawing touch
         startDrawing(e);
    }
    // Allow multi-touch gestures (like zoom) by not preventing default for >1 touch
}

function handleTouchMove(e) {
     if (isDrawing.value && e.touches.length === 1) {
         e.preventDefault(); // Prevent scroll ONLY when actively drawing with one finger
         draw(e);
     }
}


// --- Cursor ---
function updateCursor() {
    if (!canvasElement.value) return;
    let cursorStyle = 'default';
    switch (currentTool.value) {
        case 'brush':
            // Pencil SVG Cursor (adjust hotspot x=4, y=18)
            cursorStyle = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>') 4 18, crosshair`;
            break;
        case 'eraser':
             // Square Eraser SVG Cursor (hotspot center 8,8)
             cursorStyle = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect width="14" height="14" x="1" y="1" fill="white" stroke="black" stroke-width="1.5"/></svg>') 8 8, auto`;
            break;
        case 'line':
        case 'rectangle':
        case 'circle':
            cursorStyle = 'crosshair';
            break;
    }
    canvasElement.value.style.cursor = cursorStyle;
}

</script>

<style scoped>
.canvas-editor-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px; /* Provides spacing around the canvas container */
    background-color: #f0f4f8; /* Light background for the whole editor area */
    position: relative; /* Needed for absolute positioning of toggle button */
    overflow: hidden; /* Prevent potential overflow issues */
}

.canvas-main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Add some padding inside if needed, but adjust adjustCanvasSize calculation */
    /* padding: 10px; */
}

canvas {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    /* Cursor style is now handled by updateCursor() function */
    /* cursor: crosshair; */
    display: block; /* Prevent extra space below canvas */
    max-width: 100%; /* Ensure canvas does not exceed container width */
    max-height: 100%; /* Ensure canvas does not exceed container height */
    background-color: #ffffff; /* Fallback background, pattern is drawn on top */
}


/* Nút toggle */
.tools-toggle-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #6366f1;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 101; /* Higher than tools panel when closed */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
}

.tools-toggle-btn:hover {
    transform: scale(1.05);
    background-color: #4f46e5;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Panel công cụ */
.tools-panel {
    position: fixed; /* Fixed position relative to viewport */
    top: 0;
    right: -300px; /* Start off-screen */
    width: 300px; /* Default width */
    height: 100%; /* Full height */
    background-color: white;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 100; /* Below toggle button when closed */
    transition: right 0.3s ease; /* Smooth slide animation */
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent content spill */
}

.tools-panel-visible {
    right: 0; /* Slide in */
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0; /* Prevent header from shrinking */
}

.panel-header h3 {
    margin: 0;
    color: #1e293b;
    font-weight: 600;
    font-size: 1.1rem; /* Slightly smaller default */
}

.btn-close {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: all 0.2s;
}

.btn-close:hover {
    color: #1e293b;
    background-color: #f1f5f9;
}

.tools-content {
    flex: 1; /* Allow content to take remaining space */
    padding: 20px;
    overflow-y: auto; /* Enable vertical scrolling if content overflows */
    display: flex;
    flex-direction: column;
    gap: 25px; /* Space between control groups */
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 12px; /* Space between label and control */
}

.control-group label {
    font-weight: 600;
    color: #475569;
    font-size: 0.9rem; /* Slightly smaller default */
}

.size-control {
    display: flex;
    align-items: center;
    gap: 15px;
}

.slider {
    flex: 1; /* Take available space */
    -webkit-appearance: none;
    appearance: none; /* Override default look */
    height: 6px;
    border-radius: 5px;
    background: #e2e8f0;
    outline: none;
    cursor: pointer;
}

/* Slider Thumb Styles */
.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #6366f1;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #6366f1;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    border: none;
}

.value-display {
    color: #64748b;
    font-size: 0.85rem; /* Slightly smaller */
    min-width: 40px; /* Ensure space for 'px' */
    text-align: right;
    font-variant-numeric: tabular-nums; /* Keep numbers aligned */
}

.color-palette {
    display: flex;
    flex-wrap: wrap; /* Allow colors to wrap */
    gap: 10px;
}

.color-btn {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    border: 2px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0; /* Remove default button padding */
    flex-shrink: 0; /* Prevent shrinking */
}

.color-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.color-btn.active {
    border-color: #1e293b; /* Use a dark border for active */
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.color-picker {
    width: 32px; /* Match size incl. border */
    height: 32px;
    border: none;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    padding: 0; /* Remove default padding */
    overflow: hidden; /* Hide default UI elements */
    appearance: none; /* Try to hide default styles */
    -webkit-appearance: none;
    -moz-appearance: none;
    flex-shrink: 0;
}
/* Custom appearance for color input picker */
.color-picker::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 4px; /* Inner radius */
}
.color-picker::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
}
.color-picker::-moz-color-swatch {
     border: none;
     border-radius: 4px;
}


.drawing-tools {
    display: flex;
    gap: 15px;
    flex-wrap: wrap; /* Allow tools to wrap */
}

.tool-btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    padding: 0; /* Remove default button padding */
    color: #334155; /* Default icon/text color */
    flex-shrink: 0; /* Prevent shrinking */
}

.tool-btn:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.tool-btn.active {
    background-color: #eff6ff; /* Light blue background */
    border-color: #93c5fd; /* Blue border */
    color: #2563eb; /* Blue icon/text color */
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(99, 102, 241, 0.15);
}

.btn-reset {
    padding: 10px 15px; /* Slightly smaller padding */
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    color: #475569;
    font-weight: 600;
    font-size: 0.9rem; /* Match label size */
    cursor: pointer;
    transition: all 0.2s;
    width: 100%; /* Full width */
    text-align: center;
    margin-top: 10px; /* Space above reset button */
}

.btn-reset:hover {
    background-color: #e2e8f0;
    color: #1e293b;
}

/* --- Responsiveness for Small Screens --- */
@media (max-width: 600px) {
    .tools-panel {
        width: 260px; /* Narrower panel */
        right: -260px; /* Adjust off-screen position */
    }

    .tools-panel-visible {
        right: 0;
    }

    .panel-header {
        padding: 15px; /* Reduced padding */
    }
    .panel-header h3 {
        font-size: 1rem; /* Smaller header text */
    }

    .tools-content {
        padding: 15px; /* Reduced padding */
        gap: 20px; /* Reduced gap between groups */
    }

    .control-group {
        gap: 10px; /* Reduced gap in group */
    }
    .control-group label {
        font-size: 0.85rem; /* Slightly smaller labels */
    }

    .size-control {
        gap: 10px; /* Reduced gap */
    }
    .slider::-webkit-slider-thumb { /* Slightly smaller thumb */
      width: 16px;
      height: 16px;
    }
    .slider::-moz-range-thumb { /* Slightly smaller thumb */
      width: 16px;
      height: 16px;
    }
    .value-display {
         font-size: 0.8rem; /* Smaller value text */
         min-width: 35px;
    }


    .color-palette {
        gap: 8px; /* Tighter color buttons */
    }
    .color-btn {
        width: 28px; /* Smaller color buttons */
        height: 28px;
    }
     .color-picker {
         width: 30px; /* Match size incl. border */
         height: 30px;
     }

    .drawing-tools {
        gap: 10px; /* Tighter tool buttons */
    }
    .tool-btn {
        width: 36px; /* Smaller tool buttons */
        height: 36px;
        font-size: 1.1rem; /* Slightly smaller icons */
    }

    .btn-reset {
        padding: 8px 12px; /* Smaller reset button */
        font-size: 0.85rem;
    }
}
.canvas-editor-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #f0f4f8;
    position: relative;
    overflow: hidden;
}

.canvas-main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

canvas {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: block;
    max-width: 100%;
    max-height: 100%;
    background-color: #ffffff; /* Fallback */
    /* touch-action: none; */ /* Might help prevent unwanted scrolling on canvas */
}

.tools-toggle-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #6366f1;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 101;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
}
.tools-toggle-btn:hover {
    transform: scale(1.05);
    background-color: #4f46e5;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tools-panel {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 100;
    transition: right 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.tools-panel-visible { right: 0; }

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
}
.panel-header h3 { margin: 0; color: #1e293b; font-weight: 600; font-size: 1.1rem; }

.btn-close { background: none; border: none; color: #64748b; cursor: pointer; padding: 5px; border-radius: 5px; transition: all 0.2s; }
.btn-close:hover { color: #1e293b; background-color: #f1f5f9; }

.tools-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.control-group { display: flex; flex-direction: column; gap: 12px; }
.control-group label { font-weight: 600; color: #475569; font-size: 0.9rem; }

.size-control { display: flex; align-items: center; gap: 15px; }
.slider {
    flex: 1; -webkit-appearance: none; appearance: none; height: 6px; border-radius: 5px;
    background: #e2e8f0; outline: none; cursor: pointer;
}
.slider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%;
    background: #6366f1; cursor: pointer; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}
.slider::-moz-range-thumb {
    width: 18px; height: 18px; border-radius: 50%; background: #6366f1;
    cursor: pointer; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); border: none;
}
.value-display { color: #64748b; font-size: 0.85rem; min-width: 40px; text-align: right; font-variant-numeric: tabular-nums; }

.color-palette { display: flex; flex-wrap: wrap; gap: 10px; }
.color-btn {
    width: 30px; height: 30px; border-radius: 6px; border: 2px solid #e2e8f0;
    cursor: pointer; transition: all 0.2s; padding: 0; flex-shrink: 0;
}
.color-btn:hover { transform: scale(1.1); box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1); }
.color-btn.active { border-color: #1e293b; transform: scale(1.1); box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15); }

.color-picker {
    width: 32px; height: 32px; border: none; border-radius: 6px; background-color: transparent;
    cursor: pointer; padding: 0; overflow: hidden; appearance: none; -webkit-appearance: none;
    -moz-appearance: none; flex-shrink: 0;
}
.color-picker::-webkit-color-swatch-wrapper { padding: 0; border-radius: 4px; }
.color-picker::-webkit-color-swatch { border: none; border-radius: 4px; }
.color-picker::-moz-color-swatch { border: none; border-radius: 4px; }

.drawing-tools { display: flex; gap: 15px; flex-wrap: wrap; }
.tool-btn {
    width: 40px; height: 40px; border-radius: 8px; border: 1px solid #e2e8f0; background-color: white;
    cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; padding: 0; color: #334155; flex-shrink: 0;
}
.tool-btn:hover { background-color: #f8fafc; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); }
.tool-btn.active { background-color: #eff6ff; border-color: #93c5fd; color: #2563eb; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(99, 102, 241, 0.15); }

.btn-reset {
    padding: 10px 15px; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px;
    color: #475569; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;
    width: 100%; text-align: center; margin-top: 10px;
}
.btn-reset:hover { background-color: #e2e8f0; color: #1e293b; }

@media (max-width: 600px) {
    .tools-panel { width: 260px; right: -260px; }
    .tools-panel-visible { right: 0; }
    .panel-header { padding: 15px; }
    .panel-header h3 { font-size: 1rem; }
    .tools-content { padding: 15px; gap: 20px; }
    .control-group { gap: 10px; }
    .control-group label { font-size: 0.85rem; }
    .size-control { gap: 10px; }
    .slider::-webkit-slider-thumb { width: 16px; height: 16px; }
    .slider::-moz-range-thumb { width: 16px; height: 16px; }
    .value-display { font-size: 0.8rem; min-width: 35px; }
    .color-palette { gap: 8px; }
    .color-btn { width: 28px; height: 28px; }
    .color-picker { width: 30px; height: 30px; }
    .drawing-tools { gap: 10px; }
    .tool-btn { width: 36px; height: 36px; font-size: 1.1rem; }
    .btn-reset { padding: 8px 12px; font-size: 0.85rem; }
}
</style>