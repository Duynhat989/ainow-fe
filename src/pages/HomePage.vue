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
            src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600"
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
            <div class="feature-icon">🖼️</div>
            <h3>Xóa Phông Tự Động</h3>
            <p>Xóa hoặc thay đổi phông nền chỉ với một cú nhấp chuột</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">✨</div>
            <h3>Làm Đẹp Khuôn Mặt</h3>
            <p>Tự động làm mịn da, xóa khuyết điểm và tăng cường đường nét</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>Phục Hồi Ảnh Cũ</h3>
            <p>Khôi phục ảnh cũ, hư hỏng với công nghệ AI tiên tiến</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💬</div>
            <h3>Chỉnh Sửa Bằng Văn Bản</h3>
            <p>Chỉ cần mô tả những gì bạn muốn, AI sẽ thực hiện</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Tạo Ảnh AI</h3>
            <p>Tạo ra hình ảnh hoàn toàn mới từ mô tả văn bản của bạn</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Tăng Độ Phân Giải</h3>
            <p>Biến ảnh độ phân giải thấp thành hình ảnh sắc nét chi tiết</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Plans & Pricing Section -->
    <section class="section pricing-section">
      <div class="container">
        <h2 class="section-title">Các Gói Dịch Vụ</h2>
        <p class="section-subtitle">Lựa chọn gói phù hợp với nhu cầu chỉnh sửa ảnh của bạn</p>

        <div class="pricing-grid two-columns">
          <!-- Base Plan -->
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>Cơ Bản</h3>
              <div class="pricing-price">
                <span class="price">0₫</span>
                <span class="period">mãi mãi</span>
              </div>
            </div>
            <div class="pricing-features">
              <ul>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Truy cập các công cụ AI cơ bản</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>100 lượt chỉnh sửa/tháng</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Lưu trữ đám mây 1GB</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Xuất ảnh độ phân giải tiêu chuẩn</span>
                </li>
                <li class="feature-disabled">
                  <span class="feature-cross">×</span>
                  <span>Có logo watermark trên ảnh</span>
                </li>
              </ul>
            </div>
            <div class="pricing-action">
              <!-- <RouterLink to="/signup" class="btn btn-outline">Đăng Ký Miễn Phí</RouterLink> -->
            </div>
          </div>

          <!-- Pro Plan -->
          <div class="pricing-card popular">
            <div class="popular-badge">Phổ biến</div>
            <div class="pricing-header">
              <h3>Pro</h3>
              <div class="pricing-price">
                <span class="price">199.000₫</span>
                <span class="period">mỗi tháng</span>
              </div>
            </div>
            <div class="pricing-features">
              <ul>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Truy cập tất cả công cụ AI</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Không giới hạn lượt chỉnh sửa</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Lưu trữ đám mây không giới hạn</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Xuất ảnh độ phân giải cao</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Không có watermark</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Ưu tiên xử lý</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Tải xuống hàng loạt</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Truy cập ứng dụng di động Pro</span>
                </li>
              </ul>
            </div>
            <div class="pricing-action">
              <RouterLink to="/payment" class="btn btn-primary">Dùng Thử 7 Ngày</RouterLink>
            </div>
          </div>
        </div>

        <div class="pricing-note">
          <p>Tất cả các gói đều bao gồm hỗ trợ kỹ thuật và cập nhật thường xuyên. Để biết thêm về các gói doanh nghiệp
            tùy chỉnh, <a href="/contact">liên hệ với chúng tôi</a>.</p>
        </div>
      </div>
    </section>

    <!-- Before/After Examples -->
    <section class="section examples-section">
      <div class="container">
        <h2 class="section-title">Trước & Sau Khi Chỉnh Sửa</h2>
        <div class="examples-grid">
          <div class="example-item">
            <div class="example-title">Xóa phông nền tự động</div>
            <div class="example-before">
              <img :src="car_befor" alt="Before editing" />
              <span>Trước</span>
            </div>
            <div class="example-arrow">→</div>
            <div class="example-after">
              <img :src="car_after" alt="After editing" />
              <span>Sau</span>
            </div>
          </div>
          <div class="example-item">
            <div class="example-title">Phục hồi ảnh cũ hư hỏng</div>
            <div class="example-before">
              <img :src="car_after" alt="Before editing" />
              <span>Trước</span>
            </div>
            <div class="example-arrow">→</div>
            <div class="example-after">
              <img :src="car_after" alt="After editing" />
              <span>Sau</span>
            </div>
          </div>
          <div class="example-item">
            <div class="example-title">Làm đẹp khuôn mặt tự động</div>
            <div class="example-before">
              <img :src="car_after" alt="Before editing" />
              <span>Trước</span>
            </div>
            <div class="example-arrow">→</div>
            <div class="example-after">
              <img :src="car_after" alt="After editing" />
              <span>Sau</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="section how-it-works-section">
      <div class="container">
        <h2 class="section-title">Cách Hoạt Động</h2>
        <div class="steps-container">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-icon">📤</div>
            <h3>Tải Ảnh Lên</h3>
            <p>Tải lên ảnh của bạn hoặc chọn từ thư viện có sẵn</p>
          </div>
          <div class="step-connector"></div>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-icon">🤖</div>
            <h3>Chọn Công Cụ AI</h3>
            <p>Lựa chọn từ nhiều công cụ chỉnh sửa thông minh</p>
          </div>
          <div class="step-connector"></div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-icon">✏️</div>
            <h3>Tùy Chỉnh</h3>
            <p>Điều chỉnh các tham số hoặc mô tả bằng văn bản</p>
          </div>
          <div class="step-connector"></div>
          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-icon">💾</div>
            <h3>Lưu & Chia Sẻ</h3>
            <p>Tải xuống, lưu trữ hoặc chia sẻ ảnh đã chỉnh sửa</p>
          </div>
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

    <!-- FAQ Section -->
    <section class="section faq-section">
      <div class="container">
        <h2 class="section-title">Câu Hỏi Thường Gặp</h2>
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              <h3>Tôi có cần kỹ năng chỉnh sửa ảnh không?</h3>
              <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
              <p>Không, bạn không cần bất kỳ kỹ năng chỉnh sửa ảnh nào. Công cụ của chúng tôi được thiết kế để mọi người
                đều có thể sử dụng, với giao diện trực quan và các công cụ AI tự động.</p>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <h3>Ảnh của tôi có an toàn không?</h3>
              <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
              <p>Có, chúng tôi coi trọng quyền riêng tư của bạn. Tất cả các ảnh tải lên đều được mã hóa và không bao giờ
                được sử dụng cho bất kỳ mục đích nào khác. Bạn có thể xóa ảnh của mình bất cứ lúc nào.</p>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <h3>Tôi có thể sử dụng ảnh cho mục đích thương mại không?</h3>
              <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
              <p>Có, tất cả các ảnh bạn chỉnh sửa đều thuộc về bạn và có thể được sử dụng cho mục đích cá nhân hoặc
                thương mại. Tuy nhiên, nếu bạn sử dụng AI để tạo ảnh mới, vui lòng kiểm tra các điều khoản sử dụng cụ
                thể.</p>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <h3>Tôi có thể hủy đăng ký bất cứ lúc nào không?</h3>
              <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
              <p>Có, bạn có thể hủy đăng ký bất kỳ lúc nào. Không có hợp đồng ràng buộc và không có phí hủy. Bạn sẽ tiếp
                tục có quyền truy cập vào các tính năng gói cho đến khi kết thúc chu kỳ thanh toán hiện tại.</p>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <h3>Các định dạng ảnh nào được hỗ trợ?</h3>
              <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
              <p>Chúng tôi hỗ trợ tất cả các định dạng ảnh phổ biến như JPG, PNG, WEBP, HEIC, và nhiều định dạng khác.
                Bạn có thể xuất ảnh sang nhiều định dạng khác nhau tùy thuộc vào nhu cầu của mình.</p>
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


