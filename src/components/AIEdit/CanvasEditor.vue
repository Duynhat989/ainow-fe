<template>
    <div class="canvas-editor-container">
        <!-- Nút toggle để hiển thị/ẩn thanh công cụ -->
        <button class="tools-toggle-btn" @click="showTools = !showTools">
            <span v-if="showTools">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19V5"></path>
                </svg>
            </span>
            <span v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14M5 12h14"></path>
                </svg>
            </span>
        </button>

        <!-- Canvas area - giữ đúng tỷ lệ của imagePreview -->
        <div class="canvas-main" ref="canvasContainer" @mouseleave="handleMouseLeave">
            <canvas ref="canvasElement" :width="canvasWidth" :height="canvasHeight" @mousedown="startDrawing"
                @mousemove="draw" @mouseup="stopDrawing" @mouseleave="stopDrawing" @touchstart="handleTouchStart"
                @touchmove="handleTouchMove" @touchend="stopDrawing"></canvas>
        </div>

        <!-- Thanh công cụ có thể ẩn/hiện -->
        <div class="tools-panel" :class="{ 'tools-panel-visible': showTools }">
            <div class="panel-header">
                <h3>Công cụ vẽ</h3>
                <button class="btn-close" @click="showTools = false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="tools-content">
                <!-- Brush Size -->
                <div class="control-group">
                    <label for="brush_size">Kích thước bút:</label>
                    <div class="size-control">
                        <input type="range" id="brush_size" v-model="brushSize" min="1" max="50" class="slider" />
                        <span class="value-display">{{ brushSize }}px</span>
                    </div>
                </div>

                <!-- Color Picker -->
                <div class="control-group">
                    <label>Màu sắc:</label>
                    <div class="color-palette">
                        <button v-for="color in colorPalette" :key="color" :style="{ backgroundColor: color }"
                            :class="{ active: currentColor === color }" @click="currentColor = color"
                            class="color-btn"></button>
                        <input type="color" v-model="currentColor" class="color-picker" />
                    </div>
                </div>

                <!-- Drawing Tools -->
                <div class="control-group">
                    <label>Công cụ:</label>
                    <div class="drawing-tools">
                        <button v-for="tool in drawingTools" :key="tool.name"
                            :class="{ active: currentTool === tool.name }" @click="currentTool = tool.name"
                            class="tool-btn" :title="tool.title">
                            {{ tool.icon }}
                        </button>
                    </div>
                </div>

                <!-- Reset Button -->
                <div class="control-group">
                    <button class="btn-reset" @click="resetCanvas">Xóa tất cả</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue';

// Props definition
const props = defineProps({
    imagePreview: {
        type: String,
        default: null
    }
});

// Emits
const emit = defineEmits(['update:imagePreview']);

// Toggle state for tools panel
const showTools = ref(false);

// Refs
const canvasElement = ref(null);
const canvasContainer = ref(null);

// Canvas state
const canvasWidth = ref(600);
const canvasHeight = ref(450);
const ctx = ref(null);
const isDrawing = ref(false);
const lastX = ref(0);
const lastY = ref(0);

// Drawing options
const brushSize = ref(5);
const currentColor = ref('#6366f1');
const currentTool = ref('brush');

// Color palette
const colorPalette = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#00ffff', '#ff00ff', '#6366f1', '#f97316'
];

// Drawing tools
const drawingTools = [
    { name: 'brush', icon: '✏️', title: 'Bút vẽ' },
    { name: 'eraser', icon: '🧽', title: 'Tẩy' },
    { name: 'line', icon: '⁄', title: 'Đường thẳng' },
    { name: 'rectangle', icon: '□', title: 'Hình chữ nhật' },
    { name: 'circle', icon: '○', title: 'Hình tròn' }
];

// Initial drawing position
let startX = 0;
let startY = 0;

// Image for background pattern
const patternImage = new Image();
patternImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABoSURBVDiNY/z//z8DNQETI41dRnUDGRkZqRdGTEyM1AsjqhnIBKMGjhg4aiBtDPxPJcC4gErmM85ngjCyesYFjC7MFKll/P+f7vH8n9JkQ/1kQ3nhoXpFQ3nldj7jejAja3DIyKEAAACJ0SdeNByBswAAAABJRU5ErkJggg==';

// Use computed for reactive image tracking
const previewImage = computed(() => props.imagePreview);

// 

const handleMouseLeave = (e) => {
  updatePreview(e);
};



