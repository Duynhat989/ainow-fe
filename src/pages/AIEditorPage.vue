<template>
    <div class="editor-page">
        <div class="container">
            <h1 class="page-title">Công Cụ Chỉnh Sửa Ảnh AI</h1>
            <p class="page-subtitle">Chỉnh sửa ảnh của bạn với sức mạnh của trí tuệ nhân tạo</p>

            <div class="editor-container">
                <div class="upload-section" v-if="!selectedImage">
                    <div class="upload-options">
                        <div class="upload-area" @dragover.prevent="dragOver = true"
                            @dragleave.prevent="dragOver = false" @drop.prevent="handleDrop" @click="triggerFileInput"
                            :class="{ 'drag-over': dragOver }">
                            <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*"
                                class="file-input" />
                            <div class="upload-icon">📁</div>
                            <h3>Tải ảnh lên để bắt đầu</h3>
                            <p>Kéo thả ảnh vào đây hoặc nhấp để chọn</p>
                            <p class="upload-formats">Hỗ trợ JPG, PNG, WEBP (Tối đa 10MB)</p>
                        </div>

                        <div class="divider">
                            <span>HOẶC</span>
                        </div>

                        <div class="generate-area">
                            <div class="generate-icon">🎨</div>
                            <h3>Tạo ảnh với AI</h3>
                            <p>Mô tả ảnh bạn muốn tạo</p>

                            <!-- Phần chọn tỷ lệ ảnh -->
                            <div class="image-ratio-selector">
                                <p>Tỷ lệ ảnh:</p>
                                <div class="ratio-options">
                                    <button class="ratio-option" :class="{ active: selectedRatio === '1-1' }"
                                        @click="selectedRatio = '1-1'">1-1</button>
                                    <button class="ratio-option" :class="{ active: selectedRatio === '3-4' }"
                                        @click="selectedRatio = '3-4'">3-4</button>
                                    <button class="ratio-option" :class="{ active: selectedRatio === '4-3' }"
                                        @click="selectedRatio = '4-3'">4-3</button>
                                    <button class="ratio-option" :class="{ active: selectedRatio === '9-16' }"
                                        @click="selectedRatio = '9-16'">9-16</button>
                                    <button class="ratio-option" :class="{ active: selectedRatio === '16-9' }"
                                        @click="selectedRatio = '16-9'">16-9</button>
                                </div>
                            </div>

                            <div class="prompt-input">
                                <input type="text" v-model="imagePrompt"
                                    placeholder="Ví dụ: Một bãi biển nhiệt đới với nước trong xanh và cây dừa"
                                    class="prompt-field" />
                                <button class="btn-generate" @click="generateImage"
                                    :disabled="!imagePrompt || isGenerating">
                                    {{ isGenerating ? 'Đang tạo...' : 'Tạo ảnh' }}
                                </button>
                            </div>

                            <div class="generate-examples">
                                <p>Gợi ý:</p>
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
                                <h3>Công cụ chỉnh sửa</h3>
                                <button class="btn-reset" @click="resetImage">Đặt lại</button>
                            </div>

                            <div class="tools-tabs">
                                <button v-for="tab in toolTabs" :key="tab.id" @click="activeTab = tab.id"
                                    :class="{ active: activeTab === tab.id }" class="tab-button">
                                    {{ tab.name }}
                                </button>
                            </div>

                            <div class="tools-content">
                                <!-- Tab: AI -->
                                <div v-if="activeTab === 'ai'" class="tool-group">
                                    <div class="ai-tools-grid">
                                        <button class="tool-button" @click="applyAIEffect('enhance')">
                                            <span class="tool-icon">✨</span>
                                            <span>Làm đẹp ảnh</span>
                                        </button>
                                        <button class="tool-button" @click="applyAIEffect('restore')">
                                            <span class="tool-icon">🔄</span>
                                            <span>Phục hồi ảnh cũ</span>
                                        </button>
                                        <button class="tool-button" @click="applyAIEffect('remove-bg')">
                                            <span class="tool-icon">🖼️</span>
                                            <span>Xóa phông nền</span>
                                        </button>
                                        <button class="tool-button" @click="applyAIEffect('portrait')">
                                            <span class="tool-icon">👤</span>
                                            <span>Làm đẹp khuôn mặt</span>
                                        </button>
                                        <button class="tool-button" @click="applyAIEffect('upscale')">
                                            <span class="tool-icon">🔍</span>
                                            <span>Tăng độ phân giải</span>
                                        </button>
                                    </div>
                                </div>


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
                                                <label for="chat-file-input" class="attachment-btn"
                                                    title="Thêm hình ảnh">
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
                                                    placeholder="Mô tả chỉnh sửa bạn muốn thực hiện..."
                                                    @keyup.enter="sendChatMessage" />
                                                <button @click="sendChatMessage"
                                                    :disabled="!chatInput && (!chatAttachments || chatAttachments.length === 0)">Gửi</button>
                                            </div>
                                        </div>

                                        <div class="chat-suggestions">
                                            <p>Gợi ý:</p>
                                            <div class="suggestion-tags">
                                                <span
                                                    @click="setChatSuggestion('Làm mờ nền và tập trung vào chủ thể')">Làm
                                                    mờ nền</span>
                                                <span @click="setChatSuggestion('Thay đổi màu áo thành màu xanh')">Thay
                                                    đổi màu</span>
                                                <span @click="setChatSuggestion('Thêm hiệu ứng ánh sáng')">Thêm ánh
                                                    sáng</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="editor-actions">
                                <button class="btn btn-secondary" @click="resetImage">Hủy</button>
                                <button class="btn btn-primary" @click="saveImage">Lưu ảnh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- AI Processing Overlay -->
            <div class="processing-overlay" v-if="isProcessing || isGenerating">
                <div class="processing-content">
                    <div class="spinner"></div>
                    <p>{{ isGenerating ? 'AI đang tạo ảnh từ mô tả của bạn...' : 'AI đang xử lý ảnh của bạn...' }}</p>
                    <p>{{ indexTextShow }}/60</p>
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
    { sender: 'ai', text: 'Xin chào! Tôi là trợ lý AI. Bạn muốn chỉnh sửa ảnh như thế nào?' }
]);
const chatAttachments = ref([]);
const selectedRatio = ref('1-1');

