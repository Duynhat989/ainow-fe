<template>
  <div class="home-page">
    <!-- Banner Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>Chỉnh Sửa Ảnh Thông Minh Với Sức Mạnh AI</h1>
          <p>Biến đổi ảnh của bạn chỉ trong vài giây với công nghệ trí tuệ nhân tạo tiên tiến</p>
          <div class="hero-buttons">
            <RouterLink to="/editor" class="btn btn-primary">Dùng thử Ngay</RouterLink>
            <RouterLink to="/pricing" class="btn btn-secondary">Nâng cấp Pro</RouterLink>
          </div>
        </div>
        <div class="hero-image">
          <img
            src="https://www.simplexitypd.com/wp-content/uploads/2024/05/AI-Tools-to-Boost-Engineering-Productivity-BNR.jpg"
            alt="AI Image Editor Demo" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section features-section">
      <div class="container">
        <h2 class="section-title">Tính Năng Nổi Bật</h2>
        <div class="features-grid three-columns">
          <div class="feature-card">
            <div class="feature-image">
              <img src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Xóa Phông Tự Động" />
              <div class="feature-overlay">
                <span>Trước & Sau</span>
              </div>
            </div>
            <h3>Xóa Phông Tự Động</h3>
            <p>Xóa hoặc thay đổi phông nền chỉ với một cú nhấp chuột</p>
          </div>
          <div class="feature-card">
            <div class="feature-image">
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Làm Đẹp Khuôn Mặt" />
              <div class="feature-overlay">
                <span>Trước & Sau</span>
              </div>
            </div>
            <h3>Làm Đẹp Khuôn Mặt</h3>
            <p>Tự động làm mịn da, xóa khuyết điểm và tăng cường đường nét</p>
          </div>
          <div class="feature-card">
            <div class="feature-image">
              <img src="https://images.unsplash.com/photo-1596003906949-67221c37965c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Phục Hồi Ảnh Cũ" />
              <div class="feature-overlay">
                <span>Trước & Sau</span>
              </div>
            </div>
            <h3>Phục Hồi Ảnh Cũ</h3>
            <p>Khôi phục ảnh cũ, hư hỏng với công nghệ AI tiên tiến</p>
          </div>
          <div class="feature-card">
            <div class="feature-image">
              <img src="https://images.unsplash.com/photo-1607968565043-36af90dde238?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Chỉnh Sửa Bằng Văn Bản" />
              <div class="feature-overlay">
                <span>Trước & Sau</span>
              </div>
            </div>
            <h3>Chỉnh Sửa Bằng Văn Bản</h3>
            <p>Chỉ cần mô tả những gì bạn muốn, AI sẽ thực hiện</p>
          </div>
          <div class="feature-card">
            <div class="feature-image">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Tạo Ảnh AI" />
              <div class="feature-overlay">
                <span>Trước & Sau</span>
              </div>
            </div>
            <h3>Tạo Ảnh AI</h3>
            <p>Tạo ra hình ảnh hoàn toàn mới từ mô tả văn bản của bạn</p>
          </div>
          <div class="feature-card">
            <div class="feature-image">
              <img src="https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Tăng Độ Phân Giải" />
              <div class="feature-overlay">
                <span>Trước & Sau</span>
              </div>
            </div>
            <h3>Tăng Độ Phân Giải</h3>
            <p>Biến ảnh độ phân giải thấp thành hình ảnh sắc nét chi tiết</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Before/After Examples -->
    <section class="section examples-section">
      <div class="container">
        <h2 class="section-title">Trước & Sau Khi Chỉnh Sửa</h2>
        <p class="section-subtitle">Xem sự khác biệt rõ rệt mà công nghệ AI của chúng tôi mang lại</p>
        
        <div class="examples-slider">
          <div class="examples-grid">
            <div class="example-item">
              <div class="example-title">Xóa phông nền chuyên nghiệp</div>
              <div class="example-comparison">
                <div class="example-before">
                  <img src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80" alt="Before editing" />
                  <span>Trước</span>
                </div>
                <div class="example-divider">
                  <div class="divider-line"></div>
                  <div class="divider-arrow">→</div>
                  <div class="divider-line"></div>
                </div>
                <div class="example-after">
                  <img src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80&blend=FFFFFF&blend-alpha=90&blend-mode=normal&blend-w=1000&blend-h=1000" alt="After editing" />
                  <span>Sau</span>
                </div>
              </div>
            </div>
            
            <div class="example-item">
              <div class="example-title">Nâng cao chất lượng ảnh cũ</div>
              <div class="example-comparison">
                <div class="example-before">
                  <img src="https://images.unsplash.com/photo-1577643816920-65b43ba99fba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=30&sat=-100&blur=8" alt="Before editing" />
                  <span>Trước</span>
                </div>
                <div class="example-divider">
                  <div class="divider-line"></div>
                  <div class="divider-arrow">→</div>
                  <div class="divider-line"></div>
                </div>
                <div class="example-after">
                  <img src="https://images.unsplash.com/photo-1577643816920-65b43ba99fba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80" alt="After editing" />
                  <span>Sau</span>
                </div>
              </div>
            </div>
            
            <div class="example-item">
              <div class="example-title">Tối ưu hóa màu sắc và ánh sáng</div>
              <div class="example-comparison">
                <div class="example-before">
                  <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80&sat=-50&brightness=-20" alt="Before editing" />
                  <span>Trước</span>
                </div>
                <div class="example-divider">
                  <div class="divider-line"></div>
                  <div class="divider-arrow">→</div>
                  <div class="divider-line"></div>
                </div>
                <div class="example-after">
                  <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80&sat=30&con=20" alt="After editing" />
                  <span>Sau</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="slider-controls">
            <button class="slider-arrow slider-prev" @click="prevSlide">❮</button>
            <div class="slider-dots">
              <span class="dot" :class="{ active: currentSlide === 0 }" @click="setSlide(0)"></span>
              <span class="dot" :class="{ active: currentSlide === 1 }" @click="setSlide(1)"></span>
              <span class="dot" :class="{ active: currentSlide === 2 }" @click="setSlide(2)"></span>
            </div>
            <button class="slider-arrow slider-next" @click="nextSlide">❯</button>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="section how-it-works-section">
      <div class="container">
        <h2 class="section-title">Cách Hoạt Động</h2>
        <p class="section-subtitle">Quy trình đơn giản, kết quả chuyên nghiệp</p>
        
        <div class="steps-container">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-image">
              <img src="https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Tải Ảnh Lên" />
            </div>
            <h3>Tải Ảnh Lên</h3>
            <p>Tải lên ảnh của bạn hoặc chọn từ thư viện có sẵn</p>
          </div>
          <div class="step-connector"></div>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-image">
              <img src="https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Chọn Công Cụ AI" />
            </div>
            <h3>Chọn Công Cụ AI</h3>
            <p>Lựa chọn từ nhiều công cụ chỉnh sửa thông minh</p>
          </div>
          <div class="step-connector"></div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-image">
              <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Tùy Chỉnh" />
            </div>
            <h3>Tùy Chỉnh</h3>
            <p>Điều chỉnh các tham số hoặc mô tả bằng văn bản</p>
          </div>
          <div class="step-connector"></div>
          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-image">
              <img src="https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Lưu & Chia Sẻ" />
            </div>
            <h3>Lưu & Chia Sẻ</h3>
            <p>Tải xuống, lưu trữ hoặc chia sẻ ảnh đã chỉnh sửa</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Gallery Section -->
    <section class="section gallery-section">
      <div class="container">
        <h2 class="section-title">Thư Viện Ảnh Mẫu</h2>
        <p class="section-subtitle">Khám phá những gì AI của chúng tôi có thể làm</p>
        
        <div class="gallery-grid">
          <div class="gallery-item" v-for="(image, index) in galleryImages" :key="index">
            <img :src="image" :alt="`Gallery image ${index + 1}`" />
            <div class="gallery-overlay">
              <div class="gallery-caption">Chỉnh sửa bằng AI</div>
            </div>
          </div>
        </div>
        
        <div class="gallery-cta">
          <RouterLink to="/gallery" class="btn btn-outline">Xem thêm ảnh mẫu</RouterLink>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">5M+</div>
            <div class="stat-label">Ảnh Đã Chỉnh Sửa</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">500K+</div>
            <div class="stat-label">Người Dùng</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Công Cụ AI</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">4.9/5</div>
            <div class="stat-label">Đánh Giá Trung Bình</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section testimonials-section">
      <div class="container">
        <h2 class="section-title">Khách Hàng Nói Gì</h2>
        <p class="section-subtitle">Trải nghiệm từ người dùng thực tế</p>
        
        <div class="testimonials-slider">
          <div class="testimonials-grid">
            <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
              <div class="testimonial-rating">★★★★★</div>
              <div class="testimonial-content">
                <p>{{ testimonial.content }}</p>
              </div>
              <div class="testimonial-author">
                <img :src="testimonial.avatar" :alt="testimonial.name" />
                <div>
                  <h4>{{ testimonial.name }}</h4>
                  <p>{{ testimonial.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section faq-section">
      <div class="container">
        <h2 class="section-title">Câu Hỏi Thường Gặp</h2>
        <div class="faq-list">
          <div class="faq-item" :class="{ active: activeIndex === index }" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ faq.question }}</h3>
              <span class="faq-toggle">{{ activeIndex === index ? '-' : '+' }}</span>
            </div>
            <div class="faq-answer" :style="{ display: activeIndex === index ? 'block' : 'none' }">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Sẵn Sàng Biến Đổi Ảnh Của Bạn?</h2>
          <p>Bắt đầu chỉnh sửa ảnh với AI ngay hôm nay - miễn phí!</p>
          <RouterLink to="/editor" class="btn btn-primary">Bắt Đầu Ngay</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

