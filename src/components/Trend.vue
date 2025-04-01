<template>
    <div class="image-gallery">
        <div class="header-section">
            <h1 class="page-title">Get inspired by the community</h1>

            <div class="search-container">
                <div class="search-bar">
                    <span class="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input type="text" placeholder="Search" v-model="searchKeyword" @input="handleSearch" />
                </div>

                <div class="filter-tabs">
                    <button v-for="style in styles" :key="style.id"
                        :class="['filter-tab', { active: selectedStyle === style.id }]"
                        @click="setActiveStyle(style.id)">
                        {{ style.name }}
                    </button>
                </div>

                <div class="size-selector">
                    <button v-for="size in sizes" :key="size.value"
                        :class="['size-btn', { active: selectedSize === size.value }]"
                        @click="setSelectedSize(size.value)">
                        {{ size.label }}
                    </button>
                </div>
            </div>
        </div>

        <div class="masonry-grid">
            <div v-for="item in trendItems" :key="item.id" class="masonry-item" :class="[getSpanClass(item.sizeText)]"
                @click="openModal(item)">
                <div class="item-image">
                    <img :src="getImageUrl(item)" :alt="item.promptText.substring(0, 50)" loading="lazy" />
                    <div class="item-overlay">
                        <div class="item-actions">
                            <button class="action-btn save-btn">Save</button>
                            <button class="action-btn share-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                    <polyline points="16 6 12 2 8 6"></polyline>
                                    <line x1="12" y1="2" x2="12" y2="15"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="item-prompt">{{ shortenPrompt(item.promptText) }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="loading-indicator" v-if="isLoading">
            <div class="spinner"></div>
            <span>Loading images...</span>
        </div>

        <div class="load-more" v-if="!isLoading && currentPage < totalPages">
            <button @click="loadMore" class="load-more-btn">Load more</button>
        </div>

        <!-- Detail Modal -->
        <div v-if="selectedItem" class="modal-overlay" @click="closeModal">
            <div class="modal-container" @click.stop>
                <button class="modal-close" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div class="modal-content">
                    <div class="modal-image">
                        <img :src="getImageUrl(selectedItem)" :alt="selectedItem.promptText" />
                    </div>

                    <div class="modal-info">
                        <h2 class="modal-title">AI Generated Image</h2>
                        <p class="modal-prompt">{{ selectedItem.promptText }}</p>

                        <div class="modal-meta">
                            <div class="meta-item">
                                <span class="meta-label">Style:</span>
                                <span class="meta-value">{{ getStyleName(selectedItem.style_id) }}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Size:</span>
                                <span class="meta-value">{{ selectedItem.sizeText }}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Created:</span>
                                <span class="meta-value">{{ formatDate(selectedItem.createdAt) }}</span>
                            </div>
                        </div>

                        <div class="modal-actions">
                            <button class="modal-btn save-btn">Save</button>
                            <button class="modal-btn share-btn">Share</button>
                            <button class="modal-btn download-btn">Download</button>
                        </div>

                        <div class="related-items" v-if="relatedItems.length > 0">
                            <h3>Similar inspiration</h3>
                            <div class="related-grid">
                                <div v-for="item in relatedItems" :key="item.id" class="related-item"
                                    @click="openModal(item)">
                                    <img :src="getImageUrl(item)" :alt="shortenPrompt(item.promptText)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import request from '@/utils/request';
import { ref, computed, onMounted, watch } from 'vue';

// Reactive state
const searchKeyword = ref('');
const selectedStyle = ref('');
const selectedSize = ref('');
const currentPage = ref(1);
const trendItems = ref([]);
const selectedItem = ref(null);
const isLoading = ref(false);
const totalPages = ref(1);

// Available styles
const styles = [
    { id: '', name: 'All' },
    { id: '1', name: 'Anime' },
    { id: '2', name: 'Realistic' },
    { id: '7', name: 'Ghibli' },
    { id: '14', name: 'Manga' },
    { id: '17', name: 'Cartoon' }
];

// Available sizes
const sizes = [
    { value: '', label: 'Tất cả' },
    { value: '1-1', label: '1:1' },
    { value: '3-4', label: '3:4' },
    { value: '4-3', label: '4:3' },
    { value: '9-16', label: '9:16' },
    { value: '16-9', label: '16:9' }
];

// Related items for the modal
const relatedItems = computed(() => {
    if (!selectedItem.value) return [];

    return trendItems.value
        .filter(item =>
            item.id !== selectedItem.value.id &&
            item.style_id === selectedItem.value.style_id
        )
        .slice(0, 4);
});

// Get style name by id
const getStyleName = (styleId) => {
    const style = styles.find(s => s.id === styleId);
    return style ? style.name : 'Custom';
};

// Set active style
const setActiveStyle = (styleId) => {
    selectedStyle.value = styleId;
    currentPage.value = 1;
    fetchTrendList();
};

// Set selected size
const setSelectedSize = (size) => {
    selectedSize.value = size;
    currentPage.value = 1;
    fetchTrendList();
};

// Handle search input with debounce
let searchTimeout;
const handleSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentPage.value = 1;
        fetchTrendList();
    }, 500);
};