const indexTextShow = ref(0)

const lightboxImage = ref(null);

// Danh sách từ khóa gợi ý cho ảnh
const examplePrompt = [
    {
        title: 'Phong cảnh núi non hùng vĩ',
        description: 'Một bức tranh phong cảnh với núi non hùng vĩ và bầu trời xanh trong.'
    },
    {
        title: 'Chân dung nghệ thuật phong cách watercolor',
        description: 'Một bức chân dung nghệ thuật với phong cách watercolor đầy màu sắc.'
    },
    {
        title: 'Thành phố tương lai với ánh sáng neon',
        description: 'Một bức tranh về thành phố tương lai với ánh sáng neon rực rỡ.'
    }
]


// Removed basic tab from toolTabs
const toolTabs = [
    { id: 'chat', name: 'Chat với AI' },
    { id: 'ai', name: 'Công cụ AI' }
];

// Reactive state
const imageSize = reactive({
    width: 0,
    height: 0
});

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
        alert('Kích thước file vượt quá giới hạn 10MB');
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
    if (confirm('Bạn có chắc muốn đặt lại ảnh?')) {
        selectedImage.value = null;
        imagePreview.value = '';
        chatMessages.value = [
            { sender: 'ai', text: 'Xin chào! Tôi là trợ lý AI. Bạn muốn chỉnh sửa ảnh như thế nào?' }
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
    indexTextShow.value = 0;

    try {
        // Get dimensions based on selected ratio
        const response = await request.post('/api/ainow/generate-image', {
            prompt: imagePrompt.value,
            size: selectedRatio.value
        });

        console.log('Image generation response:', response);
        
        if (response.success) {
            // Use a flag to track if we should continue polling
            let continuePolling = true;
            
            // Use a for loop with a condition that can be changed
            for (let index = 0; index < 60 && continuePolling; index++) {
                await sleep(5000);
                indexTextShow.value = index;
                
                try {
                    const res = await request.post('/api/ainow/get_task', {
                        "processId": response.sessionId
                    });
                    
                    console.log('Image generation progress:', res);
                    
                    if (res.success) {
                        imagePreview.value = res.data[0].origin;
                        selectedImage.value = 'generated';
                        isGenerating.value = false;
                        
                        // Stop the polling loop
                        continuePolling = false;
                    }
                } catch (error) {
                    console.error('Error generating image:', error);
                    
                    if (!error.success && error.msg == 'pending') {
                        console.log('Image generation in progress...');
                        // Continue polling
                    } else {
                        alert('Có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại.');
                        isGenerating.value = false;
                        
                        // Stop the polling loop
                        continuePolling = false;
                    }
                }
            }
            
            // If we exited the loop without success
            if (continuePolling) {
                alert('Lỗi xảy ra khi tạo ảnh. Vui lòng thử lại.');
                isGenerating.value = false;
            }
        } else {
            alert('Có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại.');
            isGenerating.value = false;
        }
    } catch (error) {
        console.error('Error generating image:', error);
        alert('Có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại.');
        isGenerating.value = false;
    }
};

const setExamplePrompt = (prompt) => {
    imagePrompt.value = prompt;
};

const applyAIEffect = (effect) => {
    isProcessing.value = true;
    // Xử lý nội dung 
    alert(`Đang áp dụng hiệu ứng: ${effect}`);



    // Simulate AI processing
    setTimeout(() => {
        console.log(`Applying AI effect: ${effect}`);
        // In a real app, this would call an API to process the image
        isProcessing.value = false;

        // Add a message to chat if it's a restoration or enhancement
        if (effect === 'restore' || effect === 'enhance') {
            chatMessages.value.push({
                sender: 'ai',
                text: `Tôi đã ${effect === 'restore' ? 'phục hồi' : 'làm đẹp'} ảnh của bạn. Bạn có muốn điều chỉnh gì thêm không?`
            });
        }
    }, 2000);
};

const sendChatMessage = () => {
    if (!chatInput.value && (!chatAttachments.value || chatAttachments.value.length === 0)) return;

    // Create user message with both text and attachments
    const message = {
        sender: 'user',
        text: chatInput.value || 'Xin vui lòng xử lý những hình ảnh này',
        attachments: [...chatAttachments.value]
    };

    chatMessages.value.push(message);

    const userRequest = chatInput.value;
    chatInput.value = '';

    // Clear attachments after sending
    const hadAttachments = chatAttachments.value.length > 0;
    chatAttachments.value = [];

    // Simulate AI processing and response
    setTimeout(() => {
        // Add AI response based on whether there were attachments or just text
        let responseText = userRequest
            ? `Tôi sẽ ${userRequest.toLowerCase()}.`
            : 'Tôi sẽ xử lý những hình ảnh bạn đã gửi.';

        if (hadAttachments) {
            responseText += ' Tôi đã nhận được hình ảnh của bạn. Đang xử lý...';
        } else {
            responseText += ' Đang xử lý...';
        }

        chatMessages.value.push({
            sender: 'ai',
            text: responseText
        });

        isProcessing.value = true;

        // Simulate processing time
        setTimeout(() => {
            isProcessing.value = false;

            // Add completion message
            let completionText = hadAttachments
                ? `Tôi đã hoàn thành việc xử lý hình ảnh`
                : `Tôi đã hoàn thành việc ${userRequest ? userRequest.toLowerCase() : 'xử lý yêu cầu của bạn'}`;

            chatMessages.value.push({
                sender: 'ai',
                text: `${completionText}. Bạn có hài lòng với kết quả không?`
            });
        }, 2000);
    }, 500);
};

const setChatSuggestion = (suggestion) => {
    chatInput.value = suggestion;
};

const saveImage = () => {
    // In a real app, this would save the edited image
    alert('Ảnh đã được lưu thành công!');
};
</script>

<style scoped>
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
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
}

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
    font-size: 1rem;
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
    font-size: 0.95rem;
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

.editor-workspace {
    min-height: 650px;
}

.editor-main {
    display: grid;
    grid-template-columns: 1fr 380px;
    min-height: 650px;
}

.image-preview {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8fafc;
    border-right: 1px solid #e2e8f0;
    position: relative;
    overflow: hidden;
}

.image-preview img {
    max-width: 100%;
    max-height: 590px;
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
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 25px;
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

.ai-tools-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.tool-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 20px 16px;
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
    font-size: 2.2rem;
    margin-bottom: 6px;
    background-color: rgba(237, 241, 253, 0.6);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

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

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f1f5f9;
    border-top: 4px solid #6366f1;
    border-radius: 50%;
    margin: 0 auto 25px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Responsive styles */
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

    .editor-main {
        grid-template-columns: 1fr;
    }

    .editor-tools {
        border-left: none;
        border-top: 1px solid #e2e8f0;
    }
}

@media (max-width: 768px) {
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
</style>