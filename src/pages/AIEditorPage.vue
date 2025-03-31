<template>
    <div class="editor-page">
        <div class="container">
            <h1 class="page-title">AI Image Editor Tool</h1>
            <p class="page-subtitle">Edit your images with the power of artificial intelligence</p>

            <div class="editor-container">
                <div class="upload-section" v-if="!selectedImage">
                    <div class="upload-options">
                        <div class="upload-area" @dragover.prevent="dragOver = true"
                            @dragleave.prevent="dragOver = false" @drop.prevent="handleDrop" @click="triggerFileInput"
                            :class="{ 'drag-over': dragOver }">
                            <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*"
                                class="file-input" />
                            <div class="upload-icon">📁</div>
                            <h3>Upload an image to start</h3>
                            <p>Drag and drop your image here or click to select</p>
                            <p class="upload-formats">Supports JPG, PNG, WEBP (Maximum 10MB)</p>
                        </div>

                        <div class="divider">
                            <span>OR</span>
                        </div>

                        <div class="generate-area">
                            <div class="generate-icon">🎨</div>
                            <h3>Generate an image with AI</h3>
                            <p>Describe the image you want to create</p>

                            <!-- Image ratio selection section -->
                            <div class="image-ratio-selector">
                                <p>Image ratio:</p>
                                <div class="ratio-options">
                                    <button class="ratio-option" :class="{ active: selectedRatio === 'square' }"
                                        @click="selectedRatio = 'square'">1-1</button>
                                    <button class="ratio-option" :class="{ active: selectedRatio === 'vertical' }"
                                        @click="selectedRatio = 'vertical'">9-16</button>
                                    <button class="ratio-option" :class="{ active: selectedRatio === 'horizontal' }"
                                        @click="selectedRatio = 'horizontal'">16-9</button>
                                </div>
                            </div>

                            <div class="prompt-input">
                                <input type="text" v-model="imagePrompt"
                                    placeholder="Example: A tropical beach with clear blue water and palm trees"
                                    class="prompt-field" />
                                <button class="btn-generate" @click="generateImage"
                                    :disabled="!imagePrompt || isGenerating">
                                    {{ isGenerating ? 'Generating...' : 'Generate image' }}
                                </button>
                            </div>

                            <div class="generate-examples">
                                <p>Suggestions:</p>
                                <div class="example-tags">
                                    <span v-for="(temp, index) of examplePrompt"
                                        @click="setExamplePrompt(temp.description)">{{ temp.title }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="editor-workspace" v-else>
                    <div class="editor-main">
                        <div class="image-preview">
                            <img :src="imagePreview" alt="Preview" />
                        </div>

                        <div class="editor-tools">
                            <div class="tools-header">
                                <h3>Editing AI Tools</h3>
                                <button class="btn-reset" @click="resetImage">Reset</button>
                            </div>

                            <div class="layout-data">
                                <div class="model">
                                    <label for="model_ai">Model:</label>
                                    <div class="model-select-wrapper">
                                        <select name="model_ai" id="model_ai">
                                            <option value="mini">AINow 2 mini</option>
                                            <option value="pro">AINow 2 Pro</option>
                                        </select>
                                    </div>
                                    <!-- <span class="model-badge">Fast</span> -->
                                </div>
                                <!-- Add Effects Gallery button/component here -->
                                <div class="effects-gallery-container">
                                    <EffectsPopup @apply-effect="handleEffectApply" />
                                </div>
                            </div>
                            <div class="tools-tabs">
                                <button v-for="tab in toolTabs" :key="tab.id" @click="activeTab = tab.id"
                                    :class="{ active: activeTab === tab.id }" class="tab-button">
                                    {{ tab.name }}
                                </button>
                            </div>

                            <div class="tools-content">
                                <!-- Tab: AI -->
                                <!-- Tab: Chat AI -->
                                <div v-if="activeTab === 'chat'" class="tool-group">
                                    <div class="chat-container">
                                        <div class="chat-messages" ref="chatMessagesRef">
                                            <div v-for="(message, index) in chatMessages" :key="index"
                                                :class="['chat-message', message.sender === 'user' ? 'user-message' : 'ai-message']">
                                                <div class="message-content">{{ message.text }}</div>
                                                <div v-if="message.attachments && message.attachments.length > 0"
                                                    class="message-attachments">
                                                    <img v-for="(attachment, i) in message.attachments" :key="i"
                                                        :src="attachment.preview"
                                                        @click="viewFullImage(attachment.preview)"
                                                        alt="Attached image" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="chat-input-container">
                                            <div class="chat-attachment">
                                                <input type="file" id="chat-file-input" @change="handleChatAttachment"
                                                    accept="image/*" multiple class="chat-file-input" />
                                                <label for="chat-file-input" class="attachment-btn" title="Add images">
                                                    <span class="attachment-icon">📎</span>
                                                </label>
                                                <div class="selected-attachments"
                                                    v-if="chatAttachments && chatAttachments.length > 0">
                                                    <div v-for="(attachment, index) in chatAttachments" :key="index"
                                                        class="attachment-preview">
                                                        <img :src="attachment.preview" alt="Attachment preview" />
                                                        <button class="remove-attachment"
                                                            @click="removeAttachment(index)">×</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="chat-input">
                                                <input type="text" v-model="chatInput"
                                                    placeholder="Describe the edits you want to make..."
                                                    @keyup.enter="sendChatMessage" />
                                                <button @click="sendChatMessage"
                                                    :disabled="!chatInput && (!chatAttachments || chatAttachments.length === 0)">Send</button>
                                            </div>
                                        </div>

                                        <div class="chat-suggestions">
                                            <p>Suggestions:</p>
                                            <div class="suggestion-tags">
                                                <span
                                                    @click="setChatSuggestion('Blur the background and focus on the subject')">Blur
                                                    background</span>
                                                <span
                                                    @click="setChatSuggestion('Change the shirt color to blue')">Change
                                                    color</span>
                                                <span @click="setChatSuggestion('Add lighting effects')">Add
                                                    lighting</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="editor-actions">
                                <button class="btn btn-secondary" @click="resetImage">Cancel</button>
                                <button class="btn btn-primary" @click="saveImage">Save image</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- AI Processing Overlay -->
            <div class="processing-overlay" v-if="isProcessing || isGenerating">
                <div class="processing-content">
                    <div class="spinner"></div>
                    <p>{{ isGenerating ?
                        'AI is generating an image from your description...'
                        : 'AI is processing your image...' }}</p>
                </div>
            </div>

            <!-- Lightbox Modal for viewing full images -->
            <div class="lightbox-overlay" v-if="lightboxImage" @click="closeLightbox">
                <div class="lightbox-content">
                    <img :src="lightboxImage" alt="Full size image" />
                    <button class="lightbox-close" @click.stop="closeLightbox">×</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import request from '@/utils/request';
import { ref, reactive, watch, nextTick } from 'vue';

// Refs
const fileInput = ref(null);
const selectedImage = ref(null);
const imagePreview = ref('');
const dragOver = ref(false);
const isProcessing = ref(false);
const isGenerating = ref(false);
const activeTab = ref('chat'); // Changed default to AI tab since basic is removed
const imagePrompt = ref('');
const chatInput = ref('');
const chatMessagesRef = ref(null);
const chatMessages = ref([
    { sender: 'ai', text: 'Hello! I am an AI assistant. How would you like to edit your image?' }
]);
const chatAttachments = ref([]);
const selectedRatio = ref('square');


const lightboxImage = ref(null);

// Suggestion keywords list for images
const examplePrompt = [
    {
        title: 'Majestic mountain landscape',
        description: 'A landscape painting with majestic mountains and a clear blue sky.'
    },
    {
        title: 'Artistic portrait in watercolor style',
        description: 'An artistic portrait with colorful watercolor style.'
    },
    {
        title: 'Future city with neon lights',
        description: 'A painting of a futuristic city with vibrant neon lights.'
    }
]


// Removed basic tab from toolTabs
const toolTabs = [
    // { id: 'chat', name: 'Chat with AI' },
    // { id: 'ai', name: 'AI Tools' }
];

// Reactive state
const imageSize = reactive({
    width: 0,
    height: 0
});
import EffectsPopup from '../components/EffectsPopup.vue';

// Your existing code...

// Handle effect application from the popup
const handleEffectApply = (effectId) => {
    console.log(`Applying effect: ${effectId}`);
    applyAIEffect(effectId);
};
// Watch for chat messages changes to scroll to bottom
watch(chatMessages, () => {
    nextTick(() => {
        if (chatMessagesRef.value) {
            chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
        }
    });
}, { deep: true });

// Methods
const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        processFile(file);
    }
};