// im
import car_befor from '../assets/images/home/car_befor.webp'
import car_after from '../assets/images/home/car_after.webp'

// Home page logic here if needed

// Fake logic for FAQ toggles (in a real app, would need to be implemented)
const toggleFaq = (event) => {
  const question = event.currentTarget;
  const answer = question.nextElementSibling;
  const toggle = question.querySelector('.faq-toggle');

  if (answer.style.display === 'block') {
    answer.style.display = 'none';
    toggle.textContent = '+';
  } else {
    answer.style.display = 'block';
    toggle.textContent = '-';
  }
};

// In a real app, would need to add event listeners for the FAQ questions
</script>
<!-- ----------------- -->
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
  padding: 40px 30px;
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

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  color: #4f46e5;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
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

/* Pricing Section */
.pricing-section {
  background-color: #f9fafb;
  position: relative;
  overflow: hidden;
}

.pricing-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: center center;
  z-index: 0;
}

.pricing-grid {
  display: grid;
  gap: 30px;
  margin-bottom: 50px;
  position: relative;
  z-index: 1;
}

.pricing-grid.two-columns {
  grid-template-columns: repeat(2, 1fr);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.pricing-card {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(124, 58, 237, 0.3);
}

.pricing-card.popular {
  border: 2px solid #6d28d9;
  transform: scale(1.03);
  z-index: 2;
  box-shadow: 0 20px 40px rgba(109, 40, 217, 0.15);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.popular-badge {
  position: absolute;
  top: 0;
  right: 30px;
  background: linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%);
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 5px 15px rgba(109, 40, 217, 0.25);
}

.pricing-header {
  padding: 40px 30px 30px;
  text-align: center;
  border-bottom: 1px solid #f3f4f6;
}

.pricing-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #111827;
}