// Active FAQ item tracking
const activeIndex = ref(null);

// Toggle FAQ function
const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

// Slider functionality
const currentSlide = ref(0);
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % 3;
};
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + 3) % 3;
};
const setSlide = (index) => {
  currentSlide.value = index;
};

// Gallery images
const galleryImages = [
  'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80',
  'https://images.unsplash.com/photo-1600428577438-a776b8d9b594?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80',
  'https://images.unsplash.com/photo-1600428577161-e1b53a4c96ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80',
  'https://images.unsplash.com/photo-1600428577305-e7ff81c18078?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80',
  'https://images.unsplash.com/photo-1600428577022-a39f3a6a4d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80',
  'https://images.unsplash.com/photo-1600428577346-44e9f0805cd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80',
];

// Testimonials data
const testimonials = [
  {
    content: "Công cụ này đã giúp tôi tiết kiệm rất nhiều thời gian. Tôi không cần phải thuê nhà thiết kế đồ họa nữa, AI làm mọi thứ cho tôi!",
    name: "Nguyễn Văn A",
    title: "Chủ cửa hàng trực tuyến",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    content: "Tôi đã thử nhiều công cụ chỉnh sửa ảnh khác nhau, nhưng đây là công cụ tốt nhất. Giao diện dễ sử dụng và kết quả thật đáng kinh ngạc.",
    name: "Trần Thị B",
    title: "Nhiếp ảnh gia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    content: "Tính năng xóa phông nền tự động hoạt động hoàn hảo. Tôi đã sử dụng nó cho tất cả sản phẩm trong cửa hàng trực tuyến của mình.",
    name: "Lê Văn C",
    title: "Marketer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
  }
];

