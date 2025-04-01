<template>
    <div class="editor-page">
        <div class="container">
            <h1 class="page-title">AI Image Editor Tool</h1>
            <p class="page-subtitle">Edit your images with the power of artificial intelligence</p>

            <div class="editor-container">
                <!-- Upload/Generate Section -->
                <UploadSection 
                    v-if="!selectedImage" 
                    :selected-ratio="selectedRatio"
                    :image-prompt="imagePrompt"
                    :is-generating="isGenerating"
                    :example-prompts="examplePrompt"
                    @file-selected="processFile"
                    @drop-file="handleDrop"
                    @ratio-changed="handleRatioChange"
                    @update:image-prompt="imagePrompt = $event"
                    @generate-image="generateImage"
                    @set-example="setExamplePrompt"
                />

                <!-- Editor Workspace -->
                <EditorWorkspace 
                    v-else
                    :image-preview="imagePreview"
                    :chat-messages="chatMessages"
                    :chat-attachments="chatAttachments"
                    :chat-input="chatInput"
                    @reset-image="resetImage"
                    @apply-effect="handleEffectApply"
                    @save-image="saveImage"
                    @chat-attachment="handleChatAttachment"
                    @remove-attachment="removeAttachment"
                    @send-chat-message="sendChatMessage"
                    @set-chat-suggestion="setChatSuggestion"
                    @view-full-image="viewFullImage"
                    @update:chat-input="chatInput = $event"
                    @set-chat-messages-ref="chatMessagesRef = $event"
                />
            </div>

            <!-- AI Processing Overlay -->
            <ProcessingOverlay 
                :is-visible="isProcessing || isGenerating"
                :is-generating="isGenerating"
            />

            <!-- Lightbox Modal -->
            <LightboxModal 
                :image="lightboxImage"
                @close="closeLightbox"
            />
        </div>
    </div>
    <SubscriptionLimitPopup 
        :is-visible="showLimitPopup" 
        :type="popupType" 
        :is-persistent="isPersistentPopup"
        :usage-info="userUsageInfo" 
        @close="closeLimitPopup" 
        @upgrade="handleUpgrade" 
    />
</template>

<script setup>
import { ref, reactive, watch, nextTick, onMounted } from 'vue';
import request from '@/utils/request';
import {
    checkIfSubscriptionExpired,
    getDaysExpired,
    checkUserDailyLimit,
    incrementRequestCount,
    initializeSubscriptionData
} from '@/utils/SubscriptionService';

// Import child components
import UploadSection from '@/components/AIEdit/UploadSection.vue';
import EditorWorkspace from '@/components/AIEdit/EditorWorkspace.vue';
import ProcessingOverlay from '@/components/AIEdit/ProcessingOverlay.vue';
import LightboxModal from '@/components/AIEdit/LightboxModal.vue';
import SubscriptionLimitPopup from '@/components/SubscriptionLimitPopup.vue';

// State management
const selectedImage = ref(null);
const imagePreview = ref('');
const dragOver = ref(false);
const isProcessing = ref(false);
const isGenerating = ref(false);
const imagePrompt = ref('');
const chatInput = ref('');
const chatMessagesRef = ref(null);
const chatMessages = ref([
    { sender: 'ai', text: 'Hello! I am an AI assistant. How would you like to edit your image?' }
]);
const chatAttachments = ref([]);
const selectedRatio = ref('1-1');
const lightboxImage = ref(null);

// Popup states
const showLimitPopup = ref(false);
const popupType = ref('limit'); // 'limit' or 'expired'
const isPersistentPopup = ref(false);
const userUsageInfo = reactive({
    imagesLeft: 0,
    totalImages: 25, // Default limit
    daysLeft: 0
});

// Example prompts
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
];

// Watch for chat messages changes to scroll to bottom
watch(chatMessages, () => {
    nextTick(() => {
        if (chatMessagesRef.value) {
            chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
        }
    });
}, { deep: true });