.pricing-price {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
}

.period {
  font-size: 1rem;
  color: #6b7280;
  margin-top: 5px;
}

.pricing-features {
  padding: 30px;
}

.pricing-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pricing-features li {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  color: #4b5563;
  font-size: 1.05rem;
}

.pricing-features li:last-child {
  margin-bottom: 0;
}

.feature-check,
.feature-cross {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.feature-check {
  background-color: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
  font-weight: bold;
}

.feature-cross {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-weight: bold;
}

.feature-disabled {
  opacity: 0.6;
}

.pricing-action {
  padding: 0 30px 40px;
  text-align: center;
}

.pricing-action .btn {
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
}

.pricing-note {
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto;
}

.pricing-note a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.pricing-note a:hover {
  color: #6d28d9;
  text-decoration: underline;
}

/* Examples Section */
.examples-section {
  background-color: white;
  position: relative;
}

.examples-grid {
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-top: 50px;
}

.example-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: relative;
}

.example-title {
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: #4f46e5;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.example-before,
.example-after {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.example-before:hover,
.example-after:hover {
  transform: scale(1.05);
}

.example-before img,
.example-after img {
  display: block;
  max-width: 100%;
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

.example-arrow {
  font-size: 3rem;
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
}

.step-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.step-item:hover .step-icon {
  transform: scale(1.1) translateY(-10px);
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

.slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  gap: 20px;
}

.slider-prev,
.slider-next {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.slider-prev:hover,
.slider-next:hover {
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
  display: none;
}

.faq-item.active .faq-answer {
  display: block;
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
  font-size: 1.15rem;
  padding: 16px 36px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  border: none;
  color: white;
}

.cta-content .btn:hover {
  background-color: #f9fafb;
  transform: translateY(-5px);
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.features-grid .feature-card:nth-child(1) {
  animation: fadeIn 0.5s 0.1s ease both;
}

.features-grid .feature-card:nth-child(2) {
  animation: fadeIn 0.5s 0.2s ease both;
}

.features-grid .feature-card:nth-child(3) {
  animation: fadeIn 0.5s 0.3s ease both;
}

.features-grid .feature-card:nth-child(4) {
  animation: fadeIn 0.5s 0.4s ease both;
}

.features-grid .feature-card:nth-child(5) {
  animation: fadeIn 0.5s 0.5s ease both;
}

.features-grid .feature-card:nth-child(6) {
  animation: fadeIn 0.5s 0.6s ease both;
}

.pricing-grid .pricing-card:nth-child(1) {
  animation: fadeIn 0.5s 0.1s ease both;
}

.pricing-grid .pricing-card:nth-child(2) {
  animation: fadeIn 0.5s 0.2s ease both;
}

.stats-grid .stat-item:nth-child(1) {
  animation: fadeIn 0.5s 0.1s ease both;
}

.stats-grid .stat-item:nth-child(2) {
  animation: fadeIn 0.5s 0.2s ease both;
}

.stats-grid .stat-item:nth-child(3) {
  animation: fadeIn 0.5s 0.3s ease both;
}

.stats-grid .stat-item:nth-child(4) {
  animation: fadeIn 0.5s 0.4s ease both;
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

  .pricing-grid.two-columns {
    grid-template-columns: 1fr;
    max-width: 500px;
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

  .pricing-card.popular {
    transform: scale(1);
  }

  .pricing-card.popular:hover {
    transform: translateY(-10px);
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

  .example-item {
    flex-direction: column;
    gap: 30px;
  }

  .example-title {
    position: relative;
    top: 0;
    margin-bottom: 20px;
  }

  .example-arrow {
    transform: rotate(90deg);
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .cta-content p {
    font-size: 1.1rem;
  }

  .btn {
    padding: 12px 24px;
    font-size: 0.95rem;
  }

  .cta-content .btn {
    font-size: 1rem;
    padding: 14px 30px;
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
    font-size: 1.05rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .feature-icon {
    font-size: 2.5rem;
    width: 70px;
    height: 70px;
  }

  .feature-card h3 {
    font-size: 1.2rem;
  }

  .feature-card p {
    font-size: 0.95rem;
  }

  .step-icon {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }

  .step-item h3 {
    font-size: 1.2rem;
  }

  .step-item p {
    font-size: 0.95rem;
  }

  .cta-content h2 {
    font-size: 1.8rem;
  }

  .cta-content p {
    font-size: 1rem;
  }

  .testimonial-card {
    padding: 25px;
  }

  .slider-prev,
  .slider-next {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
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

/* Custom cursor for clickable elements */
.btn,
.feature-card,
.testimonial-card,
.faq-question,
.example-before,
.example-after,
.dot,
.slider-prev,
.slider-next {
  cursor: pointer;
}

/* Glass morphism effect for pricing cards */
.pricing-card {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>