// FAQ data
const faqs = [
  {
    question: "Tôi có cần kỹ năng chỉnh sửa ảnh không?",
    answer: "Không, bạn không cần bất kỳ kỹ năng chỉnh sửa ảnh nào. Công cụ của chúng tôi được thiết kế để mọi người đều có thể sử dụng, với giao diện trực quan và các công cụ AI tự động."
  },
  {
    question: "Ảnh của tôi có an toàn không?",
    answer: "Có, chúng tôi coi trọng quyền riêng tư của bạn. Tất cả các ảnh tải lên đều được mã hóa và không bao giờ được sử dụng cho bất kỳ mục đích nào khác. Bạn có thể xóa ảnh của mình bất cứ lúc nào."
  },
  {
    question: "Tôi có thể sử dụng ảnh cho mục đích thương mại không?",
    answer: "Có, tất cả các ảnh bạn chỉnh sửa đều thuộc về bạn và có thể được sử dụng cho mục đích cá nhân hoặc thương mại. Tuy nhiên, nếu bạn sử dụng AI để tạo ảnh mới, vui lòng kiểm tra các điều khoản sử dụng cụ thể."
  },
  {
    question: "Tôi có thể hủy đăng ký bất cứ lúc nào không?",
    answer: "Có, bạn có thể hủy đăng ký bất kỳ lúc nào. Không có hợp đồng ràng buộc và không có phí hủy. Bạn sẽ tiếp tục có quyền truy cập vào các tính năng gói cho đến khi kết thúc chu kỳ thanh toán hiện tại."
  },
  {
    question: "Các định dạng ảnh nào được hỗ trợ?",
    answer: "Chúng tôi hỗ trợ tất cả các định dạng ảnh phổ biến như JPG, PNG, WEBP, HEIC, và nhiều định dạng khác. Bạn có thể xuất ảnh sang nhiều định dạng khác nhau tùy thuộc vào nhu cầu của mình."
  }
];
</script>

