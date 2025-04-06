<template>
  <div class="chat-container">
      <div class="chat-messages" ref="chatMessagesRef">
          <div v-for="(message, index) in messages" :key="index"
              :class="['chat-message', message.sender === 'user' ? 'user-message' : 'ai-message']">
              <div class="message-content">{{ message.text }}</div>
              <div v-if="message.attachments && message.attachments.length > 0"
                  class="message-attachments">
                  <img v-for="(attachment, i) in message.attachments" :key="i"
                      :src="attachment.preview"
                      @click="$emit('view-image', attachment.preview)"
                      alt="Attached image" />
              </div>
          </div>
      </div>

      <div class="chat-input-container">
          <div class="chat-attachment">
              <input type="file" id="chat-file-input" @change="$emit('attachment', $event)"
                  accept="image/*" multiple class="chat-file-input" />
              <label for="chat-file-input" class="attachment-btn" :title="$t('CHAT_ADD_ATTACHMENT')">
                  <span class="attachment-icon">📎</span>
              </label>
              <div class="selected-attachments"
                  v-if="attachments && attachments.length > 0">
                  <div v-for="(attachment, index) in attachments" :key="index"
                      class="attachment-preview">
                      <img :src="attachment.preview" alt="Attachment preview" />
                      <button class="remove-attachment"
                          @click="$emit('remove-attachment', index)">×</button>
                  </div>
              </div>
          </div>
          <div class="chat-input">
              <input type="text" :value="input" @input="updateInput"
                  :placeholder="$t('CHAT_INPUT_PLACEHOLDER')"
                  @keyup.enter="$emit('send-message')" />
              <button @click="$emit('send-message')"
                  :disabled="!input && (!attachments || attachments.length === 0)">{{ $t('CHAT_SEND_BUTTON') }}</button>
          </div>
      </div>

      <div class="chat-suggestions-wrapper">
          <div class="chat-suggestions-header">
              <p>{{ $t('CHAT_SUGGESTIONS_TITLE') }}:</p>
              <button class="suggestions-toggle" @click="toggleSuggestions">
                  <span v-if="showAllSuggestions">{{ $t('CHAT_SHOW_LESS') }}</span>
                  <span v-else>{{ $t('CHAT_SHOW_MORE') }}</span>
              </button>
          </div>
          <div class="chat-suggestions">
              <div class="suggestion-tags-container">
                  <div class="suggestion-tags">
                      <span v-for="(suggestion, index) in currentSuggestions" :key="index"
                          @click="$emit('set-suggestion', suggestion.text)">
                          {{ suggestion.label }}
                      </span>
                  </div>
              </div>
              
              <div class="suggestion-categories" v-if="showAllSuggestions">
                  <div v-for="(category, catIndex) in suggestionCategories" :key="catIndex" class="category">
                      <div class="category-title">{{ category.title }}</div>
                      <div class="category-suggestions">
                          <span v-for="(item, itemIndex) in category.items" :key="itemIndex"
                              @click="$emit('set-suggestion', item.text)">
                              {{ item.label }}
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Props
const props = defineProps({
    messages: {
        type: Array,
        default: () => []
    },
    input: {
        type: String,
        default: ''
    },
    attachments: {
        type: Array,
        default: () => []
    }
});

// Emits
const emit = defineEmits([
    'update:input',
    'send-message',
    'attachment',
    'remove-attachment',
    'view-image',
    'set-suggestion',
    'set-ref'
]);

// Refs
const chatMessagesRef = ref(null);
const showAllSuggestions = ref(false);

// Quick suggestions that always show in the horizontal scrolling area
const quickSuggestions = [
    { label: 'Blur background', text: 'Blur the background and focus on the subject' },
    { label: 'Change color', text: 'Change the colors to be more vibrant' },
    { label: 'Add lighting', text: 'Add dramatic lighting effects' },
    { label: 'B&W', text: 'Convert to black and white' },
    { label: 'Vintage look', text: 'Apply a vintage filter' },
    { label: 'Enhance details', text: 'Enhance the details in the image' },
    { label: 'Remove objects', text: 'Remove unwanted objects from the scene' },
    { label: 'Adjust contrast', text: 'Improve the contrast of the image' }
];

// Category-based suggestions
const suggestionCategories = [
    {
        title: 'Style Effects',
        items: [
            { label: 'Oil painting', text: 'Make it look like an oil painting' },
            { label: 'Watercolor', text: 'Apply watercolor effect' },
            { label: 'Sketch', text: 'Convert to sketch style' },
            { label: 'Comic style', text: 'Make it look like a comic book' },
            { label: 'Pixel art', text: 'Convert to pixel art style' },
            { label: 'Neon glow', text: 'Add neon glow effects' }
        ]
    },
    {
        title: 'Color Adjustments',
        items: [
            { label: 'Warm tones', text: 'Shift colors to warm tones' },
            { label: 'Cool tones', text: 'Shift colors to cool tones' },
            { label: 'Increase saturation', text: 'Make colors more vibrant' },
            { label: 'Decrease saturation', text: 'Make colors more subtle' },
            { label: 'Sepia tone', text: 'Apply sepia filter' },
            { label: 'Invert colors', text: 'Invert all the colors' }
        ]
    },
    {
        title: 'Add Elements',
        items: [
            { label: 'Add clouds', text: 'Add clouds to the sky' },
            { label: 'Add birds', text: 'Add birds flying in the background' },
            { label: 'Add text', text: 'Add text overlay' },
            { label: 'Add frame', text: 'Add a decorative frame' },
            { label: 'Add reflection', text: 'Add water reflection effect' },
            { label: 'Add shadow', text: 'Add drop shadow to the subject' }
        ]
    },
    {
        title: 'Transform',
        items: [
            { label: 'Crop tighter', text: 'Crop the image tighter around the subject' },
            { label: 'Expand scene', text: 'Expand the scene beyond current borders' },
            { label: 'Rotate slightly', text: 'Rotate the image to fix alignment' },
            { label: 'Mirror', text: 'Mirror the image horizontally' },
            { label: 'Perspective fix', text: 'Fix the perspective distortion' },
            { label: 'Straighten horizon', text: 'Make the horizon level' }
        ]
    }
];