// Load more items
const loadMore = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchTrendList(true);
    }
};

// Get image URL from item data
const getImageUrl = (item) => {
    if (!item || !item.imgData) return '';

    try {
        const imgData = JSON.parse(item.imgData);
        if (imgData && imgData.length > 0) {
            // Return the first image URL
            return imgData[0].url.split('?')[0]; // Remove any query parameters
        }
    } catch (error) {
        console.error('Error parsing image data:', error);
    }

    return '';
};

// Format date for display
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Shorten prompt text for display
const shortenPrompt = (prompt) => {
    if (!prompt) return '';
    return prompt.length > 65 ? prompt.substring(0, 65) + '...' : prompt;
};

// Get span class based on size text
const getSpanClass = (sizeText) => {
    switch (sizeText) {
        case '3-4':
            return 'span-portrait';
        case '4-3':
            return 'span-landscape';
        case '9-16':
            return 'span-tall';
        case '16-9':
            return 'span-wide';
        default:
            return 'span-square';
    }
};

// Fetch trend list from API
const fetchTrendList = async (append = false) => {
    isLoading.value = true;

    try {
        // Using the API you provided
        const response = await request.post('/api/ainow/trend', {
            style_id: selectedStyle.value,
            keyword: searchKeyword.value,
            size: selectedSize.value,
            limit: 100,
            page: currentPage.value,
        });

        if (response && response.data) {
            if (append) {
                trendItems.value = [...trendItems.value, ...response.data];
            } else {
                trendItems.value = response.data;
            }

            totalPages.value = response.pagination.totalPages;
        } else {
            console.error('Invalid response format:', response);
        }
    } catch (error) {
        console.error('Error fetching trend list:', error);
        isLoading.value = false;
    }
};

// Open modal with selected item
const openModal = (item) => {
    selectedItem.value = item;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
};

// Close modal
const closeModal = () => {
    selectedItem.value = null;
    document.body.style.overflow = ''; // Restore scrolling
};

// Watch for changes in filters
watch([selectedStyle, selectedSize], () => {
    currentPage.value = 1;
    fetchTrendList();
});

// Initialize with API data
onMounted(() => {
    // Fetch initial data
    fetchTrendList();
});
</script>


<style scoped>
/* Variables */
:root {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --secondary-color: #f9fafb;
  --text-color: #1f2937;
  --text-light: #6b7280;
  --border-color: #e5e7eb;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --transition: all 0.2s ease;
}

/* Global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--text-color);
  background-color: #fff;
  line-height: 1.5;
}

button {
  cursor: pointer;
  font-family: inherit;
}

.image-gallery {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

/* Header Section */
.header-section {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-bar {
  position: relative;
  margin-bottom: 0.75rem;
  max-width: 250px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.search-bar input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2rem;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  font-size: 0.875rem;
  outline: none;
  transition: var(--transition);
  background-color: #f0f0f0;
}

.search-bar input:focus {
  border-color: var(--primary-color);
  background-color: white;
}

.search-bar input::placeholder {
  color: var(--text-light);
}

.filter-tabs {
  display: flex;
  gap: 0.25rem;
  flex-wrap: nowrap;
  margin-bottom: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  padding-bottom: 0.25rem;
}

.filter-tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.filter-tab {
  padding: 0.4rem 0.875rem;
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-color);
  transition: var(--transition);
  white-space: nowrap;
}

.filter-tab:hover {
  background-color: #f5f5f5;
}

.filter-tab.active {
  background-color: #111;
  border-color: #111;
  color: white;
  font-weight: 500;
}

/* Pinterest-Style Masonry Grid */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 16px;
  grid-auto-flow: dense;
}

.masonry-item {
  break-inside: avoid;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
  position: relative;
  transition: transform 0.2s ease;
}

.masonry-item:hover {
  transform: translateY(-4px);
}

.item-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
}

.item-image img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
  transition: filter 0.3s ease;
}

