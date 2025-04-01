<template>
  <div class="pricing-page">
    <!-- Hero Section -->
    <section class="pricing-hero-section">
      <div class="container">
        <div class="pricing-hero-content">
          <h1>Chọn Gói Phù Hợp Với Nhu Cầu Của Bạn</h1>
          <p>Trải nghiệm sức mạnh của công nghệ AI trong chỉnh sửa ảnh với các gói dịch vụ linh hoạt</p>
        </div>
      </div>
    </section>

    <!-- Pricing Plans Section -->
    <section class="pricing-plans-section">
      <div class="container">
        <div class="pricing-toggle">
          <span :class="{ 'active': billingType === 'monthly' }" @click="billingType = 'monthly'">Thanh toán
            tháng</span>
          <div class="toggle-switch" @click="toggleBilling">
            <div class="toggle-button" :class="{ 'yearly': billingType === 'yearly' }"></div>
          </div>
          <span :class="{ 'active': billingType === 'yearly' }" @click="billingType = 'yearly'">Thanh toán năm <span
              class="discount-badge">Tiết kiệm 35%</span></span>
        </div>

        <div class="pricing-grid">
          <!-- Basic Plan -->
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>Cơ Bản</h3>
              <div class="pricing-price">
                <span class="price" v-if="billingType === 'monthly'">0₫</span>
                <span class="price" v-else>0₫</span>
                <span class="period">mãi mãi</span>
              </div>
              <p class="pricing-description">Bắt đầu chỉnh sửa ảnh với các công cụ AI cơ bản</p>
            </div>
            <div class="pricing-features">
              <ul>
                <li>
                  <span class="feature-check">✓</span>
                  <span><strong>Có hiển thị quảng cáo</strong></span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span><strong>100 lượt chỉnh sửa</strong> mỗi tháng</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Truy cập các công cụ AI cơ bản</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Lưu trữ đám mây 1GB</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Xuất ảnh độ phân giải tiêu chuẩn</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Hỗ trợ qua email</span>
                </li>
                <li class="feature-disabled">
                  <span class="feature-cross">×</span>
                  <span>Có logo watermark trên ảnh</span>
                </li>
                <li class="feature-disabled">
                  <span class="feature-cross">×</span>
                  <span>Không có công cụ AI nâng cao</span>
                </li>
              </ul>
            </div>
            <div class="pricing-action">
              <RouterLink to="/editor" class="btn btn-outline">Đăng Ký Miễn Phí</RouterLink>
            </div>
          </div>

          <!-- Pro Plan -->
          <div class="pricing-card popular">
            <div class="popular-badge">Phổ biến</div>
            <div class="pricing-header">
              <h3>Pro</h3>
              <div class="pricing-price">
                <span class="price" v-if="billingType === 'monthly'">9.9$</span>
                <span class="price" v-else>89$ </span>
                <span class="period">{{ billingType === 'monthly' ? 'mỗi tháng' : 'mỗi năm' }}</span>
              </div>
              <p class="pricing-description">Trải nghiệm đầy đủ sức mạnh của công nghệ AI</p>
            </div>
            <div class="pricing-features">
              <ul>
                <li>
                  <span class="feature-check">✓</span>
                  <span><strong>Không có quảng cáo</strong></span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span><strong>Không giới hạn lượt chỉnh sửa</strong></span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Truy cập <strong>tất cả</strong> công cụ AI</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Lưu trữ đám mây không giới hạn</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Xuất ảnh độ phân giải cao (4K)</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span><strong>Không có watermark</strong></span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Ưu tiên xử lý trên máy chủ</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Tải xuống hàng loạt</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Truy cập ứng dụng di động Pro</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span>Hỗ trợ ưu tiên 24/7</span>
                </li>
                <li>
                  <span class="feature-check">✓</span>
                  <span><strong>Hoàn tiền trong 7 ngày nếu không hài lòng!</strong></span>
                </li>
              </ul>
            </div>
            <div class="pricing-action">
              <a class="btn btn-primary" :href="billingType !== monthly ? `/payment` : `/payment?package=pro`">Dùng Thử 7
                Ngày</a>
            </div>
          </div>
        </div>

        <div class="pricing-note">
          <p>Tất cả các gói đều bao gồm hỗ trợ kỹ thuật và cập nhật thường xuyên. Để biết thêm về các gói doanh nghiệp
            tùy chỉnh, <a href="/contact">liên hệ với chúng tôi</a>.</p>
        </div>
      </div>
    </section>

    <!-- Features Comparison -->
    <section class="features-comparison-section">
      <div class="container">
        <h2 class="section-title">So Sánh Chi Tiết Các Gói</h2>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="feature-name">Tính năng</th>
                <th class="plan-basic">Cơ Bản</th>
                <th class="plan-pro">Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr class="section-header">
                <td colspan="3">Giới hạn sử dụng</td>
              </tr>
              <tr>
                <td>Lượt chỉnh sửa ảnh</td>
                <td>5 lần/ngày</td>
                <td>Không giới hạn</td>
              </tr>
              <tr>
                <td>Lưu trữ đám mây</td>
                <td>1GB</td>
                <td>Không giới hạn</td>
              </tr>

              <tr class="section-header">
                <td colspan="3">Công cụ AI</td>
              </tr>
              <tr>
                <td>Xóa phông nền</td>
                <td><span class="feature-included">✓</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Làm đẹp khuôn mặt cơ bản</td>
                <td><span class="feature-included">✓</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Phục hồi ảnh cũ</td>
                <td><span class="feature-included">✓</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Chỉnh sửa bằng chat AI</td>
                <td><span class="feature-not-included">×</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Tạo ảnh từ văn bản</td>
                <td><span class="feature-not-included">×</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Tăng độ phân giải ảnh</td>
                <td><span class="feature-not-included">×</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Xóa vật thể không mong muốn</td>
                <td><span class="feature-not-included">×</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Thay đổi phong cách ảnh</td>
                <td><span class="feature-not-included">×</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>

              <tr class="section-header">
                <td colspan="3">Tính năng khác</td>
              </tr>
              <tr>
                <td>Watermark</td>
                <td>Có</td>
                <td>Không</td>
              </tr>
              <tr>
                <td>Tải xuống hàng loạt</td>
                <td><span class="feature-not-included">×</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Ưu tiên xử lý trên máy chủ</td>
                <td><span class="feature-not-included">×</span></td>
                <td><span class="feature-included">✓</span></td>
              </tr>
              <tr>
                <td>Ứng dụng di động</td>
                <td>Giới hạn</td>
                <td>Đầy đủ</td>
              </tr>
              <tr>
                <td>Hỗ trợ kỹ thuật</td>
                <td>Email</td>
                <td>Ưu tiên 24/7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="pricing-cta-section">
      <div class="container">
        <div class="pricing-cta-content">
          <h2>Bắt Đầu Trải Nghiệm Ngay Hôm Nay</h2>
          <p>Dùng thử miễn phí 7 ngày với gói Pro - không cần thông tin thẻ tín dụng</p>
          <div class="cta-buttons">
            <RouterLink to="/pricing" class="btn btn-primary">Dùng Thử Pro</RouterLink>
            <RouterLink to="/editor" class="btn btn-secondary">Đăng Ký Miễn Phí</RouterLink>
          </div>
          <div class="cta-note">
            <p>Không yêu cầu cam kết dài hạn. Hủy bất cứ lúc nào.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// State for billing toggle
