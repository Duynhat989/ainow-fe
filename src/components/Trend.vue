<template>
    <div class="trend-list-page">
      <div class="container">
        <h1 class="page-title">Image Trends</h1>
        <p class="page-subtitle">Explore the latest generated images</p>
    
        <div class="filters">
          <div class="filter-group">
            <select 
              id="style-filter"
              v-model="selectedStyle" 
              class="style-filter"
            >
              <option value="">All Styles</option>
              <option value="1">Style 1</option>
              <option value="17">Style 17</option>
              <option value="2">Style 2</option>
              <!-- Add more style options as needed -->
            </select>
          </div>
  
          <div class="filter-group">
            <select 
              id="size-filter"
              v-model="selectedSize" 
              class="size-filter"
            >
              <option value="">All Sizes</option>
              <option value="1-1">1:1</option>
              <option value="3-4">3:4</option>
              <option value="9-16">9:16</option>
            </select>
          </div>
    
          <div class="filter-group search-group">
            <input 
              v-model="searchKeyword" 
              placeholder="Search prompts..." 
              class="search-input"
            />
            <span class="search-icon">🔍</span>
          </div>
        </div>
    
        <div class="trend-grid">
          <div 
            v-for="item in trendItems" 
            :key="item.id" 
            class="trend-card"
            @click="openModal(item)"
          >
            <div class="trend-images">
              <img 
                :src="parseImageData(item.imgData)[0].url" 
                :alt="item.promptText"
                class="trend-image"
              />
            </div>
            <div class="trend-details">
              <p class="trend-prompt">{{ item.promptText }}</p>
              <div class="trend-meta">
                <span class="trend-style">Style: {{ item.style_id }}</span>
                <span class="trend-size">Size: {{ item.sizeText }}</span>
              </div>
              <div class="trend-dates">
                <span class="created-at">
                  Created: {{ formatDate(item.createdAt) }}
                </span>
              </div>
            </div>
          </div>
        </div>
    
        <div class="pagination">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
          >
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </div>
  
        <!-- Modal -->
        <div 
          v-if="selectedItem" 
          class="image-modal"
          @click.self="closeModal"
        >
          <div class="modal-content">
            <button class="close-button" @click="closeModal">×</button>
            <div class="modal-content-wrapper">
              <div class="modal-images">
                <img 
                  v-for="(img, index) in parseImageData(selectedItem.imgData)" 
                  :key="index"
                  :src="img.url"
                  :alt="`Image ${index + 1}`"
                  class="modal-image"
                />
              </div>
              <div class="modal-details">
                <h2 class="modal-title">Prompt Details</h2>
                <p class="modal-prompt">{{ selectedItem.promptText }}</p>
                <div class="modal-meta">
                  <span><strong>Style:</strong> {{ selectedItem.style_id }}</span>
                  <span><strong>Size:</strong> {{ selectedItem.sizeText }}</span>
                  <span><strong>Created:</strong> {{ formatDate(selectedItem.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import request from '@/utils/request';
  
  // Reactive state
  const trendItems = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const selectedStyle = ref('')
  const selectedSize = ref('')
  const searchKeyword = ref('')
  const selectedItem = ref(null)
  
  // Fetch trend list
  const fetchTrendList = async () => {
    try {
      const response = await request.post('/api/ainow/trend', {
        style_id: selectedStyle.value,
        keyword: searchKeyword.value,
        size: selectedSize.value,
        limit: 10,
        page: currentPage.value,
      });
      trendItems.value = response.data
      totalPages.value = response.pagination.totalPages
    } catch (error) {
      console.error('Error fetching trend list:', error)
    }
  }
  
  // Utility functions
  const parseImageData = (imgDataString) => {
    try {
      return JSON.parse(imgDataString)
    } catch (error) {
      console.error('Error parsing image data:', error)
      return []
    }
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }
  
  // Modal methods
  const openModal = (item) => {
    selectedItem.value = item
  }
  
  const closeModal = () => {
    selectedItem.value = null
  }
  
  // Pagination methods
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchTrendList()
    }
  }
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      fetchTrendList()
    }
  }
  
  // Watch for changes in filters
  const watchFilters = () => {
    currentPage.value = 1
    fetchTrendList()
  }
  
  // Watchers
  watch(selectedStyle, watchFilters)
  watch(selectedSize, watchFilters)
  watch(searchKeyword, watchFilters)
  
  // Initial fetch
  onMounted(fetchTrendList)
  </script>
  
  <style scoped>
  .trend-list-page {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 40px 0;
    background-color: #f5f7fa;
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
    background: linear-gradient(90deg, #4338ca, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .page-subtitle {
    text-align: center;
    color: #64748b;
    margin-bottom: 40px;
    font-size: 1.2rem;
  }
  
  .filters {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-group label {
    font-size: 0.8rem;
    color: #475569;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }
  
  .style-filter,
  .size-filter,
  .search-input {
    padding: 10px 15px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .search-group {
    position: relative;
    width: 300px;
  }
  
  .search-input {
    width: 100%;
    padding-right: 40px;
  }
  
  .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
  }
  
  .style-filter:focus,
  .size-filter:focus,
  .search-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
  
  .trend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .trend-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  
  .trend-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  .trend-images {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
  }
  
  .trend-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  
  .trend-details {
    padding: 15px;
  }
  
  .trend-prompt {
    margin: 0 0 10px;
    font-weight: 600;
    color: #1e293b;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .trend-meta {
    display: flex;
    justify-content: space-between;
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  
  .trend-dates {
    font-size: 0.8rem;
    color: #94a3b8;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
  }
  
  .pagination button {
    padding: 10px 20px;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .pagination button:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
  
  /* Modal Styles */
  .image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 16px;
    max-width: 900px;
    width: 100%;
    height: 80vh;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: #f1f5f9;
    color: #475569;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
    z-index: 10;
  }
  
  .close-button:hover {
    background-color: #e2e8f0;
  }
  
  .modal-content-wrapper {
    display: flex;
    height: 100%;
    overflow: hidden;
  }
  
  .modal-images {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    padding: 20px;
    overflow-y: auto;
    background-color: #f8fafc;
  }
  
  .modal-image {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 8px;
  }
  
  .modal-details {
    flex: 1;
    padding: 20px;
    background-color: white;
    overflow-y: auto;
    max-width: 40%;
    border-left: 1px solid #e2e8f0;
  }
  
  .modal-title {
    margin: 0 0 15px;
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .modal-prompt {
    margin: 0 0 20px;
    color: #475569;
    line-height: 1.6;
    font-size: 1rem;
  }
  
  .modal-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #64748b;
    font-size: 0.9rem;
  }
  
  .modal-meta span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-meta strong {
    color: #1e293b;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .filters {
      flex-direction: column;
      align-items: center;
    }
  
    .search-group {
      width: 100%;
    }
  
    .trend-grid {
      grid-template-columns: 1fr;
    }
  
    .modal-content {
      margin: 0;
      height: 100%;
      border-radius: 0;
    }
  
    .modal-images {
      grid-template-columns: 1fr;
    }
  
    .modal-image {
      height: auto;
    }
  }
  </style>