.masonry-item:hover .item-image img {
  filter: brightness(0.95);
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.masonry-item:hover .item-overlay {
  opacity: 1;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.action-btn {
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.item-prompt {
  font-size: 0.75rem;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Loading and Load More */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #111;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.load-more-btn {
  padding: 0.75rem 1.5rem;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color);
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.load-more-btn:hover {
  background-color: #f5f5f5;
}

/* Modal */
.modal-overlay {
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
  padding: 1rem;
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  max-width: 980px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  color: #333;
}

.modal-close:hover {
  color: #000;
}

.modal-content {
  display: flex;
  flex-direction: row;
}

.modal-image {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.modal-info {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 400px;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 8px;
}

.modal-category {
  color: #555;
  font-size: 0.875rem;
  margin-bottom: 24px;
}

.modal-meta {
  display: grid;
  grid-template-columns: 110px 1fr;
  row-gap: 12px;
  margin-bottom: 24px;
  font-size: 0.875rem;
}

.meta-label {
  font-weight: 600;
  color: #111;
}

.meta-value {
  color: #555;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.modal-btn {
  padding: 10px 16px;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
  text-align: center;
}

.save-btn {
  background-color: #e60023;
  color: white;
  border: none;
}

.save-btn:hover {
  background-color: #d50c22;
}

.share-btn, .download-btn {
  background-color: #efefef;
  color: #111;
  border: none;
}

.share-btn:hover, .download-btn:hover {
  background-color: #e0e0e0;
}

.similar-inspiration {
  margin-top: 24px;
}

.similar-inspiration h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #111;
}

.related-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-height: 320px;
  overflow-y: auto;
}

.related-item {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.related-item img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
  }
  
  .modal-image {
    border-radius: 12px 12px 0 0;
  }
  
  .modal-info {
    max-width: 100%;
  }
  
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Responsive adjustments for Pinterest-like layout */
@media (min-width: 640px) {
  .masonry-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 768px) {
  .masonry-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (min-width: 1280px) {
  .masonry-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* Remove standard grid layout and implement JavaScript-based masonry */
/* Add this to your JavaScript to enable true masonry layout */
/*
document.addEventListener('DOMContentLoaded', function() {
  // This is optional JavaScript that can be used if CSS grid isn't giving the exact Pinterest look
  const masonryGrid = document.querySelector('.masonry-grid');
  const items = document.querySelectorAll('.masonry-item');
  
  // Initialize masonry layout library like Masonry.js here
  // or use a custom implementation
});
*/

/* Modified styles to better match the provided image */
.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.search-bar {
  margin-bottom: 0;
}

.filter-tabs {
  margin-bottom: 0;
  flex-grow: 1;
}

/* CSS for perfect Pinterest-style masonry layout */
.masonry-grid {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
}

.masonry-item {
  padding: 0 4px;
  margin-bottom: 8px;
  width: 100%;
}

@media (min-width:
 600px) {
  .masonry-item {
    width: 50%;
  }
}

@media (min-width: 960px) {
  .masonry-item {
    width: 33.33%;
  }
}

@media (min-width: 1280px) {
  .masonry-item {
    width: 25%;
  }
}

@media (min-width: 1600px) {
  .masonry-item {
    width: 20%;
  }
}

.item-image {
  display: block;
  width: 100%;
}

/* Styling for tab buttons to match the image */
.filter-tab {
  padding: 0.5rem 1rem;
  border-radius: 24px;
  font-size: 0.875rem;
  color: #111;
  background: #efefef;
  border: none;
  font-weight: 400;
}

.filter-tab.active {
  background: #111;
  color: white;
  font-weight: 500;
}

/* Fix for Flexbox-based masonry */
.masonry-grid {
  width: 100%;
  display: block;
  column-count: 2;
  column-gap: 4px;
}

@media (min-width: 640px) {
  .masonry-grid {
    column-count: 3;
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    column-count: 3;
  }
}

/* Cố định 4 cột cho mọi kích thước màn hình lớn */
@media (min-width: 1280px) {
  .masonry-grid {
    column-count: 3;
  }
}

.masonry-item {
  display: inline-block;
  width: 100%;
  break-inside: avoid;
}
.size-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.size-btn {
  padding: 4px 12px;
  border-radius: 16px;
  background-color: #f0f0f0;
  border: 1px solid #f1eeee;
  font-size: 0.875rem;
  color: #111;
  cursor: pointer;
}

.size-btn.active {
  background-color: #111;
  color: white;
  border-color: #111;
}
</style>