<template>
    <div class="community-page">
      <div class="container">
        <h1 class="page-title">Community Gallery</h1>
        <p class="page-subtitle">See what others are creating with our AI Editor and join the conversation</p>
  
        <!-- Featured Works Banner -->
        <section class="featured-section">
          <div class="featured-header">
            <h2>Featured Works</h2>
            <div class="featured-controls">
              <button @click="prevFeatured" class="control-button"><span>←</span></button>
              <button @click="nextFeatured" class="control-button"><span>→</span></button>
            </div>
          </div>
          
          <div class="featured-slider">
            <div class="featured-track" :style="{ transform: `translateX(-${currentFeaturedIndex * 100}%)` }">
              <div v-for="(item, index) in featuredWorks" :key="index" class="featured-item">
                <div class="featured-image">
                  <img :src="item.imageUrl" :alt="item.title">
                </div>
                <div class="featured-info">
                  <h3>{{ item.title }}</h3>
                  <p class="featured-description">{{ item.description }}</p>
                  <div class="featured-meta">
                    <div class="creator-info">
                      <img :src="item.creatorAvatar" alt="Creator" class="creator-avatar">
                      <span>by <strong>{{ item.creatorName }}</strong></span>
                    </div>
                    <div class="featured-stats">
                      <span class="stat"><i class="like-icon">❤️</i> {{ item.likes }}</span>
                      <span class="stat"><i class="comment-icon">💬</i> {{ item.comments }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Community Categories -->
        <section class="categories-section">
          <div class="category-tabs">
            <button 
              v-for="category in categories" 
              :key="category.id"
              class="category-tab"
              :class="{ active: activeCategory === category.id }"
              @click="setCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
          
          <div class="sort-filter">
            <div class="sort-options">
              <label for="sort-select">Sort by:</label>
              <select id="sort-select" v-model="currentSort">
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="trending">Trending</option>
              </select>
            </div>
            
            <div class="filter-options">
              <button 
                v-for="filter in filters" 
                :key="filter.id"
                class="filter-button"
                :class="{ active: activeFilters.includes(filter.id) }"
                @click="toggleFilter(filter.id)"
              >
                {{ filter.name }}
              </button>
            </div>
          </div>
        </section>
  
        <!-- Community Gallery Grid -->
        <section class="gallery-section">
          <div class="gallery-grid">
            <div v-for="(post, index) in filteredPosts" :key="index" class="gallery-item">
              <div class="gallery-image">
                <img :src="post.imageUrl" :alt="post.title">
                <div class="gallery-overlay">
                  <button class="view-button" @click="viewDetails(post)">View Details</button>
                </div>
              </div>
              <div class="gallery-info">
                <h3>{{ post.title }}</h3>
                <div class="creator-info">
                  <img :src="post.creatorAvatar" alt="Creator" class="creator-avatar-small">
                  <span>{{ post.creatorName }}</span>
                </div>
                <div class="gallery-stats">
                  <span class="stat-small"><i class="like-icon-small">❤️</i> {{ post.likes }}</span>
                  <span class="stat-small"><i class="comment-icon-small">💬</i> {{ post.comments }}</span>
                </div>
                <div class="gallery-tags">
                  <span v-for="(tag, tagIndex) in post.tags" :key="tagIndex" class="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="load-more">
            <button class="load-more-button" @click="loadMore">Load More</button>
          </div>
        </section>
  
        <!-- Join Community Section -->
        <section class="join-section">
          <div class="join-card">
            <div class="join-content">
              <h2>Join Our Creative Community</h2>
              <p>Connect with fellow creators, share your work, get feedback, and participate in challenges and events.</p>
              
              <div class="join-benefits">
                <div class="benefit-item">
                  <div class="benefit-icon">🎨</div>
                  <div class="benefit-info">
                    <h4>Showcase Your Work</h4>
                    <p>Share your creations and get recognized in our featured gallery</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <div class="benefit-icon">🏆</div>
                  <div class="benefit-info">
                    <h4>Participate in Challenges</h4>
                    <p>Join weekly creative challenges with prizes and recognition</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <div class="benefit-icon">💡</div>
                  <div class="benefit-info">
                    <h4>Learn & Improve</h4>
                    <p>Get constructive feedback and tips from experienced creators</p>
                  </div>
                </div>
              </div>
              
              <button class="join-button" @click="openJoinModal">Join Community</button>
            </div>
            <div class="join-image">
              <img src="https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp" alt="Community members">
            </div>
          </div>
        </section>
  
        <!-- Post Detail Modal -->
        <div v-if="selectedPost" class="modal-overlay" @click="closeModal">
          <div class="post-modal" @click.stop>
            <button class="close-modal" @click="closeModal">×</button>
            <div class="modal-content">
              <div class="modal-image">
                <img :src="selectedPost.imageUrl" :alt="selectedPost.title">
              </div>
              <div class="modal-info">
                <h2>{{ selectedPost.title }}</h2>
                <p class="modal-description">{{ selectedPost.description }}</p>
                
                <div class="modal-creator">
                  <img :src="selectedPost.creatorAvatar" alt="Creator" class="modal-avatar">
                  <div class="modal-creator-info">
                    <h4>{{ selectedPost.creatorName }}</h4>
                    <p>{{ selectedPost.creatorBio }}</p>
                  </div>
                </div>
                
                <div class="modal-stats">
                  <span class="modal-stat"><i class="like-icon">❤️</i> {{ selectedPost.likes }} Likes</span>
                  <span class="modal-stat"><i class="view-icon">👁️</i> {{ selectedPost.views }} Views</span>
                </div>
                
                <div class="modal-tools">
                  <h4>Created using:</h4>
                  <div class="tools-list">
                    <span v-for="(tool, toolIndex) in selectedPost.tools" :key="toolIndex" class="tool-tag">{{ tool }}</span>
                  </div>
                </div>
                
                <div class="modal-comments">
                  <h4>Comments ({{ selectedPost.commentsList ? selectedPost.commentsList.length : 0 }})</h4>
                  <div v-if="selectedPost.commentsList && selectedPost.commentsList.length > 0" class="comments-list">
                    <div v-for="(comment, commentIndex) in selectedPost.commentsList" :key="commentIndex" class="comment-item">
                      <img :src="comment.avatar" alt="Commenter" class="comment-avatar">
                      <div class="comment-content">
                        <div class="comment-header">
                          <h5>{{ comment.name }}</h5>
                          <span class="comment-date">{{ comment.date }}</span>
                        </div>
                        <p>{{ comment.text }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-comments">
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                  
                  <div class="add-comment">
                    <textarea v-model="newComment" placeholder="Add your comment..." rows="3"></textarea>
                    <button class="post-comment-button" @click="addComment" :disabled="!newComment">Post Comment</button>
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
  import { ref, computed } from 'vue';
  
  // State
  const currentFeaturedIndex = ref(0);
  const activeCategory = ref('all');
  const currentSort = ref('popular');
  const activeFilters = ref([]);
  const selectedPost = ref(null);
  const newComment = ref('');
  
  // Categories and Filters
  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'photo-editing', name: 'Photo Editing' },
    { id: 'artistic', name: 'Artistic' },
    { id: 'restoration', name: 'Restoration' },
    { id: 'creative', name: 'Creative' }
  ];
  
  const filters = [
    { id: 'portrait', name: 'Portrait' },
    { id: 'landscape', name: 'Landscape' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'minimalist', name: 'Minimalist' }
  ];
  
  // Sample Data
  const featuredWorks = [
    {
      title: "Dreamscape Horizons",
      description: "A surreal landscape created using the Artistic Style and Color Grading tools. This piece explores the boundary between reality and imagination.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Elena Michaels",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      likes: 423,
      comments: 56
    },
    {
      title: "Vintage Restoration",
      description: "This 1950s family photo was restored and enhanced using our AI restoration tools to bring new life to a cherished memory.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Marcus Johnson",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      likes: 385,
      comments: 42
    },
    {
      title: "Neon Portraits",
      description: "Experimenting with the AI lighting effects and color enhancement tools to create a cyberpunk-inspired portrait series.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Sophia Chen",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      likes: 512,
      comments: 78
    }
  ];
  
  const communityPosts = [
    {
      title: "Mountain Sunset Enhanced",
      description: "I used the AI enhancement tools to bring out the colors in this sunset shot and removed some distracting elements in the foreground.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Alex Rivera",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorBio: "Nature photographer and digital artist passionate about landscapes and wildlife.",
      likes: 286,
      comments: 32,
      views: 1245,
      tags: ["landscape", "nature", "enhancement"],
      category: "photo-editing",
      tools: ["Enhancement", "Background Removal", "Color Grading"],
      commentsList: [
        {
          name: "Lisa Jordan",
          avatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
          date: "2 days ago",
          text: "The colors in this are breathtaking! What settings did you use for the enhancement tool?"
        },
        {
          name: "David Kim",
          avatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
          date: "1 day ago",
          text: "Amazing work! I love how you maintained the natural feel while enhancing the colors."
        }
      ]
    },
    {
      title: "Vintage Portrait Colorized",
      description: "This is a colorized version of my grandmother's portrait from 1952. The AI colorization tool did an amazing job capturing realistic skin tones.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Maria Lopez",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorBio: "Digital archivist working to preserve family histories through restoration and enhancement.",
      likes: 352,
      comments: 47,
      views: 1678,
      tags: ["portrait", "restoration", "historical"],
      category: "restoration",
      tools: ["Colorize", "Restore", "Enhance Face"],
      commentsList: [
        {
          name: "Robert Chen",
          avatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
          date: "3 days ago",
          text: "This is incredible! The colors look so natural, it's hard to believe this was originally black and white."
        }
      ]
    },
    {
      title: "Abstract Mindscape",
      description: "An abstract piece created by combining multiple AI effects and artistic styles. It represents the complex layers of human consciousness.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Jordan Smith",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorBio: "Digital artist exploring the boundaries between technology and human creativity.",
      likes: 423,
      comments: 58,
      views: 2045,
      tags: ["abstract", "artistic", "experimental"],
      category: "artistic",
      tools: ["Artistic Style", "Color Effects", "Texture Generation"],
      commentsList: []
    },
    {
      title: "City Streets Transformed",
      description: "I transformed this ordinary street photo into a rainy night scene with dramatic lighting and reflections using the AI atmospheric effects.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Thomas Wright",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorBio: "Urban photographer and digital artist based in New York City.",
      likes: 314,
      comments: 38,
      views: 1532,
      tags: ["urban", "night", "atmospheric"],
      category: "creative",
      tools: ["Lighting Effects", "Weather Effects", "Color Grading"],
      commentsList: []
    },
    {
      title: "Portrait with Artistic Touch",
      description: "A portrait of my friend enhanced and stylized with a painterly effect that preserves realistic details while adding artistic flair.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Emma Davis",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorBio: "Portrait photographer experimenting with digital art techniques.",
      likes: 276,
      comments: 29,
      views: 1368,
      tags: ["portrait", "artistic", "painterly"],
      category: "artistic",
      tools: ["Enhance Face", "Artistic Style", "Detail Enhancement"],
      commentsList: []
    },
    {
      title: "Minimalist Landscape",
      description: "I used the AI tools to simplify this mountain scene, removing distractions and focusing on the essential elements and shapes.",
      imageUrl: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorName: "Liam Johnson",
      creatorAvatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      creatorBio: "Designer and photographer with a passion for minimalist compositions.",
      likes: 198,
      comments: 24,
      views: 1052,
      tags: ["landscape", "minimalist", "nature"],
      category: "photo-editing",
      tools: ["Simplify", "Color Harmonization", "Shape Enhancement"],
      commentsList: []
    }
  ];
  
  const communityEvents = [
    {
      title: "Photo Enhancement Challenge",
      description: "Join our weekly challenge focusing on bringing out the best in ordinary photos. Submit your before and after images for a chance to win prizes!",
      month: "APR",
      day: "15",
      time: "Submissions open for one week",
      location: "Online"
    },
    {
      title: "AI Art Techniques Webinar",
      description: "Learn advanced techniques for creating artistic effects using our AI tools. Special guest: Award-winning digital artist Maya Reynolds.",
      month: "APR",
      day: "22",
      time: "2:00 PM - 3:30 PM EST",
      location: "Zoom Webinar"
    },
    {
      title: "Portrait Editing Masterclass",
      description: "Discover professional tips and tricks for enhancing portraits while maintaining natural looks. From basic corrections to creative styles.",
      month: "MAY",
      day: "05",
      time: "1:00 PM - 2:30 PM EST",
      location: "YouTube Live"
    }
  ];
  
  // Computed properties
  const filteredPosts = computed(() => {
    let result = [...communityPosts];
    
    // Filter by category
    if (activeCategory.value !== 'all') {
      result = result.filter(post => post.category === activeCategory.value);
    }
    
    // Apply active filters
    if (activeFilters.value.length > 0) {
      result = result.filter(post => {
        return post.tags.some(tag => activeFilters.value.includes(tag));
      });
    }
    
    // Sort results
    switch (currentSort.value) {
      case 'popular':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'recent':
        // In a real app, you would sort by date
        result.sort((a, b) => b.views - a.views);
        break;
      case 'trending':
        // For example, trending could be a combination of recent + engagement
        result.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
        break;
    }
    
    return result;
  });
  
  // Methods
  const nextFeatured = () => {
    if (currentFeaturedIndex.value < featuredWorks.length - 1) {
      currentFeaturedIndex.value++;
    } else {
      currentFeaturedIndex.value = 0;
    }
  };
  
  const prevFeatured = () => {
    if (currentFeaturedIndex.value > 0) {
      currentFeaturedIndex.value--;
    } else {
      currentFeaturedIndex.value = featuredWorks.length - 1;
    }
  };
  
  const setCategory = (categoryId) => {
    activeCategory.value = categoryId;
  };
  
  const toggleFilter = (filterId) => {
    const index = activeFilters.value.indexOf(filterId);
    if (index === -1) {
      activeFilters.value.push(filterId);
    } else {
      activeFilters.value.splice(index, 1);
    }
  };
  
  const viewDetails = (post) => {
    selectedPost.value = post;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const closeModal = () => {
    selectedPost.value = null;
    document.body.style.overflow = ''; // Restore scrolling
  };
  
  const addComment = () => {
    if (!newComment.value.trim()) return;
    
    if (!selectedPost.value.commentsList) {
      selectedPost.value.commentsList = [];
    }
    
    selectedPost.value.commentsList.push({
      name: "You", // In a real app, this would be the logged-in user
      avatar: "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp",
      date: "Just now",
      text: newComment.value
    });
    
    // Update comment count
    selectedPost.value.comments = selectedPost.value.commentsList.length;
    
    newComment.value = '';
  };
  
  const loadMore = () => {
    // In a real app, this would load more posts from the server
    alert('In a production app, this would load more community posts.');
  };
  
  const registerEvent = (event) => {
    // In a real app, this would open a registration form or page
    alert(`Registration for "${event.title}" would open here.`);
  };
  
  const openJoinModal = () => {
    // In a real app, this would open a registration/login modal
    alert('This would open a community registration or login form.');
  };
  </script>
  
  <style scoped>
  /* Community Page Styles */
  .community-page {
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
    margin-bottom: 40px;
    font-size: 1.2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 20px;
  }
  
  /* Featured Section */
  .featured-section {
    background-color: white;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(229, 231, 235, 0.8);
    padding: 30px;
    margin-bottom: 40px;
    overflow: hidden;
  }
  
  .featured-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .featured-header h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
  
  .featured-controls {
    display: flex;
    gap: 10px;
  }
  
  .control-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .control-button:hover {
    background-color: #e2e8f0;
  }
  
  .featured-slider {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
  }
  
  .featured-track {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .featured-item {
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .featured-image {
    width: 100%;
    height: 400px;
    overflow: hidden;
  }
  
  .featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .featured-info {
    padding: 24px;
    background-color: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }
  
  .featured-info h3 {
    margin: 0 0 10px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  .featured-description {
    color: #475569;
    margin-bottom: 16px;
    line-height: 1.6;
  }
  
  .featured-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .creator-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .creator-avatar {
    width: 36px;
    height: 36px;
}

.creator-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.featured-stats {
  display: flex;
  gap: 16px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
}

/* Categories Section */
.categories-section {
  margin-bottom: 30px;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category-tab {
  padding: 10px 20px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  font-size: 0.95rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.category-tab.active {
  background-color: #6366f1;
  color: white;
  border-color: #4f46e5;
}

.category-tab:hover:not(.active) {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.sort-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-options label {
  color: #64748b;
  font-weight: 500;
}

.sort-options select {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: #1e293b;
  font-size: 0.95rem;
  cursor: pointer;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-button {
  padding: 6px 14px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button.active {
  background-color: #f0f9ff;
  color: #0284c7;
  border-color: #bae6fd;
}

.filter-button:hover:not(.active) {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

/* Gallery Section */
.gallery-section {
  margin-bottom: 60px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.gallery-item {
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-image img {
  transform: scale(1.05);
}

.gallery-overlay {
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

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.view-button {
  padding: 10px 20px;
  background-color: white;
  color: #1e293b;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-button:hover {
  background-color: #f8fafc;
  transform: scale(1.05);
}

.gallery-info {
  padding: 16px;
}

.gallery-info h3 {
  margin: 0 0 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.creator-avatar-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.creator-info span {
  font-size: 0.9rem;
  color: #64748b;
}

.gallery-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}

.stat-small {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #64748b;
  font-size: 0.85rem;
}

.gallery-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tag {
  padding: 4px 10px;
  background-color: #f1f5f9;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #475569;
}

.load-more {
  text-align: center;
}

.load-more-button {
  padding: 12px 30px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more-button:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Events Section */
.events-section {
  margin-bottom: 60px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.event-card {
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.event-date {
  min-width: 80px;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px 0;
}

.event-month {
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.event-day {
  font-size: 1.8rem;
  font-weight: 700;
}

.event-details {
  padding: 20px;
  flex: 1;
}

.event-details h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.event-description {
  color: #475569;
  margin-bottom: 16px;
  line-height: 1.5;
  font-size: 0.95rem;
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.event-time,
.event-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.9rem;
}

.register-button {
  padding: 8px 16px;
  background-color: #f8fafc;
  color: #6366f1;
  border: 1px solid #e0e7ff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.register-button:hover {
  background-color: #e0e7ff;
  color: #4f46e5;
}

/* Join Section */
.join-section {
  margin-bottom: 60px;
}

.join-card {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 24px;
  display: grid;
  grid-template-columns: 1fr 400px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.join-content {
  padding: 40px;
}

.join-content h2 {
  margin: 0 0 16px;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
}

.join-content p {
  color: #475569;
  margin-bottom: 24px;
  line-height: 1.6;
}

.join-benefits {
  margin-bottom: 30px;
}

.benefit-item {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.benefit-icon {
  width: 44px;
  height: 44px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.benefit-info h4 {
  margin: 0 0 6px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.benefit-info p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
}

.join-button {
  padding: 14px 28px;
  background: linear-gradient(to right, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.join-button:hover {
  background: linear-gradient(to right, #4f46e5, #4338ca);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

.join-image {
  height: 100%;
  overflow: hidden;
}

.join-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Post Detail Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.post-modal {
  background-color: white;
  border-radius: 16px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #475569;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
}

.close-modal:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: 90vh;
}

.modal-image {
  height: 90vh;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  padding: 30px;
  overflow-y: auto;
}

.modal-info h2 {
  margin: 0 0 16px;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e293b;
}

.modal-description {
  color: #475569;
  margin-bottom: 24px;
  line-height: 1.6;
}

.modal-creator {
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 12px;
  margin-bottom: 24px;
}

.modal-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.modal-creator-info h4 {
  margin: 0 0 6px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.modal-creator-info p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
}

.modal-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.modal-stat {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.95rem;
}

.modal-tools {
  margin-bottom: 24px;
}

.modal-tools h4 {
  margin: 0 0 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tool-tag {
  padding: 6px 14px;
  background-color: #f1f5f9;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #475569;
}

.modal-comments h4 {
  margin: 0 0 16px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.comments-list {
  margin-bottom: 24px;
}

.comment-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.comment-header h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
}

.comment-date {
  font-size: 0.85rem;
  color: #94a3b8;
}

.comment-content p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
}

.no-comments {
  background-color: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.no-comments p {
  margin: 0;
  color: #64748b;
  text-align: center;
  font-size: 0.95rem;
}

.add-comment textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  resize: vertical;
  font-family: inherit;
}

.add-comment textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.post-comment-button {
  padding: 10px 20px;
  background: linear-gradient(to right, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
}

.post-comment-button:hover {
  background: linear-gradient(to right, #4f46e5, #4338ca);
}

.post-comment-button:disabled {
  background: linear-gradient(to right, #94a3b8, #cbd5e1);
  cursor: not-allowed;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .join-card {
    grid-template-columns: 1fr;
  }
  
  .join-image {
    display: none;
  }
  
  .modal-content {
    grid-template-columns: 1fr;
  }
  
  .modal-image {
    height: 50vh;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .featured-image {
    height: 300px;
  }
  
  .sort-filter {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .featured-image {
    height: 220px;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>