// Initialize canvas on component mount
onMounted(() => {
    const canvas = canvasElement.value;
    ctx.value = canvas.getContext('2d');

    // First, adjust canvas size
    adjustCanvasSize();

    // Check if we have an image preview to load
    if (previewImage.value) {
        loadImageToCanvas(previewImage.value);
    } else {
        // Set initial canvas background
        initializeCanvas();
    }

    // Listen for window resize
    window.addEventListener('resize', handleResize);
});

// Handle window resize
const handleResize = () => {
    adjustCanvasSize();

    // If there's an imagePreview, redraw with new size
    if (previewImage.value) {
        loadImageToCanvas(previewImage.value);
    } else {
        // If no image, just draw background
        initializeCanvas();
    }
};

// Load image from imagePreview prop and maintain aspect ratio
const loadImageToCanvas = (imageSrc) => {
    if (!ctx.value) return;

    const image = new Image();
    image.crossOrigin = 'anonymous'; // Enable CORS for image loading

    image.onload = () => {
        // Calculate aspect ratio
        const aspectRatio = image.width / image.height;

        // Adjust canvas size based on aspect ratio
        adjustCanvasSize(aspectRatio);

        // Clear canvas first
        ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

        // Draw the image on canvas preserving aspect ratio
        ctx.value.drawImage(image, 0, 0, canvasWidth.value, canvasHeight.value);

        // Update preview after loading
        // updatePreview(false);
    };

    image.onerror = (error) => {
        console.error('Error loading image:', error);
        // Fallback to default canvas initialization
        initializeCanvas();
    };

    image.src = imageSrc;
};

// Watch for changes in the imagePreview prop
watch(previewImage, (newValue) => {
    if (newValue && ctx.value) {
        loadImageToCanvas(newValue);
    } else if (!newValue) {
        // If imagePreview becomes null, reset canvas
        initializeCanvas();
    }
});
// Watch for changes in the imagePreview prop
watch(() => props.imagePreview, (newValue) => {
    if (newValue && ctx.value) {
        loadImageToCanvas(newValue);
    }
});

// Adjust canvas size based on container and maintain aspect ratio
const adjustCanvasSize = (aspectRatio = 4 / 3) => {
    const container = canvasContainer.value;
    if (!container) return;

    const containerWidth = container.clientWidth - 20; // Account for padding
    const containerHeight = container.clientHeight - 20;

    // Start with container width and calculate height based on aspect ratio
    let newWidth = containerWidth;
    let newHeight = containerWidth / aspectRatio;

    // If height is too big, adjust width based on height
    if (newHeight > containerHeight) {
        newHeight = containerHeight;
        newWidth = containerHeight * aspectRatio;
    }

    // Update canvas dimensions
    canvasWidth.value = Math.round(newWidth);
    canvasHeight.value = Math.round(newHeight);
};

// Draw checkered background pattern
const initializeCanvas = () => {
    if (!ctx.value) return;

    const context = ctx.value;

    // Clear canvas first
    context.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

    // Fill with light background color
    context.fillStyle = '#f8fafc';
    context.fillRect(0, 0, canvasWidth.value, canvasHeight.value);

    // Create pattern for background
    patternImage.onload = () => {
        const pattern = context.createPattern(patternImage, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvasWidth.value, canvasHeight.value);

        // Update preview after initialization
        // updatePreview();
    };

    // If image is already loaded
    if (patternImage.complete) {
        const pattern = context.createPattern(patternImage, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvasWidth.value, canvasHeight.value);

        // Update preview after initialization
        // updatePreview();
    }
};

// Update the imagePreview with current canvas state
const updatePreview = () => {
    // if (!canvasElement.value) return;

    // Convert canvas to data URL
    const dataUrl = canvasElement.value.toDataURL('image/png');

    // Emit event to update the imagePreview prop
    emit('update:imagePreview', dataUrl);
};

// Reset canvas to initial state
const resetCanvas = () => {
    // Điều chỉnh kích thước canvas với tỷ lệ mặc định
    adjustCanvasSize();

    // Initialize with new dimensions
    initializeCanvas();
};

