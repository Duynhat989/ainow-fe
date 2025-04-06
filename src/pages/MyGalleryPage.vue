<template>
  <div class="gallery-page">
    <div class="container">
      <h1 class="page-title">{{ $t('GALLERY_TITLE') }}</h1>
      <p class="page-subtitle">{{ $t('GALLERY_SUBTITLE') }}</p>

      <div class="gallery-controls">
        <div class="gallery-search">
          <input type="text" :placeholder="$t('GALLERY_SEARCH_PLACEHOLDER')" v-model="searchQuery" />
        </div>

        <div class="gallery-filters">
          <select v-model="sortBy">
            <option value="newest">{{ $t('GALLERY_SORT_NEWEST') }}</option>
            <option value="oldest">{{ $t('GALLERY_SORT_OLDEST') }}</option>
            <option value="name">{{ $t('GALLERY_SORT_NAME') }}</option>
            <option value="size">{{ $t('GALLERY_SORT_SIZE') }}</option>
          </select>

          <select v-model="filterBy">
            <option value="all">{{ $t('GALLERY_FILTER_ALL') }}</option>
            <option value="edited">{{ $t('GALLERY_FILTER_EDITED') }}</option>
            <option value="original">{{ $t('GALLERY_FILTER_ORIGINAL') }}</option>
            <option value="shared">{{ $t('GALLERY_FILTER_SHARED') }}</option>
          </select>
        </div>
      </div>

      <div v-if="images.length === 0" class="empty-gallery">
        <div class="empty-icon">🖼️</div>
        <h3>{{ $t('GALLERY_EMPTY_TITLE') }}</h3>
        <p>{{ $t('GALLERY_EMPTY_MESSAGE') }}</p>
        <router-link to="/editor" class="btn btn-primary">{{ $t('GALLERY_UPLOAD_BUTTON') }}</router-link>
      </div>

      <div v-else class="gallery-grid">
        <div v-for="image in filteredImages" :key="image.id" class="gallery-item">
          <div class="gallery-image">
            <img :src="image.url" :alt="image.name" />
            <div class="image-actions">
              <button @click="editImage(image)" class="action-button">
                <span class="action-icon">✏️</span>
              </button>
              <button @click="shareImage(image)" class="action-button">
                <span class="action-icon">🔗</span>
              </button>
              <button @click="downloadImage(image)" class="action-button">
                <span class="action-icon">⬇️</span>
              </button>
              <button @click="deleteImage(image)" class="action-button delete">
                <span class="action-icon">🗑️</span>
              </button>
            </div>
          </div>
          <div class="image-info">
            <h3>{{ image.name }}</h3>
            <div class="image-meta">
              <span class="image-date">{{ formatDate(image.date) }}</span>
              <span class="image-size">{{ image.size }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="images.length > 0" class="gallery-pagination">
        <button class="pagination-prev" :disabled="currentPage === 1" @click="currentPage--">
          {{ $t('GALLERY_PAGINATION_PREV') }}
        </button>
        <div class="pagination-numbers">
          <button v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }"
            @click="currentPage = page">
            {{ page }}
          </button>
        </div>
        <button class="pagination-next" :disabled="currentPage === totalPages" @click="currentPage++">
          {{ $t('GALLERY_PAGINATION_NEXT') }}
        </button>
      </div>

      <!-- Share Modal -->
      <div v-if="showShareModal" class="modal-overlay" @click="showShareModal = false">
        <div class="modal-content" @click.stop>
          <h3>{{ $t('GALLERY_SHARE_MODAL_TITLE') }}</h3>
          <div class="share-preview">
            <img :src="selectedImage?.url" alt="Share preview" />
          </div>
          <div class="share-options">
            <button class="share-button facebook">Facebook</button>
            <button class="share-button twitter">Twitter</button>
            <button class="share-button instagram">Instagram</button>
            <button class="share-button pinterest">Pinterest</button>
          </div>
          <div class="share-link">
            <input type="text" :value="'https://ai-image-editor.com/share/' + selectedImage?.id" readonly />
            <button @click="copyShareLink">{{ $t('GALLERY_SHARE_COPY_LINK') }}</button>
          </div>
          <button class="modal-close" @click="showShareModal = false">{{ $t('GALLERY_MODAL_CLOSE') }}</button>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
        <div class="modal-content" @click.stop>
          <h3>{{ $t('GALLERY_DELETE_MODAL_TITLE') }}</h3>
          <p>{{ $t('GALLERY_DELETE_MODAL_MESSAGE') }}</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="showDeleteModal = false">{{ $t('GALLERY_DELETE_MODAL_CANCEL')
              }}</button>
            <button class="btn btn-danger" @click="confirmDelete">{{ $t('GALLERY_DELETE_MODAL_CONFIRM') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const sortBy = ref('newest');
const filterBy = ref('all');
const currentPage = ref(1);
const itemsPerPage = 12;
const showShareModal = ref(false);
const showDeleteModal = ref(false);
const selectedImage = ref(null);
const imageToDelete = ref(null);

// Mock data for images
const images = ref([
  {
    id: 1,
    name: 'Beach Sunset.jpg',
    url: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=300&width=400',
    date: new Date(2023, 5, 15),
    size: '2.4 MB',
    type: 'edited',
    shared: true
  },
  {
    id: 2,
    name: 'Mountain View.jpg',
    url: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=300',
    date: new Date(2023, 6, 22),
    size: '3.1 MB',
    type: 'original',
    shared: false
  },
  {
    id: 3,
    name: 'Family Portrait.jpg',
    url: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=300&width=300',
    date: new Date(2023, 7, 5),
    size: '1.8 MB',
    type: 'edited',
    shared: true
  },
  {
    id: 4,
    name: 'City Skyline.jpg',
    url: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=300&width=500',
    date: new Date(2023, 8, 10),
    size: '4.2 MB',
    type: 'edited',
    shared: false
  },
  {
    id: 5,
    name: 'Product Photo.jpg',
    url: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=400',
    date: new Date(2023, 9, 3),
    size: '1.5 MB',
    type: 'original',
    shared: false
  },
  {
    id: 6,
    name: 'Vacation Memories.jpg',
    url: 'https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=300&width=450',
    date: new Date(2023, 10, 12),
    size: '2.9 MB',
    type: 'edited',
    shared: true
  }
]);

const filteredImages = computed(() => {
  let result = [...images.value];

  // Filter by type
  if (filterBy.value !== 'all') {
    if (filterBy.value === 'shared') {
      result = result.filter(image => image.shared);
    } else {
      result = result.filter(image => image.type === filterBy.value);
    }
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(image => image.name.toLowerCase().includes(query));
  }

  // Sort images
  result.sort((a, b) => {
    if (sortBy.value === 'newest') {
      return b.date - a.date;
    } else if (sortBy.value === 'oldest') {
      return a.date - b.date;
    } else if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy.value === 'size') {
      return parseFloat(b.size) - parseFloat(a.size);
    }
    return 0;
  });

  // Pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return result.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => {
  let filteredCount = images.value.length;

  if (filterBy.value !== 'all') {
    if (filterBy.value === 'shared') {
      filteredCount = images.value.filter(image => image.shared).length;
    } else {
      filteredCount = images.value.filter(image => image.type === filterBy.value).length;
    }
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filteredCount = images.value.filter(image => image.name.toLowerCase().includes(query)).length;
  }

  return Math.ceil(filteredCount / itemsPerPage);
});

const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const editImage = (image) => {
  // In a real app, this would navigate to the editor with the selected image
  console.log('Edit image:', image.id);
};

const shareImage = (image) => {
  selectedImage.value = image;
  showShareModal.value = true;
};

const downloadImage = (image) => {
  // In a real app, this would trigger a download
  console.log('Download image:', image.id);
  alert(`Đang tải xuống: ${image.name}`);
};

const deleteImage = (image) => {
  imageToDelete.value = image;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (imageToDelete.value) {
    // Remove the image from the array
    images.value = images.value.filter(img => img.id !== imageToDelete.value.id);
    showDeleteModal.value = false;
    imageToDelete.value = null;
  }
};

const copyShareLink = () => {
  // In a real app, this would copy the link to clipboard
  alert('Đã sao chép liên kết vào clipboard');
};
</script>

<style scoped>
.gallery-page {
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

.gallery-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.gallery-search {
  flex: 1;
  min-width: 250px;
}

.gallery-search input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.gallery-filters {
  display: flex;
  gap: 15px;
}

.gallery-filters select {
  padding: 10px 15px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  min-width: 150px;
}

.empty-gallery {
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  color: #9ca3af;
}

.empty-gallery h3 {
  margin-bottom: 10px;
  color: #1f2937;
}

.empty-gallery p {
  color: #6b7280;
  margin-bottom: 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.gallery-item {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-image {
  position: relative;
  overflow: hidden;
}

.gallery-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.image-actions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .image-actions {
  opacity: 1;
}

.action-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.action-button:hover {
  transform: scale(1.1);
}

.action-button.delete {
  background-color: #ef4444;
  color: white;
}

.action-icon {
  font-size: 1.2rem;
}

.image-info {
  padding: 15px;
}

.image-info h3 {
  margin-bottom: 8px;
  color: #1f2937;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6b7280;
}

.gallery-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
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
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-content h3 {
  margin-bottom: 20px;
  color: #1f2937;
  text-align: center;
}

.share-preview {
  margin-bottom: 20px;
  text-align: center;
}

.share-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 6px;
}

.share-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.share-button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 500;
}

.share-button.facebook {
  background-color: #1877f2;
}

.share-button.twitter {
  background-color: #1da1f2;
}

.share-button.instagram {
  background-color: #e1306c;
}

.share-button.pinterest {
  background-color: #bd081c;
}

.share-link {
  display: flex;
  margin-bottom: 20px;
}

.share-link input {
  flex: 1;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px 0 0 6px;
  font-size: 0.9rem;
}

.share-link button {
  padding: 10px 15px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
}

.modal-close {
  width: 100%;
  padding: 10px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

@media (max-width: 768px) {
  .gallery-controls {
    flex-direction: column;
  }

  .gallery-filters {
    width: 100%;
  }

  .gallery-filters select {
    flex: 1;
  }

  .share-options {
    grid-template-columns: 1fr;
  }
}
</style>