<template>
  <div class="ratio-selector-container">
    <button 
      class="ratio-trigger-button" 
      @click="isPopupOpen = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="3" x2="9" y2="21"></line>
        <line x1="15" y1="3" x2="15" y2="21"></line>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="3" y1="15" x2="21" y2="15"></line>
      </svg>
      <span>Ratio: {{ selectedRatio }}</span>
    </button>
    
    <!-- Popup/Modal -->
    <Teleport to="body">
      <div 
        v-if="isPopupOpen" 
        class="ratio-popup-overlay"
        @click="isPopupOpen = false"
      >
        <div 
          class="ratio-popup" 
          @click.stop
        >
          <div class="popup-header">
            <h3 class="popup-title">Select Image Ratio</h3>
            <button 
              class="close-button" 
              @click="isPopupOpen = false"
            >
              &times;
            </button>
          </div>
          
          <div class="ratio-options">
            <button 
              v-for="ratio in ratios" 
              :key="ratio"
              class="ratio-option" 
              :class="{ active: selectedRatio === ratio }"
              @click="selectAndApplyRatio(ratio)"
            >
              <div class="ratio-preview" :class="`preview-${ratio}`">
                <div class="inner-frame"></div>
              </div>
              <span class="ratio-label">{{ ratio }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialRatio: {
    type: String,
    default: '1-1'
  }
});

const emit = defineEmits(['ratio-changed']);

const ratios = ['1-1', '3-4', '4-3', '9-16', '16-9'];
const selectedRatio = ref(props.initialRatio);

const isPopupOpen = ref(false);

const selectAndApplyRatio = (ratio) => {
  selectedRatio.value = ratio;
  emit('ratio-changed', ratio);
  isPopupOpen.value = false;
};
</script>

<style scoped>
.ratio-selector-container {
  display: inline-block;
}

.ratio-trigger-button {
  background: #6366f1;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(100, 116, 139, 0.25);
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.ratio-trigger-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s ease;
}

.ratio-trigger-button:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(99, 102, 241, 0.3);
}

.ratio-trigger-button:hover::before {
  left: 100%;
}

.ratio-trigger-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
}

.ratio-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.ratio-popup {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: popup-appear 0.2s ease forwards;
}

@keyframes popup-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e6e9ef;
}

.popup-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1E293B;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  line-height: 1;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ratio-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px;
  justify-content: center;
}

.ratio-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem;
  background-color: white;
  border: 2px solid #e6e9ef;
  border-radius: 8px;
  color: #334155;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 70px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.ratio-option:hover {
  background-color: #F9FAFB;
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(99, 102, 241, 0.1);
}

.ratio-option.active {
  background: #6366f1;
  color: #FFFFFF;
  border-color: #4f46e5;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}

.ratio-preview {
  position: relative;
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-frame {
  background-color: currentColor;
  position: absolute;
}

/* Ratio preview containers */
.preview-1-1 .inner-frame {
  width: 30px;
  height: 30px;
}

.preview-3-4 .inner-frame {
  width: 22px;
  height: 30px;
}

.preview-4-3 .inner-frame {
  width: 30px;
  height: 22px;
}

.preview-9-16 .inner-frame {
  width: 18px;
  height: 32px;
}

.preview-16-9 .inner-frame {
  width: 32px;
  height: 18px;
}

.ratio-label {
  font-size: 0.75rem;
  margin-top: 2px;
  font-weight: 700;
}

.ratio-option.active .inner-frame {
  background-color: white;
}

@media (max-width: 480px) {
  .ratio-options {
    gap: 8px;
  }
  
  .ratio-option {
    width: 60px;
    padding: 0.4rem;
  }
  
  .ratio-preview {
    width: 30px;
    height: 30px;
  }
  
  /* Reduce preview sizes for mobile */
  .preview-1-1 .inner-frame {
    width: 24px;
    height: 24px;
  }
  
  .preview-3-4 .inner-frame {
    width: 16px;
    height: 22px;
  }
  
  .preview-4-3 .inner-frame {
    width: 22px;
    height: 16px;
  }
  
  .preview-9-16 .inner-frame {
    width: 14px;
    height: 24px;
  }
  
  .preview-16-9 .inner-frame {
    width: 24px;
    height: 14px;
  }
}
</style>