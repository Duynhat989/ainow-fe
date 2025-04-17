<template>
    <div class="editor-workspace">
        <div class="editor-main">
            <div class="image-preview">
                <!-- <img :src="imagePreview" alt="Preview" /> -->
                <!-- <CanvasEditorView /> -->
                <CanvasEditorView :imagePreview="imagePreview" @update:imagePreview="$emit('update-image', $event)" />
            </div>
            <div class="editor-tools">
                <div class="tools-header">
                    <h3>{{ $t('EDITOR_TOOLS_TITLE') }}</h3>
                    <div class="history flex">
                        <button class="btn-reset" @click="$emit('reset-image')"><i class='bx bx-undo'></i> Undo</button>
                        <button class="btn-reset" @click="$emit('reset-image')"><i class='bx bx-redo' ></i> Redo</button>
                    </div>
                    <button class="btn-reset" @click="$emit('reset-image')">{{ $t('EDITOR_RESET_BUTTON') }}</button>
                </div>

                <div class="layout-data">
                    <div class="model">
                        <label for="model_ai">{{ $t('EDITOR_MODEL_LABEL') }}:</label>
                        <div class="model-select-wrapper">
                            <select name="model_ai" id="model_ai">
                                <option value="mini">{{ $t('EDITOR_MODEL_MINI') }}</option>
                                <option value="pro">{{ $t('EDITOR_MODEL_PRO') }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="effects-gallery-container">
                        <EffectsPopup @apply-effect="$emit('apply-effect', $event)" />
                    </div>
                </div>

                <div class="tools-tabs">
                    <button v-for="tab in toolTabs" :key="tab.id" @click="activeTab = tab.id"
                        :class="{ active: activeTab === tab.id }" class="tab-button">
                        {{ tab.name }}
                    </button>
                </div>

                <div class="tools-content">
                    <!-- Chat AI Tab -->
                    <div class="tool-group">
                        <ChatInterface :messages="chatMessages" :input="chatInput" :attachments="chatAttachments"
                            @update:input="$emit('update:chat-input', $event)"
                            @send-message="$emit('send-chat-message')" @attachment="$emit('chat-attachment', $event)"
                            @remove-attachment="$emit('remove-attachment', $event)"
                            @view-image="$emit('view-full-image', $event)"
                            @set-suggestion="$emit('set-chat-suggestion', $event)"
                            @set-ref="$emit('set-chat-messages-ref', $event)" />
                    </div>
                </div>

                <div class="editor-actions">
                    <button class="btn btn-secondary" @click="$emit('reset-image')">{{ $t('EDITOR_CANCEL_BUTTON')
                        }}</button>
                    <button class="btn btn-primary" @click="$emit('save-image')">{{ $t('EDITOR_SAVE_BUTTON') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import EffectsPopup from '@/components/EffectsPopup.vue';
import ChatInterface from '@/components/AIEdit/ChatInterface.vue';
import CanvasEditorView from './CanvasEditor.vue';
// Props
const props = defineProps({
    imagePreview: {
        type: String,
        required: true
    },
    chatMessages: {
        type: Array,
        default: () => []
    },
    chatAttachments: {
        type: Array,
        default: () => []
    },
    chatInput: {
        type: String,
        default: ''
    }
});
// Emits
const emit = defineEmits([
    'reset-image',
    'apply-effect',
    'save-image',
    'update-image',
    'chat-attachment',
    'remove-attachment',
    'send-chat-message',
    'set-chat-suggestion',
    'view-full-image',
    'update:chat-input',
    'set-chat-messages-ref'
]);

// State
const activeTab = ref('chat');

// Tabs configuration - could be passed as a prop if needed
const toolTabs = [];  // Currently empty as we only have one tab
</script>

<style scoped>
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
    width: 100%;
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
    padding: 15px;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding-right: 30px;
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
    margin-left: 10px;
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

.effects-gallery-container {
    margin-left: auto;
}

.layout-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
}

.model {
    display: flex;
    align-items: center;
    background-color: #f8fafc;
    padding: 10px 16px;
    border-radius: 12px;
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

@media (max-width: 1024px) {
    .editor-tools {
        width: 100vw;
        border-left: none;
        border-top: 1px solid #e2e8f0;
    }
}

@media (max-width: 768px) {
    .editor-main {
        grid-template-columns: 1fr;
    }
}
</style>