<style scoped>
/* Import font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Base styling */
.home-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1f2937;
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 25px rgba(124, 58, 237, 0.3);
  background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%);
}

.btn-secondary {
  background-color: white;
  color: #4f46e5;
  border: 1px solid #e5e7eb;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background-color: #f9fafb;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.btn-outline {
  background-color: transparent;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  padding: 12px 26px;
}

.btn-outline:hover {
  background-color: rgba(79, 70, 229, 0.05);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.1);
}

/* Section styling */
.section {
  padding: 100px 0;
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #111827;
  line-height: 1.2;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 60px;
  color: #6b7280;
}

/* Hero Section */
.hero-section {
  padding: 120px 0 100px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237c3aed' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
}

.hero-section .container {
  display: flex;
  align-items: center;
  gap: 60px;
  position: relative;
  z-index: 1;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.hero-image img {
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  max-width: 100%;
  height: auto;
}

.hero-image:hover img {
  transform: scale(1.03) rotate(1deg);
}

.hero-image::before {
  content: '';
  position: absolute;
  inset: 20px;
  border: 2px dashed rgba(124, 58, 237, 0.2);
  border-radius: 24px;
  z-index: -1;
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.3;
    transform: scale(0.95);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }

  100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
}

.hero-content h1 {
  line-height: 1.1;
  margin-bottom: 24px;
  color: #111827;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1e293b 0%, #4338ca 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-content p {
  font-size: 1.35rem;
  color: #4b5563;
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 16px;
}

/* Features Section */
.features-section {
  background-color: white;
  position: relative;
}

.features-grid {
  display: grid;
  gap: 30px;
  margin-top: 60px;
}

.features-grid.three-columns {
  grid-template-columns: repeat(3, 1fr);
}