// Start drawing on mouse down
const startDrawing = (e) => {
    isDrawing.value = true;
    const rect = canvasElement.value.getBoundingClientRect();
    lastX.value = e.clientX - rect.left;
    lastY.value = e.clientY - rect.top;

    // Store start position for shapes
    startX = lastX.value;
    startY = lastY.value;

    // For single click dot
    if (currentTool.value === 'brush') {
        ctx.value.beginPath();
        ctx.value.arc(lastX.value, lastY.value, brushSize.value / 2, 0, Math.PI * 2);
        ctx.value.fillStyle = currentColor.value;
        ctx.value.fill();

        // Update preview after drawing a dot
        // updatePreview();
    }
};

// Handle touch events for mobile
const handleTouchStart = (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        startDrawing(mouseEvent);
    }
};

const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        draw(mouseEvent);
    }
};

// Draw while mouse is moving and button is pressed
const draw = (e) => {
    if (!isDrawing.value) return;

    const rect = canvasElement.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const context = ctx.value;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    if (currentTool.value === 'brush') {
        context.beginPath();
        context.strokeStyle = currentColor.value;
        context.lineWidth = brushSize.value;
        context.moveTo(lastX.value, lastY.value);
        context.lineTo(x, y);
        context.stroke();
    } else if (currentTool.value === 'eraser') {
        context.beginPath();
        context.strokeStyle = '#f8fafc';
        context.lineWidth = brushSize.value;
        context.moveTo(lastX.value, lastY.value);
        context.lineTo(x, y);
        context.stroke();

        // Redraw pattern in the erased area
        context.globalCompositeOperation = 'destination-over';
        const pattern = context.createPattern(patternImage, 'repeat');
        context.strokeStyle = pattern;
        context.stroke();
        context.globalCompositeOperation = 'source-over';
    }

    lastX.value = x;
    lastY.value = y;

    // Update preview continuously while drawing
    // updatePreview();
};

// Stop drawing on mouse up or leave
const stopDrawing = (e) => {
    if (!isDrawing.value) return;

    if (currentTool.value !== 'brush' && currentTool.value !== 'eraser') {
        const rect = canvasElement.value.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const context = ctx.value;
        context.strokeStyle = currentColor.value;
        context.lineWidth = brushSize.value;

        if (currentTool.value === 'line') {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(x, y);
            context.stroke();
        } else if (currentTool.value === 'rectangle') {
            context.beginPath();
            context.rect(
                Math.min(startX, x),
                Math.min(startY, y),
                Math.abs(x - startX),
                Math.abs(y - startY)
            );
            context.stroke();
        } else if (currentTool.value === 'circle') {
            context.beginPath();
            const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
            context.arc(startX, startY, radius, 0, Math.PI * 2);
            context.stroke();
        }
    }

    isDrawing.value = false;

    // Update preview after drawing is finished
    // updatePreview();
};

// Watch for tool changes
watch(currentTool, (newTool) => {
    if (newTool === 'eraser') {
        // Change cursor for eraser
        canvasElement.value.style.cursor = 'cell';
    } else {
        canvasElement.value.style.cursor = 'crosshair';
    }
});
</script>

<style scoped>
.canvas-editor-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #ffffff;
    position: relative;
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
    cursor: crosshair;
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
    z-index: 10;
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
}

.tools-panel-visible {
    right: 0;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;
}

.panel-header h3 {
    margin: 0;
    color: #1e293b;
    font-weight: 600;
    font-size: 1.2rem;
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
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.control-group label {
    font-weight: 600;
    color: #475569;
    font-size: 0.95rem;
}

.size-control {
    display: flex;
    align-items: center;
    gap: 15px;
}

.slider {
    flex: 1;
    -webkit-appearance: none;
    height: 6px;
    border-radius: 5px;
    background: #e2e8f0;
    outline: none;
}

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
    font-size: 0.9rem;
    min-width: 40px;
    text-align: right;
}

.color-palette {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.color-btn {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    border: 2px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.2s;
}

.color-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.color-btn.active {
    border-color: #1e293b;
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.color-picker {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    overflow: hidden;
}

.drawing-tools {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
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
}

.tool-btn:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.tool-btn.active {
    background-color: #eff6ff;
    border-color: #93c5fd;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(99, 102, 241, 0.15);
}

.btn-reset {
    padding: 12px 15px;
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
    text-align: center;
    margin-top: 10px;
}

.btn-reset:hover {
    background-color: #e2e8f0;
    color: #1e293b;
}

@media (max-width: 768px) {
    .tools-panel {
        width: 280px;
    }

    .drawing-tools {
        gap: 10px;
    }

    .tool-btn {
        width: 35px;
        height: 35px;
        font-size: 1rem;
    }
}
</style>