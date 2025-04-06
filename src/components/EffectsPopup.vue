<template>
  <div class="effects-popup-container">
    <!-- Button to open the effects popup -->
    <button class="effects-popup-button" @click="openPopup">
      <span class="effects-icon">
        ✨
      </span>
      <span class="effects-text">{{ $t('EFFECTS_BUTTON') }}</span>
    </button>

    <!-- Effects Popup Modal -->
    <div class="effects-modal" v-if="isPopupOpen">
      <div class="effects-modal-overlay" @click="closePopup"></div>
      <div class="effects-modal-content">
        <div class="effects-modal-header">
          <h2>🎨 {{ $t('EFFECTS_TITLE') }}</h2>
          <button class="close-button" @click="closePopup">×</button>
        </div>

        <div class="effects-modal-body">
          <!-- Search and Filter -->
          <div class="effects-search-filter">
            <div class="effects-search">
              <input type="text" :placeholder="$t('EFFECTS_SEARCH_PLACEHOLDER')" v-model="searchQuery" @input="filterEffects" />
            </div>
            <div class="effects-categories">
              <button v-for="category in categories" :key="category.id" class="category-button"
                :class="{ active: activeCategory === category.id }" @click="setCategory(category.id)">
                {{ category.name }}
              </button>
            </div>
          </div>

          <!-- Effects Grid -->
          <div class="effects-grid">
            <div v-for="effect in filteredEffects" :key="effect.id" class="effect-card" @click="applyEffect(effect.id)">
              <div class="effect-video-wrapper">
                <img class="effect-video" :src="effect.video" alt="">
                <!-- <video class="effect-video" autoplay loop muted playsinline :src="effect.video"></video> -->
              </div>
              <div class="effect-info">
                <h3>{{ effect.name }}</h3>
                <p>{{ effect.description }}</p>
              </div>
              <div class="effect-hover-overlay">
                <button class="apply-effect-button">{{ $t('EFFECTS_APPLY_BUTTON') }}</button>
              </div>
            </div>
          </div>
        </div>

        <div class="effects-modal-footer">
          <button class="secondary-button" @click="closePopup">{{ $t('EFFECTS_CANCEL_BUTTON') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import remove_bg_gif from '../assets/gifs/removebg.gif'
import remove_wtm_gif from '../assets/gifs/watermark.gif'
import echance_gif from '../assets/gifs/echance.gif'
import retouch_skin_gif from '../assets/gifs/retouch_skin.gif'
// Emit events to parent component
const emit = defineEmits(['apply-effect']);

// State for popup visibility
const isPopupOpen = ref(false);
const searchQuery = ref('');
const activeCategory = ref('all');

// Categories
const categories = [
  { id: 'all', name: 'All Effects' },
  { id: 'enhance', name: 'Enhancement' },
  { id: 'artistic', name: 'Artistic' },
  { id: 'correction', name: 'Correction' },
  { id: 'retouch', name: 'Retouching' }
];

// Example video - using the provided video for all effects
// In a real implementation, you would use different videos for each effect

// Effects list with videos
const effectsList = [
  {
    id: 'restore-photo',
    name: 'Restore Old Photo',
    description: 'Fix damage, enhance faded details',
    video: echance_gif,
    category: 'correction',
    colorClass: 'restore-icon'
  },
  {
    id: 'remove-bg',
    name: 'Remove Background',
    description: 'Precise background removal with AI',
    video: remove_bg_gif,
    category: 'correction',
    colorClass: 'remove-bg-icon'
  },
  {
    id: 'retouch-skin',
    name: 'Skin Retouching',
    description: 'Smooth skin while preserving texture',
    video: retouch_skin_gif,
    category: 'retouch',
    colorClass: 'retouch-icon'
  },
  {
    id: 'enhance-photo',
    name: 'Enhance Face',
    description: 'Improve facial details & expressions',
    video: echance_gif,
    category: 'enhance',
    colorClass: 'portrait-icon'
  },
  {
    id: 'remove-watermark',
    name: 'Remove Watermark',
    description: 'Upscale without losing quality',
    video: remove_wtm_gif,
    category: 'enhance',
    colorClass: 'upscale-icon'
  },
  // {
  //   id: 'colorize',
  //   name: 'Colorize Photo',
  //   description: 'Add natural colors to B&W images',
  //   video: defaultVideo,
  //   category: 'artistic',
  //   colorClass: 'colorize-icon'
  // },
  // {
  //   id: 'artistic',
  //   name: 'Artistic Style',
  //   description: 'Apply painting styles to your photo',
  //   video: defaultVideo,
  //   category: 'artistic',
  //   colorClass: 'artistic-icon'
  // },
  // {
  //   id: 'fix-blur',
  //   name: 'Fix Blur',
  //   description: 'Sharpen blurry areas and details',
  //   video: defaultVideo,
  //   category: 'correction',
  //   colorClass: 'blur-icon'
  // },
  // {
  //   id: 'makeup',
  //   name: 'AI Makeup',
  //   description: 'Apply natural-looking makeup',
  //   video: defaultVideo,
  //   category: 'retouch',
  //   colorClass: 'makeup-icon'
  // },
  // {
  //   id: 'vintage',
  //   name: 'Vintage Effect',
  //   description: 'Apply classic film-inspired looks',
  //   video: defaultVideo,
  //   category: 'artistic',
  //   colorClass: 'vintage-icon'
  // },
  // {
  //   id: 'hdr',
  //   name: 'HDR Effect',
  //   description: 'Enhance dynamic range and details',
  //   video: defaultVideo,
  //   category: 'enhance',
  //   colorClass: 'hdr-icon'
  // }
];

// Filter effects based on search query and active category
const filteredEffects = computed(() => {
  let effects = effectsList;

  // Filter by category
  if (activeCategory.value !== 'all') {
    effects = effects.filter(effect => effect.category === activeCategory.value);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    effects = effects.filter(effect =>
      effect.name.toLowerCase().includes(query) ||
      effect.description.toLowerCase().includes(query)
    );
  }

  return effects;
});

// Methods
const openPopup = () => {
  isPopupOpen.value = true;
  // Reset filters when opening
  searchQuery.value = '';
  activeCategory.value = 'all';
  
};

const closePopup = () => {
  isPopupOpen.value = false;
};

const setCategory = (categoryId) => {
  activeCategory.value = categoryId;

  // Restart videos after category changes
  setTimeout(() => {
    const videos = document.querySelectorAll('.effect-video');
    videos.forEach(video => {
      video.play().catch(e => console.log('Auto-play prevented:', e));
    });
  }, 100);
};

const filterEffects = () => {
  // This is just to explicitly show we're filtering, but computed properties handle it
  console.log('Filtering effects with query:', searchQuery.value);
};

const applyEffect = (effectId) => {
  emit('apply-effect', effectId);
  closePopup();
};
</script>

<style scoped>
/* Effects Popup Button */
.effects-popup-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(to right, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.effects-popup-button:hover {
  background: linear-gradient(to right, #4f46e5, #4338ca);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

.effects-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.effects-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.effects-text {
  color: white;
}

/* Modal Styles */
.effects-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.effects-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.effects-modal-content {
  position: relative;
  width: 90%;
  max-width: 950px;
  max-height: 90vh;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.effects-modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.effects-modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 700;
}

.effects-modal-body {
  flex: 1;
  padding: 20px 24px;
  overflow-y: auto;
}

.effects-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
}

.close-button:hover {
  color: #1e293b;
}

/* Search and Filter */
.effects-search-filter {
  margin-bottom: 20px;
}

.effects-search {
  margin-bottom: 16px;
}

.effects-search input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s;
}

.effects-search input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.effects-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-button {
  padding: 8px 16px;
  background-color: #f8fafc;
  border-radius: 30px;
  font-size: 0.95rem;
  color: #475569;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
}

.category-button.active {
  background-color: #6366f1;
  color: white;
  border-color: #4f46e5;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
}

.category-button:hover:not(.active) {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

/* Effects Grid */
.effects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.effect-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.effect-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

/* Video Style */
.effect-video-wrapper {
  width: 100%;
  height: 160px;
  overflow: hidden;
  position: relative;
}

.effect-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Color overlays for videos to maintain brand colors */
.effect-video-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
  pointer-events: none;
}

.enhance-icon::after {
  background: linear-gradient(135deg, #c084fc, #8b5cf6);
}

.restore-icon::after {
  background: linear-gradient(135deg, #34d399, #10b981);
}

.remove-bg-icon::after {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}

.portrait-icon::after {
  background: linear-gradient(135deg, #f472b6, #ec4899);
}

.upscale-icon::after {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.colorize-icon::after {
  background: linear-gradient(135deg, #fb7185, #e11d48);
}

.artistic-icon::after {
  background: linear-gradient(135deg, #9333ea, #7e22ce);
}

.blur-icon::after {
  background: linear-gradient(135deg, #0891b2, #0e7490);
}

.retouch-icon::after {
  background: linear-gradient(135deg, #2dd4bf, #14b8a6);
}

.makeup-icon::after {
  background: linear-gradient(135deg, #f43f5e, #e11d48);
}

.vintage-icon::after {
  background: linear-gradient(135deg, #854d0e, #a16207);
}

.hdr-icon::after {
  background: linear-gradient(135deg, #0369a1, #0284c7);
}

.effect-info {
  padding: 16px;
}

.effect-info h3 {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.effect-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
}

.effect-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.effect-card:hover .effect-hover-overlay {
  opacity: 1;
}

.apply-effect-button {
  padding: 10px 24px;
  background-color: white;
  color: #1e293b;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.apply-effect-button:hover {
  background-color: #f8fafc;
  transform: scale(1.05);
}

/* Buttons in footer */
.secondary-button {
  padding: 10px 24px;
  background-color: white;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-button:hover {
  background-color: #f8fafc;
  border-color: #94a3b8;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .effects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .effects-modal-content {
    width: 95%;
    max-height: 95vh;
  }

  .effect-video-wrapper {
    height: 140px;
  }
}

@media (max-width: 480px) {
  .effects-grid {
    grid-template-columns: 1fr;
  }

  .effects-modal-header h2 {
    font-size: 1.3rem;
  }

  .effect-info h3 {
    font-size: 1rem;
  }
}
</style>