// Computed property for current suggestions
const currentSuggestions = computed(() => {
    return quickSuggestions;
});

// Methods
const updateInput = (event) => {
    emit('update:input', event.target.value);
};

const toggleSuggestions = () => {
    showAllSuggestions.value = !showAllSuggestions.value;
};

// Set the messages ref for parent component to access
onMounted(() => {
    emit('set-ref', chatMessagesRef.value);
});
</script>
<style scoped>
/* Main container */
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

/* Chat messages area with scrolling */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-image: linear-gradient(to bottom, #f8fafc, #f1f5f9);
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

.chat-message {
  max-width: 85%;
  padding: 14px 18px;
  border-radius: 20px;
  line-height: 1.6;
  animation: fadeIn 0.4s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  word-break: break-word;
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

/* Chat input area */
.chat-input-container {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e2e8f0;
  background-color: white;
  flex-shrink: 0;
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
  padding: 10px 15px;
  background-color: white;
}

.chat-input input {
  flex: 1;
  padding: 14px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  margin-right: 10px;
  font-size: 0.95rem;
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
  white-space: nowrap;
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

/* Chat suggestions area with independent scrolling */
.chat-suggestions-wrapper {
  border-top: 1px solid #e2e8f0;
  background-color: white;
  max-height: 130px;
  overflow-y: auto;
  flex-shrink: 0;
  scroll-behavior: smooth;
}

.chat-suggestions-wrapper::-webkit-scrollbar {
  width: 6px;
}

.chat-suggestions-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.chat-suggestions-wrapper::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}

.chat-suggestions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 5px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 5;
  border-bottom: 1px solid #f1f5f9;
}

.chat-suggestions-header p {
  margin: 0;
  font-weight: 600;
  color: #475569;
  font-size: 0.85rem;
}

.suggestions-toggle {
  background: none;
  border: none;
  color: #6366f1;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  padding: 4px 8px;
  border-radius: 4px;
}

.suggestions-toggle:hover {
  background-color: rgba(99, 102, 241, 0.1);
}

.chat-suggestions {
  padding: 0 15px 15px;
}

/* Horizontal scrollable suggestions */
.suggestion-tags-container {
  position: relative;
  overflow-x: auto;
  margin: 0 -15px 10px;
  padding: 10px 15px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scroll-behavior: smooth;
  background-color: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
}

.suggestion-tags-container::-webkit-scrollbar {
  height: 4px;
}

.suggestion-tags-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.suggestion-tags-container::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}

.suggestion-tags {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  width: max-content;
}

.suggestion-tags::after {
  content: '';
  display: block;
  min-width: 15px;
  height: 1px;
}

.suggestion-tags span {
  padding: 8px 12px;
  background-color: white;
  border-radius: 30px;
  font-size: 0.75rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e2e8f0;
  white-space: nowrap;
  user-select: none;
}

.suggestion-tags span:hover {
  background-color: #f1f5f9;
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  color: #6366f1;
}

.suggestion-tags span:active {
  transform: translateY(0);
}

/* Categories styling */
.suggestion-categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  animation: fadeIn 0.3s ease;
}

.category {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s;
  background-color: white;
}

.category:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.category-title {
  background-color: #f1f5f9;
  padding: 7px 12px;
  font-weight: 600;
  color: #475569;
  font-size: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
}

.category-suggestions {
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.category-suggestions span {
  padding: 5px 10px;
  background-color: #f8fafc;
  border-radius: 15px;
  font-size: 0.7rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e2e8f0;
  user-select: none;
}

.category-suggestions span:hover {
  background-color: #f1f5f9;
  border-color: #6366f1;
  transform: translateY(-1px);
  color: #6366f1;
}

/* Selected tag styling */
.suggestion-tags span.selected,
.category-suggestions span.selected {
  background-color: #6366f1;
  color: white;
  border-color: #4f46e5;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .suggestion-categories {
    grid-template-columns: 1fr 1fr;
  }
  
  .chat-container {
    height: 400px;
  }
  
  .chat-suggestions-wrapper {
    max-height: 120px;
  }
  
  .chat-message {
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .suggestion-categories {
    grid-template-columns: 1fr;
  }
  
  .chat-container {
    height: 380px;
  }
  
  .chat-suggestions-wrapper {
    max-height: 110px;
  }
  
  .chat-suggestions-header {
    padding: 8px 10px 4px;
  }
  
  .chat-suggestions {
    padding: 0 10px 10px;
  }
  
  .suggestion-tags-container {
    margin: 0 -10px 8px;
    padding: 8px 10px;
  }
  
  .chat-input input {
    padding: 12px 15px;
  }
  
  .chat-input button {
    padding: 8px 15px;
  }
  
  .chat-message {
    padding: 12px 15px;
  }
}
</style>