// Methods
const handleRatioChange = (ratio) => {
    selectedRatio.value = ratio;
    console.log('Selected ratio:', ratio);
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

// Subscription handling
const showDailyLimitReached = () => {
    try {
        const subData = JSON.parse(localStorage.getItem('SubDaily'));
        if (subData && subData.limit) {
            userUsageInfo.totalImages = parseInt(subData.limit.limit);
        }
    } catch (error) {
        console.error('Error reading limit data:', error);
    }

    popupType.value = 'limit';
    isPersistentPopup.value = false;
    showLimitPopup.value = true;
};

const showSubscriptionExpired = (daysExpired = 0) => {
    popupType.value = 'expired';
    isPersistentPopup.value = true;
    userUsageInfo.daysLeft = daysExpired;
    showLimitPopup.value = true;
};

const closeLimitPopup = () => {
    showLimitPopup.value = false;
};

const handleUpgrade = (plan) => {
    console.log('User upgrading with plan:', plan);
    window.location.href = '/pricing';
    closeLimitPopup();
};

const processImage = () => {
    if (checkUserDailyLimit()) {
        showDailyLimitReached();
        return false;
    }
    incrementRequestCount();
    return true;
};

const checkSubscriptionStatus = () => {
    initializeSubscriptionData();
    if (checkIfSubscriptionExpired()) {
        const daysExpired = getDaysExpired();
        showSubscriptionExpired(daysExpired);
        return false;
    }
    if (checkUserDailyLimit()) {
        showDailyLimitReached();
        return false;
    }
    return true;
};

// API Interactions
const generateImage = async () => {
    if (!processImage()) return;
    if (!imagePrompt.value) return;

    isGenerating.value = true;
    try {
        const response = await request.post('/api/ainow/generate-image', {
            prompt: imagePrompt.value,
            size: selectedRatio.value
        });

        if (response.success) {
            const processId = response.sessionId;
            for (let index = 0; index < 50; index++) {
                await sleep(3 * 1000);
                try {
                    const res = await request.post('/api/ainow/get_task', {
                        "processId": processId
                    });
                    
                    if (res.success) {
                        let origin = res.data[0].origin;
                        let rss = await request.post('/api/ainow/url_basestr', {
                            "imageUrl": origin
                        });
                        imagePreview.value = rss.base64;
                        isGenerating.value = false;
                        selectedImage.value = 'generated';
                        break;
                    }
                } catch (error) {
                    console.log(error);
                    if (!error.success && error.msg == "error") {
                        alert("An error occurred while generating the image. Please try again.");
                        break;
                    }
                }
            }
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

const handleEffectApply = (effect) => {
    applyAIEffect(effect);
};

const applyAIEffect = async (effect) => {
    isProcessing.value = true;
    console.log(`Applying effect: ${effect}`);
    
    if (effect === 'remove-bg') {
        try {
            const response = await request.post('/api/ainow/remove_bg', {
                "images": [
                    imagePreview.value.replace('data:', '')
                ]
            });

            if (response.success) {
                let processId = response.sessionId;
                for (let index = 0; index < 50; index++) {
                    await sleep(3 * 1000);
                    try {
                        const res = await request.post('/api/ainow/get_task', {
                            "processId": processId
                        });

                        if (res.success) {
                            let origin = res.data[0].origin;
                            let rss = await request.post('/api/ainow/url_basestr', {
                                "imageUrl": origin
                            });
                            imagePreview.value = rss.base64;
                            isProcessing.value = false;
                            
                            if (effect === 'restore' || effect === 'enhance' || effect === 'remove-bg') {
                                chatMessages.value.push({
                                    sender: 'ai',
                                    text: `I have ${effect} your image. Would you like any additional adjustments?`
                                });
                            }
                            break;
                        }
                    } catch (error) {
                        console.log(error);
                        if (!error.success && error.msg == "error") {
                            alert("An error occurred while generating the image. Please try again.");
                            break;
                        }
                    }
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
    if (!processImage()) return;
    if (!chatInput.value && (!chatAttachments.value || chatAttachments.value.length === 0)) return;

    const message = {
        sender: 'user',
        text: chatInput.value || 'Please process these images',
        attachments: [...chatAttachments.value]
    };

    chatMessages.value.push(message);
    const userRequest = chatInput.value;
    chatInput.value = '';

    const hadAttachments = chatAttachments.value.length > 0;
    chatAttachments.value = [];

    isProcessing.value = true;
    let attachments = [];
    attachments.push({
        attachment: imagePreview.value.split(',')[1]
    });
    
    for (let index = 0; index < message.attachments.length; index++) {
        attachments.push({
            attachment: message.attachments[index].preview.split(',')[1]
        });
    }
    
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

        setTimeout(() => {
            isProcessing.value = false;

            let completionText = hadAttachments
                ? `I have completed processing the images`
                : `I have completed ${userRequest ? userRequest.toLowerCase() : 'processing your request'}`;

            chatMessages.value.push({
                sender: 'ai',
                text: `${completionText}. Are you satisfied with the result?`
            });
        }, 2000);
    };
    
    if (response.success) {
        try {
            const inlineData = response.result[0]?.candidates[0]?.content.parts[0]?.inlineData;
            const baseStr = inlineData?.data;
            const mimeType = inlineData?.mimeType;
            imagePreview.value = `data:${mimeType};base64,${baseStr}`;
            selectedImage.value = 'generated';
            isGenerating.value = false;
            sendText();
        } catch (error) {
            alert("Chỉnh sửa đang gặp lỗi");
        }
    } else {
        alert('An error occurred while generating the image. Please try again.');
        isGenerating.value = false;
    }
};

const setExamplePrompt = (prompt) => {
    imagePrompt.value = prompt;
};

const setChatSuggestion = (suggestion) => {
    chatInput.value = suggestion;
};

const saveImage = () => {
    try {
        if (!imagePreview.value) {
            alert('No image to save. Please upload or generate an image first.');
            return;
        }

        isProcessing.value = true;
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';

        tempImg.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = tempImg.width;
            canvas.height = tempImg.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(tempImg, 0, 0);
            
            // Add checkerboard pattern for transparent areas
            if (tempImg.width > 0 && tempImg.height > 0) {
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;
                const squareSize = 10; // Size of the checkerboard squares
                
                for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                        const index = (y * canvas.width + x) * 4;
                        // If pixel is transparent (alpha < 255)
                        if (data[index + 3] < 255) {
                            // Determine if this should be a light or dark square
                            const isEvenSquareX = Math.floor(x / squareSize) % 2 === 0;
                            const isEvenSquareY = Math.floor(y / squareSize) % 2 === 0;
                            const isLightSquare = (isEvenSquareX && isEvenSquareY) || (!isEvenSquareX && !isEvenSquareY);
                            
                            // Set color based on square type (light/dark gray)
                            const color = isLightSquare ? 235 : 215;
                            
                            // Apply checkerboard color if pixel is transparent enough
                            if (data[index + 3] < 128) {
                                data[index] = color; // R
                                data[index + 1] = color; // G
                                data[index + 2] = color; // B
                                data[index + 3] = 255; // A
                            } else {
                                // Blend for semi-transparent pixels
                                const alpha = data[index + 3] / 255;
                                data[index] = data[index] * alpha + color * (1 - alpha);
                                data[index + 1] = data[index + 1] * alpha + color * (1 - alpha);
                                data[index + 2] = data[index + 2] * alpha + color * (1 - alpha);
                                data[index + 3] = 255;
                            }
                        }
                    }
                }
                ctx.putImageData(imgData, 0, 0);
            }

            const dataURL = canvas.toDataURL('image/png');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `edited-ainow-${timestamp}.png`;

            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = filename;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            console.log('Image saved successfully:', filename);
            isProcessing.value = false;
        };

        tempImg.onerror = (error) => {
            console.error('Error loading image for saving:', error);
            isProcessing.value = false;
            alert('Failed to save the image. There was an error processing the image data.');
        };

        tempImg.src = imagePreview.value;
    } catch (error) {
        console.error('Error saving image:', error);
        isProcessing.value = false;
    }
};

// Initialize
onMounted(() => {
    checkSubscriptionStatus();
});
</script>

<style scoped>
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

@media (max-width: 768px) {
    .container {
        padding: 0 10px;
    }

    .page-title {
        font-size: 2rem;
    }

    .page-subtitle {
        font-size: 1rem;
    }
}
</style>