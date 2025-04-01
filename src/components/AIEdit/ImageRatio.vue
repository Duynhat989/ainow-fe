<template>
    <div class="image-ratio-selector">
      <p class="ratio-title">Image ratio:</p>
      <div class="ratio-options">
        <button 
          v-for="ratio in ratios" 
          :key="ratio"
          class="ratio-option" 
          :class="{ active: selectedRatio === ratio }"
          @click="selectRatio(ratio)"
        >
          <div class="ratio-preview" :class="`preview-${ratio}`">
            <div class="inner-frame"></div>
          </div>
          <span class="ratio-label">{{ ratio }}</span>
        </button>
      </div>
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
  
  const selectRatio = (ratio) => {
    selectedRatio.value = ratio;
    emit('ratio-changed', ratio);
  };
  </script>
  
  <style scoped>
  .image-ratio-selector {
    background-color: #f5f7fa;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .ratio-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.8rem 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .ratio-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  
  .ratio-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    background-color: white;
    border: 2px solid #e6e9ef;
    border-radius: 6px;
    color: #5e6c84;
    font-weight: 500;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 70px;
  }
  
  .ratio-option:hover {
    background-color: #f0f2f5;
    border-color: #c1c7d0;
    transform: translateY(-1px);
  }
  
  .ratio-option.active {
    background-color: #4c6ef5;
    color: white;
    border-color: #4c6ef5;
    box-shadow: 0 2px 5px rgba(76, 110, 245, 0.3);
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
  
  .preview-2-3 .inner-frame {
    width: 24px;
    height: 36px;
  }
  
  .preview-3-2 .inner-frame {
    width: 36px;
    height: 24px;
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
  }
  
  .ratio-option.active .inner-frame {
    background-color: white;
  }
  
  @media (max-width: 480px) {
    .ratio-options {
      gap: 6px;
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
    
    .preview-2-3 .inner-frame {
      width: 18px;
      height: 27px;
    }
    
    .preview-3-2 .inner-frame {
      width: 27px;
      height: 18px;
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