.feature-card {
  background-color: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  text-align: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border: 1px solid rgba(229, 231, 235, 0.7);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  border-color: rgba(124, 58, 237, 0.2);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-image {
  margin-bottom: 24px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.feature-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.feature-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(79, 70, 229, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-overlay {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover .feature-image img {
  transform: scale(1.1);
}

.feature-card h3 {
  margin-bottom: 12px;
  color: #1f2937;
  font-size: 1.35rem;
  font-weight: 700;
}

.feature-card p {
  color: #6b7280;
  font-size: 1.05rem;
  line-height: 1.6;
}

/* Examples Section */
.examples-section {
  background-color: white;
  position: relative;
}

.examples-slider {
  position: relative;
  margin-top: 50px;
}

.examples-grid {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.example-item {
  position: relative;
}

.example-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #4f46e5;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.example-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.example-before,
.example-after {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  flex: 1;
  max-width: 500px;
}

.example-before:hover,
.example-after:hover {
  transform: scale(1.05);
}

.example-before img,
.example-after img {
  display: block;
  width: 100%;
  height: auto;
  transition: filter 0.3s ease;
}

.example-before span,
.example-after span {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.example-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.divider-line {
  width: 2px;
  height: 50px;
  background-color: #e5e7eb;
}

.divider-arrow {
  font-size: 2rem;
  color: #6d28d9;
  animation: pulse-arrow 2s infinite ease-in-out;
}

@keyframes pulse-arrow {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}

.slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  gap: 20px;
}

.slider-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.slider-arrow:hover {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(79, 70, 229, 0.2);
}

.slider-dots {
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot.active {
  background-color: #4f46e5;
  transform: scale(1.2);
}

.dot:hover {
  background-color: #6d28d9;
}

/* How It Works Section */
.how-it-works-section {
  background: linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%);
  position: relative;
  overflow: hidden;
}

.steps-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 60px;
  flex-wrap: wrap;
}

.step-item {
  flex: 1;
  min-width: 200px;
  text-align: center;
  padding: 0 15px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-number {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 20px;
  box-shadow: 0 10px 15px rgba(124, 58, 237, 0.2);
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.step-image {
  margin-bottom: 24px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  width: 100%;
}

.step-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.step-item:hover .step-image img {
  transform: scale(1.1);
}

.step-item h3 {
  margin-bottom: 12px;
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 700;
}

.step-item p {
  color: #6b7280;
  font-size: 1.05rem;
}

.step-connector {
  flex: 0 0 30px;
  height: 2px;
  background-color: #d1d5db;
  margin-top: 132px;
  position: relative;
}

.step-connector::before {
  content: '';
  position: absolute;
  top: -4px;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #6d28d9;
}

/* Gallery Section */
.gallery-section {
  background-color: white;
  position: relative;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 50px;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
  transform: translateY(0);
}

.gallery-caption {
  font-size: 1.1rem;
  font-weight: 600;
}

.gallery-cta {
  text-align: center;
  margin-top: 50px;
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 40px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.stat-item {
  padding: 20px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-10px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(to right, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.stat-label {
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.9;
}

/* Testimonials Section */
.testimonials-section {
  background-color: white;
  position: relative;
}

.testimonials-slider {
  margin-top: 60px;
  position: relative;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f3f4f6;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(124, 58, 237, 0.2);
}

.testimonial-rating {
  margin-bottom: 20px;
  color: #f59e0b;
  font-size: 1.1rem;
  letter-spacing: 2px;
}

.testimonial-content {
  margin-bottom: 25px;
  flex-grow: 1;
}

.testimonial-content p {
  font-style: italic;
  color: #4b5563;
  font-size: 1.05rem;
  line-height: 1.7;
  position: relative;
}

.testimonial-content p::before,
.testimonial-content p::after {
  content: '"';
  font-size: 1.5em;
  color: #e5e7eb;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: auto;
}

.testimonial-author img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f3f4f6;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
}

.testimonial-author h4 {
  margin-bottom: 5px;
  color: #1f2937;
  font-weight: 600;
  font-size: 1.1rem;
}

.testimonial-author p {
  color: #6b7280;
  font-size: 0.95rem;
}

/* FAQ Section */
.faq-section {
  background-color: #f9fafb;
  position: relative;
}

.faq-list {
  max-width: 900px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;
}

.faq-item:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-color: #e5e7eb;
  transform: translateY(-2px);
}

.faq-question {
  padding: 24px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.faq-question:hover {
  background-color: #f9fafb;
}

.faq-question h3 {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.faq-toggle {
  font-size: 1.5rem;
  color: #6b7280;
  transition: all 0.3s ease;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f3f4f6;
}

.faq-question:hover .faq-toggle {
  background-color: #4f46e5;
  color: white;
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 30px 24px;
  color: #6b7280;
  font-size: 1.05rem;
  line-height: 1.7;
}

.faq-item.active .faq-answer {
  animation: fadeDown 0.3s ease forwards;
}

.faq-item.active .faq-toggle {
  transform: rotate(45deg);
  background-color: #4f46e5;
  color: white;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  text-align: center;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  z-index: 0;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: white;
}

.cta-content .btn {
  background-color: white;
  color: #4f46e5;
  font-size: 1.15rem;
  padding: 16px 36px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  border: none;
}

.cta-content .btn:hover {
  background-color: #f9fafb;
  transform: translateY(-5px);
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
}

/* Media queries for responsiveness */
@media (max-width: 1200px) {
  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-content p {
    font-size: 1.2rem;
  }

  .feature-card {
    padding: 30px 25px;
  }

  .step-item {
    padding: 0 10px;
  }

  .cta-content h2 {
    font-size: 2.5rem;
  }
}

@media (max-width: 992px) {
  .section {
    padding: 80px 0;
  }

  .hero-section {
    padding: 100px 0 80px;
  }

  .hero-section .container {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    margin-bottom: 50px;
  }

  .hero-buttons {
    justify-content: center;
  }

  .features-grid.three-columns {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps-container {
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }

  .step-connector {
    width: 2px;
    height: 30px;
    margin-top: 0;
  }

  .step-connector::before {
    top: auto;
    bottom: 0;
    right: auto;
    left: -4px;
  }

  .example-comparison {
    flex-direction: column;
  }

  .example-divider {
    flex-direction: row;
    margin: 20px 0;
  }

  .divider-line {
    width: 50px;
    height: 2px;
  }

  .divider-arrow {
    transform: rotate(90deg);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-content p {
    font-size: 1.1rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .features-grid.three-columns {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 20px;
  }

  .section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .feature-image img {
    height: 160px;
  }

  .step-image img {
    height: 150px;
  }

  .faq-question {
    padding: 20px;
  }

  .faq-question h3 {
    font-size: 1.05rem;
    line-height: 1.4;
  }

  .faq-answer {
    padding: 0 20px 20px;
  }

  .slider-arrow {
    width: 40px;
    height: 40px;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .cta-content p {
    font-size: 1.1rem;
  }

  .cta-content .btn {
    padding: 14px 28px;
    font-size: 1rem;
  }
}

/* Add smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Adding hover effects to buttons */
.btn {
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }

  100% {
    transform: scale(100, 100);
    opacity: 0;
  }
}
</style>