const billingType = ref('monthly');

// Toggle billing type
const toggleBilling = () => {
  billingType.value = billingType.value === 'monthly' ? 'yearly' : 'monthly';
};

// Script for FAQ toggle
const toggleFaq = (event) => {
  const question = event.currentTarget;
  const faqItem = question.parentElement;
  const isActive = faqItem.classList.contains('active');

  // Close all other items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
    const toggle = item.querySelector('.faq-toggle');
    if (toggle) toggle.textContent = '+';
  });

  // Toggle current item if it wasn't active
  if (!isActive) {
    faqItem.classList.add('active');
    const toggle = question.querySelector('.faq-toggle');
    if (toggle) toggle.textContent = '-';
  }
};

// In a real app, we would add event listeners
// But Vue uses @click directives in the template
</script>

<style scoped>
/* Import font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Base styling */
.pricing-page {
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
  color: white !important;
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2);
  border: 1px solid #e5e7eb;
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
section {
  padding: 100px 0;
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 50px;
  color: #111827;
  line-height: 1.2;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Pricing Hero Section */
.pricing-hero-section {
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
  position: relative;
  text-align: center;
}

.pricing-hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237c3aed' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 0;
}

.pricing-hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.pricing-hero-content h1 {
  font-weight: 800;
  margin-bottom: 20px;
  color: #1e293b;
  line-height: 1.2;
  background: linear-gradient(135deg, #1e293b 0%, #4338ca 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pricing-hero-content p {
  font-size: 1.35rem;
  color: #4b5563;
  margin-bottom: 40px;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
}

/* Pricing Plans Section */
.pricing-plans-section {
  background-color: #f9fafb;
  position: relative;
  overflow: hidden;
}

.pricing-plans-section::before {
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

.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.pricing-toggle span {
  font-size: 1.1rem;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.pricing-toggle span.active {
  color: #1f2937;
  font-weight: 600;
}

.toggle-switch {
  width: 56px;
  height: 30px;
  background-color: #e5e7eb;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-switch:hover {
  background-color: #d1d5db;
}

.toggle-button {
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.toggle-button.yearly {
  left: 29px;
  background-color: #4f46e5;
}

.discount-badge {
  font-size: 0.8rem;
  background-color: #dcfce7;
  color: #166534;
  padding: 4px 8px;
  border-radius: 20px;
  margin-left: 8px;
  font-weight: 600;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 50px;
  position: relative;
  z-index: 1;
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
  height: 100%;
  display: flex;
  flex-direction: column;
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

.pricing-description {
  color: #6b7280;
  margin-top: 15px;
  font-size: 1.05rem;
  color: white;
}

.pricing-price {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
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
  flex-grow: 1;
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

.pricing-features li strong {
  font-weight: 600;
  color: #111827;
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

/* Features Comparison Section */
.features-comparison-section {
  background-color: white;
  position: relative;
}

.comparison-table-wrapper {
  margin-top: 40px;
  border-radius: 16px;
  overflow-x: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  background-color: white;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.05rem;
}

.comparison-table th,
.comparison-table td {
  padding: 20px;
  border-bottom: 1px solid #f3f4f6;
}

.comparison-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #111827;
}

.comparison-table th.feature-name {
  width: 40%;
}

.comparison-table th.plan-basic,
.comparison-table th.plan-pro {
  width: 30%;
  text-align: center;
}

.comparison-table td {
  color: #4b5563;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table tr.section-header td {
  background-color: #f3f4f6;
  font-weight: 700;
  color: #1f2937;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

.feature-included,
.feature-not-included {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.feature-included {
  background-color: #dcfce7;
  color: #16a34a;
  font-weight: bold;
}

.feature-not-included {
  background-color: #fee2e2;
  color: #dc2626;
  font-weight: bold;
}

/* Pricing FAQ Section */
.pricing-faq-section {
  background-color: #f9fafb;
  position: relative;
}

.pricing-faq-list {
  max-width: 900px;
  margin: 20px auto 0;
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
  flex-shrink: 0;
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

/* Pricing Testimonials */
.pricing-testimonials-section {
  background-color: white;
  position: relative;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
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

/* Pricing CTA Section */
.pricing-cta-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  text-align: center;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.pricing-cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  z-index: 0;
}

.pricing-cta-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.pricing-cta-content h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pricing-cta-content p {
  font-size: 1.25rem;
  margin-bottom: 40px;
  color: white;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 20px;
}

.cta-note {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-top: 20px;
}

.pricing-cta-content .btn-primary {
  background-color: white;
  color: #4f46e5;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
}

.pricing-cta-content .btn-primary:hover {
  background-color: #f9fafb;
  transform: translateY(-5px);
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
}

.pricing-cta-content .btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.pricing-cta-content .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

/* Responsive styles */
@media (max-width: 1024px) {
  .pricing-hero-content h1 {
    font-size: 3rem;
  }

  .pricing-hero-content p {
    font-size: 1.2rem;
  }

  .pricing-cta-content h2 {
    font-size: 2.5rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 15px;
  }
}

@media (max-width: 992px) {
  section {
    padding: 80px 0;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }

  .pricing-card.popular {
    transform: scale(1);
  }

  .pricing-card.popular:hover {
    transform: translateY(-10px);
  }

  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>