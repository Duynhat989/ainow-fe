<template>
    <div class="upload-section">
        <div class="upload-options">
            <!-- Upload Area -->
            <div class="upload-area" 
                @dragover.prevent="isDragging = true" 
                @dragleave.prevent="isDragging = false" 
                @drop.prevent="handleDrop" 
                @click="triggerFileInput"
                :class="{ 'drag-over': isDragging }"
            >
                <input 
                    type="file" 
                    ref="fileInput" 
                    @change="handleFileSelect" 
                    accept="image/*" 
                    class="file-input" 
                />
                
                <div class="upload-content">
                    <div class="upload-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                    </div>
                    <h3>Upload an image</h3>
                    <p>Drag and drop your image here or click to select</p>
                    <p class="upload-formats">Supports JPG, PNG, WEBP (Maximum 10MB)</p>
                    
                    <div class="upload-sources">
                        <button @click.stop="openComputer" class="source-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                            <span>Computer</span>
                        </button>
                        
                        <button @click.stop="openCamera" class="source-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                            <span>Camera</span>
                        </button>
                        
                        <button @click.stop="pasteFromClipboard" class="source-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            </svg>
                            <span>Clipboard</span>
                        </button>
                        
                        <button @click.stop="openUrl" class="source-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <span>URL</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="divider">
                <span>OR</span>
            </div>

            <!-- Generate Area -->
            <div class="generate-area">
                <div class="generate-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                </div>
                <h3>Generate with AI</h3>
                <p>Describe the image you want to create</p>

                <div class="ai-options">
                    <div class="option-row">
                        <div class="option-group">
                            <label>Style:</label>
                            <div class="style-select">
                                <select v-model="selectedStyle">
                                    <option value="realistic">Realistic</option>
                                    <option value="artistic">Artistic</option>
                                    <option value="cartoon">Cartoon</option>
                                    <option value="sketch">Sketch</option>
                                    <option value="fantasy">Fantasy</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="option-group">
                            <label>Quality:</label>
                            <div class="quality-select">
                                <select v-model="selectedQuality">
                                    <option value="standard">Standard</option>
                                    <option value="high">High</option>
                                    <option value="ultra">Ultra</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <ImageRatioView :initial-ratio="selectedRatio" @ratio-changed="onRatioChanged" />
                
                <div class="prompt-input">
                    <textarea 
                        :value="imagePrompt" 
                        @input="updateImagePrompt"
                        placeholder="Describe the image you want to generate..."
                        class="prompt-field"
                        rows="4"
                    ></textarea>
                    <div class="input-counter" :class="{ 'warning': promptLength > 450 }">
                        {{ promptLength }}/500
                    </div>
                </div>
                
                <div class="action-bar">
                    <button 
                        class="btn-generate" 
                        @click="$emit('generate-image')"
                        :disabled="!imagePrompt || isGenerating || promptLength > 500"
                    >
                        <span class="btn-icon" v-if="isGenerating">
                            <svg class="spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="30 180"></circle>
                            </svg>
                        </span>
                        <span class="btn-icon" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </span>
                        {{ isGenerating ? 'Generating...' : 'Generate Image' }}
                    </button>
                </div>

                <div class="suggestions-container">
                    <div class="suggestions-header">
                        <span>Suggestions:</span>
                        <button class="refresh-suggestions" @click="refreshSuggestions">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M23 4v6h-6"></path>
                                <path d="M1 20v-6h6"></path>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                                <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="example-tags">
                        <span 
                            v-for="(prompt, index) in displayedPrompts" 
                            :key="index"
                            @click="$emit('set-example', prompt.description)"
                        >
                            {{ prompt.title }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- URL Modal Dialog -->
        <div class="url-modal" v-if="showUrlModal" @click.self="showUrlModal = false">
            <div class="url-modal-content">
                <div class="url-modal-header">
                    <h3>Enter Image URL</h3>
                    <button class="modal-close" @click="showUrlModal = false">×</button>
                </div>
                <div class="url-modal-body">
                    <input 
                        type="text" 
                        v-model="imageUrl" 
                        placeholder="https://example.com/image.jpg"
                        class="url-input"
                        @keyup.enter="processUrlImage"
                    />
                    <div class="url-actions">
                        <button class="btn-cancel" @click="showUrlModal = false">Cancel</button>
                        <button 
                            class="btn-confirm" 
                            @click="processUrlImage"
                            :disabled="!isValidUrl"
                        >
                            Load Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ImageRatioView from '@/components/AIEdit/ImageRatio.vue';

// Props
const props = defineProps({
    selectedRatio: {
        type: String,
        default: '1-1'
    },
    imagePrompt: {
        type: String,
        default: ''
    },
    isGenerating: {
        type: Boolean,
        default: false
    },
    examplePrompts: {
        type: Array,
        default: () => []
    }
});

// Emits
const emit = defineEmits([
    'file-selected', 
    'drop-file', 
    'ratio-changed', 
    'update:image-prompt',
    'generate-image',
    'set-example'
]);

// Refs
const fileInput = ref(null);
const isDragging = ref(false);
const selectedStyle = ref('realistic');
const selectedQuality = ref('standard');
const showUrlModal = ref(false);
const imageUrl = ref('');

// All available prompts
const allPrompts = ref([
    { title: 'Mountain landscape', description: 'A peaceful mountain landscape with snow-capped peaks and a clear blue sky' },
    { title: 'Ocean sunset', description: 'A beautiful sunset over the ocean with vibrant orange and pink hues' },
    { title: 'Modern architecture', description: 'A futuristic city skyline with unique modern architecture and glass buildings' },
    { title: 'Watercolor portrait', description: 'An artistic watercolor portrait of a person with vibrant colors' },
    { title: 'Fantasy forest', description: 'A mystical forest with glowing plants, magical creatures and a small stream' },
    { title: 'Abstract pattern', description: 'A colorful abstract pattern with geometric shapes and vivid contrasting colors' },
    { title: 'Cyberpunk cityscape', description: 'A cyberpunk cityscape at night with neon lights and flying vehicles' },
    { title: 'Vintage still life', description: 'A vintage-style still life with fruits, flowers and antique objects' },
    { title: 'Desert oasis', description: 'A peaceful desert oasis with palm trees, a small pond and sand dunes in the background' },
    { title: 'Pet portrait', description: 'A detailed portrait of a cute pet with expressive eyes and a playful pose' }
]);

// Computed
const promptLength = computed(() => props.imagePrompt.length);

const displayedPrompts = computed(() => {
    // Show 4 random suggestions from the list
    return getRandomItems(allPrompts.value, 4);
});

const isValidUrl = computed(() => {
    if (!imageUrl.value) return false;
    try {
        const url = new URL(imageUrl.value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        return false;
    }
});

// Methods
const triggerFileInput = () => {
    fileInput.value.click();
};

const handleDrop = (event) => {
    isDragging.value = false;
    emit('drop-file', event);
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        emit('file-selected', file);
    }
};

const onRatioChanged = (ratio) => {
    emit('ratio-changed', ratio);
};

const updateImagePrompt = (event) => {
    emit('update:image-prompt', event.target.value);
};

const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const refreshSuggestions = () => {
    // This will trigger a re-render of displayedPrompts
    allPrompts.value = [...allPrompts.value];
};

const openComputer = () => {
    triggerFileInput();
};

const openCamera = () => {
    // Try to access the device camera if supported
    fileInput.value.setAttribute('capture', 'environment');
    fileInput.value.setAttribute('accept', 'image/*');
    triggerFileInput();
    
    // Reset attributes after click
    setTimeout(() => {
        fileInput.value.removeAttribute('capture');
        fileInput.value.setAttribute('accept', 'image/*');
    }, 1000);
};

const pasteFromClipboard = async () => {
    try {
        if (!navigator.clipboard) {
            alert('Clipboard access is not supported in your browser.');
            return;
        }
        
        // Try to read from clipboard
        const clipboardItems = await navigator.clipboard.read();
        let foundImage = false;
        
        for (const item of clipboardItems) {
            for (const type of item.types) {
                if (type.startsWith('image/')) {
                    const blob = await item.getType(type);
                    const file = new File([blob], `clipboard-image-${Date.now()}.png`, { type });
                    emit('file-selected', file);
                    foundImage = true;
                    break;
                }
            }
            if (foundImage) break;
        }
        
        if (!foundImage) {
            alert('No image found in clipboard. Copy an image and try again.');
        }
    } catch (error) {
        console.error('Failed to read clipboard:', error);
        alert('Could not access clipboard. Please try another method.');
    }
};

const openUrl = () => {
    showUrlModal.value = true;
    setTimeout(() => {
        const urlInput = document.querySelector('.url-input');
        if (urlInput) urlInput.focus();
    }, 100);
};

const processUrlImage = async () => {
    if (!isValidUrl.value) {
        alert('Please enter a valid image URL.')
        return;
    } 
    try {
        // Fetch the image from the URL
        const response = await fetch(imageUrl.value);
        if (!response.ok) throw new Error('Failed to fetch image');
        
        const blob = await response.blob();
        if (!blob.type.startsWith('image/')) {
            throw new Error('The URL does not point to a valid image');
        }
        
        // Create a File from the blob
        const filename = imageUrl.value.split('/').pop() || `url-image-${Date.now()}.jpg`;
        const file = new File([blob], filename, { type: blob.type });
        
        // Process the file
        emit('file-selected', file);
        
        // Close modal and reset
        showUrlModal.value = false;
        imageUrl.value = '';
    } catch (error) {
        console.error('Error processing image URL:', error);
        alert('Could not load image from this URL. Please check the URL and try again.');
    }
};
</script>


<style scoped>
.upload-section {
  padding: 40px;
}

.upload-options {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 25px;
  align-items: center;
}

.upload-area,
.generate-area {
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.upload-area {
  border: 2px dashed #cbd5e1;
  background-color: rgba(243, 244, 246, 0.5);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-area:hover,
.upload-area.drag-over {
  border-color: #6366f1;
  background-color: rgba(237, 242, 247, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.1);
}

.generate-area {
  border: 1px solid #e2e8f0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.file-input {
  display: none;
}

.upload-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-icon,
.generate-icon {
  color: #6366f1;
  background-color: rgba(237, 241, 253, 0.8);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto 10px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.upload-area h3,
.generate-area h3 {
  margin-bottom: 10px;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
}

.upload-area p,
.generate-area p {
  color: #64748b;
  margin-bottom: 10px;
  line-height: 1.6;
}

.upload-formats {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 5px 0 20px;
  background-color: rgba(226, 232, 240, 0.3);
  padding: 6px 12px;
  border-radius: 6px;
  display: inline-block;
}

.upload-sources {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.source-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  border: 1px solid #e2e8f0;
  background-color: white;
  border-radius: 10px;
  color: #475569;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 80px;
}

.source-button:hover {
  background-color: #f8fafc;
  border-color: #6366f1;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  color: #6366f1;
}

.divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
}

.divider span {
  background-color: white;
  padding: 8px 16px;
  color: #94a3b8;
  font-weight: 600;
  position: relative;
  z-index: 2;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.divider::before,
.divider::after {
  content: '';
  width: 1px;
  height: 80px;
  background-color: #e2e8f0;
  position: relative;
  z-index: 1;
}

/* AI Options */
.ai-options {
  width: 100%;
  margin: 15px 0;
}

.option-row {
  display: flex;
  gap: 15px;
  width: 100%;
}

.option-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.option-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
}

.style-select,
.quality-select {
  width: 100%;
  position: relative;
}

.style-select select,
.quality-select select {
  width: 100%;
  padding: 10px 15px;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: #1e293b;
  font-size: 0.9rem;
  transition: all 0.2s;
  cursor: pointer;
}

.style-select::after,
.quality-select::after {
  content: "▼";
  font-size: 0.7rem;
  color: #64748b;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.style-select select:focus,
.quality-select select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

/* Prompt Input */
.prompt-input {
  margin: 15px 0;
  position: relative;
  width: 100%;
}

.prompt-field {
  width: 100%;
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  resize: none;
  transition: all 0.2s;
  font-family: inherit;
  line-height: 1.5;
}

.prompt-field:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.input-counter {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-size: 0.8rem;
  color: #94a3b8;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 4px;
}

.input-counter.warning {
  color: #ef4444;
}

/* Action Bar */
.action-bar {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.btn-generate {
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(to right, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-generate:hover:not(:disabled) {
  background: linear-gradient(to right, #4f46e5, #4338ca);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

.btn-generate:disabled {
  background: linear-gradient(to right, #94a3b8, #cbd5e1);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  animation: spin 1.5s linear infinite;
  width: 20px;
  height: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Suggestions */
.suggestions-container {
  width: 100%;
}

.suggestions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.suggestions-header span {
  font-weight: 600;
  color: #475569;
  font-size: 0.9rem;
}

.refresh-suggestions {
  background: none;
  border: none;
  color: #6366f1;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.refresh-suggestions:hover {
  background-color: rgba(99, 102, 241, 0.1);
  transform: rotate(30deg);
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.example-tags span {
  padding: 6px 12px;
  background-color: #f8fafc;
  border-radius: 30px;
  font-size: 0.8rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e2e8f0;
}

.example-tags span:hover {
  background-color: #f1f5f9;
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  color: #6366f1;
}

/* URL Modal */
.url-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.url-modal-content {
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
  overflow: hidden;
}

.url-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.url-modal-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.2rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
}

.url-modal-body {
  padding: 20px;
}

.url-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.url-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.url-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  padding: 10px 20px;
  background-color: #f1f5f9;
  border: none;
  border-radius: 8px;
  color: #475569;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background-color: #e2e8f0;
}

.btn-confirm {
  padding: 10px 20px;
  background-color: #6366f1;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-confirm:hover:not(:disabled) {
  background-color: #4f46e5;
  transform: translateY(-2px);
}

.btn-confirm:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Recent Uploads */
.recent-uploads {
  width: 100%;
}

.recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.recent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  width: 100%;
  margin-bottom: 20px;
}

.recent-item {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  cursor: pointer;
}

.recent-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
  border-color: #6366f1;
}

.recent-item img {
  width: 100%;
  height: 90px;
  object-fit: cover;
  display: block;
}

.recent-info {
  padding: 8px;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.recent-name {
  font-size: 0.8rem;
  color: #1e293b;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-date {
  font-size: 0.7rem;
  color: #64748b;
}

.show-upload-options {
  padding: 12px 24px;
  background: linear-gradient(to right, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.show-upload-options:hover {
  background: linear-gradient(to right, #4f46e5, #4338ca);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive design */
@media (max-width: 1024px) {
  .upload-options {
    grid-template-columns: 1fr;
  }

  .divider {
    flex-direction: row;
    height: auto;
    margin: 20px 0;
  }

  .divider::before,
  .divider::after {
    width: 100px;
    height: 1px;
  }
}

@media (max-width: 768px) {
  .upload-section {
    padding: 25px;
  }

  .upload-area,
  .generate-area {
    padding: 20px;
  }

  .option-row {
    flex-direction: column;
    gap: 10px;
  }

  .btn-generate {
    padding: 12px 15px;
  }

  .url-modal-content {
    width: 95%;
  }
}

@media (max-width: 480px) {
  .upload-sources {
    gap: 5px;
  }

  .source-button {
    width: 70px;
    font-size: 0.75rem;
  }

  .example-tags {
    gap: 5px;
  }

  .example-tags span {
    padding: 5px 10px;
    font-size: 0.75rem;
  }
}
</style>