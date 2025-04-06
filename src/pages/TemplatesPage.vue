<template>
  <div class="templates-page">
    <div class="container">
      <h1 class="page-title">{{ $t('TEMPLATES_TITLE') }}</h1>
      <p class="page-subtitle">{{ $t('TEMPLATES_SUBTITLE') }}</p>

      <div class="templates-filters">
        <div class="search-bar">
          <input type="text" :placeholder="$t('TEMPLATES_SEARCH_PLACEHOLDER')" v-model="searchQuery" />
        </div>

        <div class="filter-categories">
          <button v-for="category in categories" :key="category.id" @click="activeCategory = category.id"
            :class="{ active: activeCategory === category.id }" class="category-button">
            {{ category.name }}
          </button>
        </div>
      </div>

      <div class="templates-grid">
        <div v-for="template in filteredTemplates" :key="template.id" class="template-card">
          <div class="template-preview">
            <img :src="template.image" :alt="template.name" />
            <div class="template-actions">
              <button class="btn-use">{{ $t('TEMPLATES_BUTTON_USE') }}</button>
              <button class="btn-preview">{{ $t('TEMPLATES_BUTTON_PREVIEW') }}</button>
            </div>
          </div>
          <div class="template-info">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
            <div class="template-meta">
              <span class="template-category">{{ template.category }}</span>
              <span class="template-size">{{ template.size }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button class="pagination-prev" :disabled="currentPage === 1" @click="currentPage--">
          {{ $t('TEMPLATES_PAGINATION_PREV') }}
        </button>
        <div class="pagination-numbers">
          <button v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }"
            @click="currentPage = page">
            {{ page }}
          </button>
        </div>
        <button class="pagination-next" :disabled="currentPage === totalPages" @click="currentPage++">
          {{ $t('TEMPLATES_PAGINATION_NEXT') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const activeCategory = ref('all');
const currentPage = ref(1);
const itemsPerPage = 12;

const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'social', name: 'Mạng xã hội' },
  { id: 'ads', name: 'Quảng cáo' },
  { id: 'banner', name: 'Banner' },
  { id: 'profile', name: 'Ảnh đại diện' },
  { id: 'effects', name: 'Hiệu ứng' }
];

// Mock data for templates
const templates = [
  {
    id: 1,
    name: 'Facebook Cover',
    description: 'Mẫu ảnh bìa Facebook chuyên nghiệp',
    category: 'social',
    size: '851 x 315 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=200&width=400'
  },
  {
    id: 2,
    name: 'Instagram Post',
    description: 'Mẫu bài đăng Instagram vuông',
    category: 'social',
    size: '1080 x 1080 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=200&width=200'
  },
  {
    id: 3,
    name: 'YouTube Thumbnail',
    description: 'Mẫu hình thu nhỏ cho video YouTube',
    category: 'social',
    size: '1280 x 720 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=200&width=300'
  },
  {
    id: 4,
    name: 'Google Ads Banner',
    description: 'Banner quảng cáo Google Ads',
    category: 'ads',
    size: '728 x 90 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=90&width=300'
  },
  {
    id: 5,
    name: 'Website Header',
    description: 'Banner header cho website',
    category: 'banner',
    size: '1200 x 300 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=150&width=400'
  },
  {
    id: 6,
    name: 'LinkedIn Profile',
    description: 'Mẫu ảnh đại diện LinkedIn',
    category: 'profile',
    size: '400 x 400 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=200&width=200'
  },
  {
    id: 7,
    name: 'Vintage Filter',
    description: 'Hiệu ứng lọc màu vintage',
    category: 'effects',
    size: 'Tùy chỉnh',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=200&width=200'
  },
  {
    id: 8,
    name: 'TikTok Video',
    description: 'Mẫu video TikTok dọc',
    category: 'social',
    size: '1080 x 1920 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=300&width=150'
  },
  {
    id: 9,
    name: 'Facebook Ad',
    description: 'Mẫu quảng cáo Facebook',
    category: 'ads',
    size: '1200 x 628 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=200&width=300'
  },
  {
    id: 10,
    name: 'Twitter Header',
    description: 'Ảnh bìa Twitter',
    category: 'social',
    size: '1500 x 500 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=150&width=400'
  },
  {
    id: 11,
    name: 'Product Banner',
    description: 'Banner giới thiệu sản phẩm',
    category: 'banner',
    size: '1200 x 400 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=150&width=400'
  },
  {
    id: 12,
    name: 'HDR Effect',
    description: 'Hiệu ứng HDR cho ảnh',
    category: 'effects',
    size: 'Tùy chỉnh',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=200&width=200'
  },
  {
    id: 13,
    name: 'Discord Profile',
    description: 'Ảnh đại diện Discord',
    category: 'profile',
    size: '128 x 128 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=128&width=128'
  },
  {
    id: 14,
    name: 'Pinterest Pin',
    description: 'Mẫu pin Pinterest',
    category: 'social',
    size: '1000 x 1500 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=300&width=200'
  },
  {
    id: 15,
    name: 'Email Header',
    description: 'Banner cho email marketing',
    category: 'banner',
    size: '600 x 200 px',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=100&width=300'
  },
  {
    id: 16,
    name: 'Duotone Effect',
    description: 'Hiệu ứng hai tông màu',
    category: 'effects',
    size: 'Tùy chỉnh',
    image: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=200&width=200'
  }
];

const filteredTemplates = computed(() => {
  let result = templates;

  // Filter by category
  if (activeCategory.value !== 'all') {
    result = result.filter(template => template.category === activeCategory.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(template =>
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query)
    );
  }

  // Pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return result.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => {
  let filteredCount = templates.length;

  if (activeCategory.value !== 'all') {
    filteredCount = templates.filter(template => template.category === activeCategory.value).length;
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filteredCount = templates.filter(template =>
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query)
    ).length;
  }

  return Math.ceil(filteredCount / itemsPerPage);
});
</script>

<style scoped>
.templates-page {
  padding: 40px 0;
}

.page-title {
  text-align: center;
  margin-bottom: 10px;
  color: #1f2937;
}

.page-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 20px;
}

.templates-filters {
  margin-bottom: 30px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.filter-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.category-button {
  padding: 8px 16px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-button.active {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.template-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.template-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.template-preview {
  position: relative;
  overflow: hidden;
}

.template-preview img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.template-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.template-card:hover .template-actions {
  transform: translateY(0);
}

.template-card:hover .template-preview img {
  transform: scale(1.05);
}

.btn-use,
.btn-preview {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.btn-use {
  background-color: #4f46e5;
  color: white;
}

.btn-preview {
  background-color: transparent;
  color: white;
  border: 1px solid white;
}

.template-info {
  padding: 20px;
}

.template-info h3 {
  margin-bottom: 8px;
  color: #1f2937;
}

.template-info p {
  color: #6b7280;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.template-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.template-category {
  background-color: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
  color: #4b5563;
}

.template-size {
  color: #9ca3af;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination-numbers {
  display: flex;
  gap: 5px;
}

.pagination-numbers button {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background-color: white;
  cursor: pointer;
}

.pagination-numbers button.active {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.pagination-prev,
.pagination-next {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background-color: white;
  cursor: pointer;
}

.pagination-prev:disabled,
.pagination-next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .filter-categories {
    justify-content: center;
  }

  .templates-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>