const handleDrop = (event) => {
    dragOver.value = false;
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        processFile(file);
    }
};

const processFile = (file) => {
    if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds the 10MB limit');
        return;
    }

    selectedImage.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.value = e.target.result;

        // Get image dimensions for the size inputs
        const img = new Image();
        img.onload = () => {
            imageSize.width = img.width;
            imageSize.height = img.height;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

const resetImage = () => {
    if (confirm('Are you sure you want to reset the image?')) {
        selectedImage.value = null;
        imagePreview.value = '';
        chatMessages.value = [
            { sender: 'ai', text: 'Hello! I am an AI assistant. How would you like to edit your image?' }
        ];
        chatAttachments.value = [];
    }
};

const handleChatAttachment = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                chatAttachments.value.push({
                    file: file,
                    preview: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    }
    // Reset input so same file can be selected again
    event.target.value = '';
};

const removeAttachment = (index) => {
    chatAttachments.value.splice(index, 1);
};

const viewFullImage = (src) => {
    lightboxImage.value = src;
};

const closeLightbox = () => {
    lightboxImage.value = null;
};

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const generateImage = async () => {
    if (!imagePrompt.value) return;

    isGenerating.value = true;
    try {
        // Get dimensions based on selected ratio
        const response = await request.post('/api/ainow/generate-image', {
            prompt: imagePrompt.value,
            sizeText: selectedRatio.value
        });

        console.log('Image generation response:', response);
        if (response.success) {
            const inlineData = response.result[0]?.candidates[0]?.content.parts[0]?.inlineData
            console.log(inlineData)
            const baseStr = inlineData?.data;
            const mimeType = inlineData?.mimeType;

            imagePreview.value = `data:${mimeType};base64,${baseStr}`;
            selectedImage.value = 'generated';
            isGenerating.value = false;

            // Stop the polling loop
        } else {
            alert('An error occurred while generating the image. Please try again.');
            isGenerating.value = false;
        }
    } catch (error) {
        console.error('Error generating image:', error);
        alert('An error occurred while generating the image. Please try again.');
        isGenerating.value = false;
    }
};

const setExamplePrompt = (prompt) => {
    imagePrompt.value = prompt;
};
const convertUrlToBase64 = async (url) => {
    try {
        // Fetch the image
        const response = await fetch(url, {
            // Include any necessary CORS headers if needed
            mode: 'cors',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
        }

        // Convert to blob
        const blob = await response.blob();

        // Convert blob to base64
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // This will give you the full data URL (e.g., "data:image/webp;base64,...")
                const fullBase64 = reader.result;

                // If you need just the base64 part without the prefix:
                const base64Data = fullBase64.split(',')[1];

                resolve({
                    fullBase64, // Full data URL
                    base64Data  // Just the base64 part
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error converting image to base64:", error);
        return null;
    }
};

const applyAIEffect = async (effect) => {
    isProcessing.value = true;
    // Process content 
    console.log(effect)
    // Xóa nền 
    if (effect == 'remove-bg') {
        try {
            const response = await request.post('/api/ainow/remove_bg', {
                "images": [
                    imagePreview.value.replace('data:', '')
                ]
            });

            if (response.success) {
                // Xử lý hàm
                let processId = response.sessionId;

                // Set up polling with timeout
                const startTime = Date.now();
                const timeoutMs = 100 * 1000; // 100 seconds
                let completed = false;
                await new Promise(resolve => setTimeout(resolve, 3000));
                while (Date.now() - startTime < timeoutMs && !completed) {
                    try {
                        const res = await request.post('/api/ainow/get_task', {
                            "processId": processId
                        });

                        if (res.success) {
                            completed = true;
                            // Usage
                            let origin = res.data[0].origin
                            let rss = await request.post('/api/ainow/url_basestr', {
                                "imageUrl": origin
                            })
                            imagePreview.value = rss.base64
                            //     console.log(`Applying AI effect: ${effect}`);
                            //     // In a real app, this would call an API to process the image
                            isProcessing.value = false;

                            // Add a message to chat if it's a restoration or enhancement
                            if (effect === 'restore' || effect === 'enhance' || effect === 'remove-bg') {
                                chatMessages.value.push({
                                    sender: 'ai',
                                    text: `I have ${effect} your image. Would you like any additional adjustments?`
                                });
                            }
                            // Handle successful response here
                            break;
                        }
                    } catch (error) {
                        // Handle network errors or other exceptions
                        console.error("Error checking task status:", error);
                        // else if (res.msg === 'pending') {
                        //     // Task is still pending, continue polling
                        //     console.log("Task is pending, continuing to poll...");
                        // } else {
                        //     // Some other error occurred
                        //     throw new Error(`Task failed: ${res.msg}`);
                        // }
                    }
                    // Wait 3 seconds before trying again
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }

                if (!completed) {
                    alert('Operation timed out after 100 seconds. Please try again.');
                }

            } else {
                alert('An error occurred while generating the image. Please try again.');
            }
        } catch (error) {
            console.error("Error in applyAIEffect:", error);
            alert('An error occurred. Please try again.');
        } finally {
            isGenerating.value = false;
            isProcessing.value = false;
        }
    }
};
const sendChatMessage = async () => {

    if (!chatInput.value && (!chatAttachments.value || chatAttachments.value.length === 0)) return;

    // Create user message with both text and attachments
    const message = {
        sender: 'user',
        text: chatInput.value || 'Please process these images',
        attachments: [...chatAttachments.value]
    };

    chatMessages.value.push(message);
    console.log(message)

    const userRequest = chatInput.value;
    chatInput.value = '';

    // Clear attachments after sending
    const hadAttachments = chatAttachments.value.length > 0;
    chatAttachments.value = [];


    isProcessing.value = true;
    let attachments = []
    attachments.push({
        attachment: imagePreview.value.split(',')[1]
    })
    for (let index = 0; index < message.attachments.length; index++) {
        attachments.push({
            attachment: message.attachments[index].preview.split(',')[1]
        })
    }
    // Thực hiện 
    // console.log(attachments)
    const response = await request.post('/api/ainow/generate-image-edit', {
        prompt: `${message.text}. `,
        imageArrays: attachments
    });
    const sendText = () => {
        let responseText = userRequest
            ? `I will "${userRequest.toLowerCase()}".`
            : 'I will process the images you sent.';

        if (hadAttachments) {
            responseText += ' I have received your images. Processing...';
        } else {
            responseText += ' Processing...';
        }

        chatMessages.value.push({
            sender: 'ai',
            text: responseText
        });


        // Simulate processing time
        setTimeout(() => {
            isProcessing.value = false;

            // Add completion message
            let completionText = hadAttachments
                ? `I have completed processing the images`
                : `I have completed ${userRequest ? userRequest.toLowerCase() : 'processing your request'}`;

            chatMessages.value.push({
                sender: 'ai',
                text: `${completionText}. Are you satisfied with the result?`
            });
        }, 2000);
    }
    // console.log('Image generation response:', response);
    if (response.success) {
        const inlineData = response.result[0]?.candidates[0]?.content.parts[0]?.inlineData
        // console.log(inlineData.data)
        const baseStr = inlineData?.data;
        const mimeType = inlineData?.mimeType;
        imagePreview.value = `data:${mimeType};base64,${baseStr}`;
        selectedImage.value = 'generated';
        isGenerating.value = false;
        sendText()

        // Stop the polling loop
    } else {
        alert('An error occurred while generating the image. Please try again.');
        isGenerating.value = false;
    }

};

const setChatSuggestion = (suggestion) => {
    chatInput.value = suggestion;
};

const saveImage = () => {
    try {
        // Check if there's an image to save
        if (!imagePreview.value) {
            alert('No image to save. Please upload or generate an image first.');
            return;
        }

        // Show saving message
        isProcessing.value = true;

        // Create a temporary image to handle conversion
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';

        // Function to continue after image loads
        tempImg.onload = () => {
            // Create a canvas to draw the image
            const canvas = document.createElement('canvas');
            canvas.width = tempImg.width;
            canvas.height = tempImg.height;

            // Draw the image on the canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(tempImg, 0, 0);

            // Always save as PNG format
            const dataURL = canvas.toDataURL('image/png');

            // Generate a filename with timestamp and fixed PNG extension
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `edited-ainow-${timestamp}.png`;

            // Create a download link element
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = filename;

            // Append the link to the body (required for Firefox)
            document.body.appendChild(downloadLink);

            // Trigger the download
            downloadLink.click();

            // Clean up by removing the link
            document.body.removeChild(downloadLink);

            console.log('Image saved successfully:', filename);

            // Hide saving message
            isProcessing.value = false;

            // Show success message to the user
        };

        // Handle load errors
        tempImg.onerror = (error) => {
            console.error('Error loading image for saving:', error);
            isProcessing.value = false;
            alert('Failed to save the image. There was an error processing the image data.');
        };

        // Start loading the image
        tempImg.src = imagePreview.value;

    } catch (error) {
        console.error('Error saving image:', error);
        isProcessing.value = false;
    }
};
</script>
<style scoped>
.effects-gallery-container {
    margin-left: auto;
}

.layout-data {
    display: flex;
    align-items: center;
}

/* Modern CSS Improvements for AI Image Editor */
.editor-page {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 40px 0;
    background-color: #f5f7fa;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #e6edf5 100%);
    min-height: 100vh;
    color: #334155;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 15px;
}

.page-title {
    text-align: center;
    margin-bottom: 10px;
    color: #1e293b;
    font-size: 2.75rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(90deg, #4338ca, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.page-subtitle {
    text-align: center;
    color: #64748b;
    margin-bottom: 20px;
    font-size: 1.2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
}

.editor-container {
    background-color: white;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid rgba(229, 231, 235, 0.8);
    width: 100%;
}

/* Upload Section */
.upload-section {
    padding: 40px;
}

.upload-options {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: center;
}

.upload-area,
.generate-area {
    border-radius: 16px;
    padding: 40px;
    text-align: center;
    transition: all 0.3s ease;
    height: 100%;
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
    border: 2px solid #e2e8f0;
    background-color: rgba(249, 250, 251, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.file-input {
    display: none;
}

.upload-icon,
.generate-icon {
    font-size: 3.5rem;
    margin-bottom: 20px;
    color: #6366f1;
    background-color: rgba(237, 241, 253, 0.8);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.upload-area h3,
.generate-area h3 {
    margin-bottom: 10px;
    color: #1e293b;
    font-size: 1.6rem;
    font-weight: 700;
}

.upload-area p,
.generate-area p {
    color: #64748b;
    margin-bottom: 8px;
    line-height: 1.6;
}

.upload-formats {
    font-size: 0.9rem;
    color: #94a3b8;
    margin-top: 12px;
    background-color: rgba(226, 232, 240, 0.3);
    padding: 6px 12px;
    border-radius: 6px;
    display: inline-block;
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

/* Image Generation Area */
.prompt-input {
    margin-top: 24px;
    display: flex;
    gap: 10px;
    width: 100%;
}

.prompt-field {
    flex: 1;
    padding: 14px 20px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.9rem;
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.prompt-field:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.btn-generate {
    padding: 14px 28px;
    background: linear-gradient(to right, #6366f1, #4f46e5);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.btn-generate:hover {
    background: linear-gradient(to right, #4f46e5, #4338ca);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

.btn-generate:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.25);
}

.btn-generate:disabled {
    background: linear-gradient(to right, #94a3b8, #cbd5e1);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.image-ratio-selector {
    margin-top: 24px;
    text-align: left;
    width: 100%;
}

.image-ratio-selector p {
    margin-bottom: 10px;
    font-weight: 600;
    color: #475569;
}

.ratio-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.ratio-option {
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 0.95rem;
    color: #475569;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.2s;
}

.ratio-option:hover {
    background-color: #f1f5f9;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.ratio-option.active {
    background-color: #6366f1;
    color: white;
    border-color: #4f46e5;
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
}

.generate-examples {
    margin-top: 24px;
    text-align: left;
    width: 100%;
}

.generate-examples p {
    margin-bottom: 10px;
    font-weight: 600;
    color: #475569;
}

.example-tags,
.suggestion-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.example-tags span,
.suggestion-tags span {
    padding: 8px 16px;
    background-color: #f8fafc;
    border-radius: 30px;
    font-size: 0.75rem;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.example-tags span:hover,
.suggestion-tags span:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
    color: #6366f1;
}

/* Editor Workspace */
.editor-workspace {
    min-height: 650px;
}

.editor-main {
    display: grid;
    grid-template-columns: 60% 40%;
    min-height: 650px;
}

.image-preview {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8fafc;
    border-right: 1px solid #e2e8f0;
    position: relative;
    overflow: hidden;
    max-width: 100%;
}

.image-preview img {
    max-width: 100%;
    max-height: 560px;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
}

.image-preview:hover img {
    transform: scale(1.01);
}

.editor-tools {
    padding: 25px;
    display: flex;
    flex-direction: column;
    background-color: white;
}

.tools-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.tools-header h3 {
    color: #1e293b;
    font-weight: 700;
    font-size: 1.3rem;
}

.btn-reset {
    background: none;
    border: none;
    color: #6366f1;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.btn-reset:hover {
    color: #4f46e5;
    transform: translateY(-1px);
}

.btn-reset:active {
    transform: translateY(0);
}

.tools-tabs {
    display: flex;
    /* border-bottom: 1px solid #e2e8f0; */
    /* margin-bottom: 25px; */
    position: relative;
}

.tab-button {
    padding: 12px 20px;
    background: none;
    border: none;
    cursor: pointer;
    color: #64748b;
    font-weight: 600;
    transition: all 0.3s;
    position: relative;
    z-index: 2;
}

.tab-button.active {
    color: #6366f1;
}

.tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #6366f1;
    border-radius: 3px 3px 0 0;
}

.tools-content {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 25px;
    padding-right: 5px;
}

.tools-content::-webkit-scrollbar {
    width: 5px;
}

.tools-content::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
}

.tools-content::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
}

.tool-group {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

/* Enhanced AI Tools Section */
.tools-section-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(90deg, #4338ca, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.tools-section-description {
    color: #64748b;
    margin-bottom: 20px;
    font-size: 0.95rem;
}

.ai-tools-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.tool-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
}

.tool-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e1;
}

.tool-card-content {
    display: flex;
    gap: 12px;
    padding: 15px;
    align-items: center;
}

.tool-icon-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
}

/* Tool Icon Background Colors */
.enhance-icon {
    background: linear-gradient(135deg, #c084fc, #8b5cf6);
    color: white;
}

.restore-icon {
    background: linear-gradient(135deg, #34d399, #10b981);
    color: white;
}

.remove-bg-icon {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: white;
}

.portrait-icon {
    background: linear-gradient(135deg, #f472b6, #ec4899);
    color: white;
}

.upscale-icon {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
}

.colorize-icon {
    background: linear-gradient(135deg, #fb7185, #e11d48);
    color: white;
}

.tool-details {
    flex: 1;
}

.tool-details h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 3px 0;
    color: #1e293b;
}

.tool-details p {
    margin: 0;
    font-size: 0.85rem;
    color: #64748b;
}

.tool-action-button {
    margin-top: auto;
    background: #f8fafc;
    border: none;
    border-top: 1px solid #e2e8f0;
    padding: 12px;
    font-weight: 600;
    color: #6366f1;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
}

.tool-action-button:hover {
    background: #f1f5f9;
    color: #4f46e5;
}

.tool-action-button .arrow-icon {
    margin-left: 5px;
    transition: transform 0.2s ease;
}

.tool-action-button:hover .arrow-icon {
    transform: translateX(3px);
}

/* Legacy button style - kept for compatibility */
.tool-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 15px 12px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s;
}

.tool-button:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.06);
}

.tool-button:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
}

.tool-icon {
    font-size: 2rem;
    margin-bottom: 4px;
    background-color: rgba(237, 241, 253, 0.6);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

/* Chat Container */
.chat-container {
    display: flex;
    flex-direction: column;
    height: 420px;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;
    background-color: #f8fafc;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background-image: linear-gradient(to bottom, #f8fafc, #f1f5f9);
}

.chat-messages::-webkit-scrollbar {
    width: 5px;
}

.chat-messages::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
}

.chat-message {
    max-width: 85%;
    padding: 14px 18px;
    border-radius: 20px;
    line-height: 1.6;
    animation: fadeIn 0.4s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.chat-message .message-attachments {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}

.chat-message .message-attachments img {
    max-width: 150px;
    max-height: 150px;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease;
}

.chat-message .message-attachments img:hover {
    transform: scale(1.05);
}

.user-message {
    align-self: flex-end;
    background: linear-gradient(to right, #6366f1, #4f46e5);
    color: white;
    border-bottom-right-radius: 4px;
}

.ai-message {
    align-self: flex-start;
    background-color: white;
    color: #1e293b;
    border-bottom-left-radius: 4px;
    border: 1px solid #e2e8f0;
}

.chat-input-container {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #e2e8f0;
    background-color: white;
}

.chat-attachment {
    padding: 8px 15px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.chat-file-input {
    display: none;
}

.attachment-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f1f5f9;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #e2e8f0;
}

.attachment-btn:hover {
    background-color: #e2e8f0;
    transform: translateY(-2px);
}

.attachment-icon {
    font-size: 1.2rem;
    color: #64748b;
}

.selected-attachments {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: calc(100% - 46px);
}

.attachment-preview {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
}

.attachment-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.remove-attachment {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgba(239, 68, 68, 0.9);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
}

.attachment-preview:hover .remove-attachment {
    opacity: 1;
}

.chat-input {
    display: flex;
    padding: 10px 15px 15px;
    background-color: white;
}

.chat-input input {
    flex: 1;
    padding: 14px 20px;
    border: 1px solid #e2e8f0;
    border-radius: 30px;
    margin-right: 10px;
    font-size: 0.95rem;
    width: calc(100% - 20px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    transition: all 0.2s;
}

.chat-input input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.chat-input button {
    padding: 10px 22px;
    background: linear-gradient(to right, #6366f1, #4f46e5);
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
}

.chat-input button:hover {
    background: linear-gradient(to right, #4f46e5, #4338ca);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
}

.chat-input button:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.25);
}

.chat-input button:disabled {
    background: linear-gradient(to right, #94a3b8, #cbd5e1);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.chat-suggestions {
    margin-top: 15px;
    padding: 0 15px 15px;
}

.chat-suggestions p {
    margin-bottom: 10px;
    font-weight: 600;
    color: #475569;
}

/* Common Buttons */
.editor-actions {
    display: flex;
    gap: 12px;
    margin-top: auto;
}

.btn {
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    flex: 1;
    text-align: center;
}

.btn-primary {
    background: linear-gradient(to right, #6366f1, #4f46e5);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.btn-primary:hover {
    background: linear-gradient(to right, #4f46e5, #4338ca);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

.btn-primary:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.25);
}

.btn-secondary {
    background-color: white;
    color: #475569;
    border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
    background-color: #f8fafc;
    border-color: #94a3b8;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.btn-secondary:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

/* Overlay and Modals */
.processing-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(8px);
}

.processing-content {
    background-color: white;
    padding: 40px 50px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 90%;
    animation: slideUp 0.4s ease;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f1f5f9;
    border-top: 4px solid #6366f1;
    border-radius: 50%;
    margin: 0 auto 25px;
    animation: spin 1s linear infinite;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Responsive Styles */
@media (max-width: 1200px) {
    .ai-tools-grid {
        grid-template-columns: 1fr 1fr;
    }
}

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

    .editor-tools {
        border-left: none;
        border-top: 1px solid #e2e8f0;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 0 10px;
    }

    .upload-section {
        padding: 25px;
    }

    .upload-area,
    .generate-area {
        padding: 30px 20px;
    }

    .prompt-input {
        flex-direction: column;
    }

    .btn-generate {
        width: 100%;
    }

    .ai-tools-grid {
        grid-template-columns: 1fr;
    }

    .editor-main {
        grid-template-columns: 1fr;
    }

    .page-title {
        font-size: 2rem;
    }

    .page-subtitle {
        font-size: 1rem;
    }

    .processing-content {
        padding: 30px;
    }
}

/*  */

.model {
    display: flex;
    align-items: center;
    background-color: #f8fafc;
    padding: 10px 16px;
    border-radius: 12px;
    /* margin-bottom: 16px; */
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.model:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.model label {
    font-weight: 600;
    color: #475569;
    font-size: 0.95rem;
    margin-right: 15px;
    white-space: nowrap;
}

.model-select-wrapper {
    position: relative;
    flex: 1;
}

.model select {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    padding: 10px 14px;
    padding-right: 36px;
    /* Space for the custom arrow */
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background-color: white;
    color: #1e293b;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.model select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

/* Custom dropdown arrow */
.model-select-wrapper::after {
    content: "▼";
    font-size: 0.7rem;
    color: #64748b;
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    transition: all 0.2s ease;
}

.model-select-wrapper:hover::after {
    color: #475569;
}

/* Model badge indicating quality */
.model-badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 8px;
    background-color: #e0f2fe;
    color: #0284c7;
}

.model-badge.high {
    background-color: #dcfce7;
    color: #16a34a;
}

.model-badge.medium {
    background-color: #fef3c7;
    color: #d97706;
}

/* Updated model layout in the layout-data container */
.layout-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
}
</style>