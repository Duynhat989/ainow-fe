<template>
    <div class="tutorials-page">
      <!-- Hero Section -->
      <section class="tutorials-hero-section">
        <div class="container">
          <div class="tutorials-hero-content">
            <h1>Hướng Dẫn Sử Dụng</h1>
            <p>Khám phá các hướng dẫn chi tiết giúp bạn tận dụng tối đa sức mạnh AI trong chỉnh sửa ảnh</p>
          </div>
        </div>
      </section>
  
      <!-- Basic Tutorials Section -->
      <section id="basics" class="tutorials-section">
        <div class="container">
          <h2 class="section-title">Hướng Dẫn Cơ Bản</h2>
  
          <div class="tutorials-grid">
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Getting started" />
                <div class="tutorial-level beginner">Dễ</div>
              </div>
              <div class="tutorial-content">
                <h3>Làm Quen Với Giao Diện</h3>
                <p>Tìm hiểu cách điều hướng và sử dụng công cụ chỉnh sửa ảnh AI</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 5 phút</span>
                  <span><i class="icon-video"></i> Video</span>
                </div>
                <router-link to="/tutorial/getting-started" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
  
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Upload and organize" />
                <div class="tutorial-level beginner">Dễ</div>
              </div>
              <div class="tutorial-content">
                <h3>Tải Lên và Quản Lý Ảnh</h3>
                <p>Cách tải ảnh lên, sắp xếp và quản lý thư viện ảnh của bạn</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 3 phút</span>
                  <span><i class="icon-article"></i> Bài viết</span>
                </div>
                <router-link to="/tutorial/upload-manage" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
  
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Basic adjustments" />
                <div class="tutorial-level beginner">Dễ</div>
              </div>
              <div class="tutorial-content">
                <h3>Điều Chỉnh Cơ Bản</h3>
                <p>Các điều chỉnh cơ bản như độ sáng, tương phản và màu sắc</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 8 phút</span>
                  <span><i class="icon-video"></i> Video</span>
                </div>
                <router-link to="/tutorial/basic-adjustments" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- AI Tools Tutorials Section -->
      <section id="ai-tools" class="tutorials-section bg-light">
        <div class="container">
          <h2 class="section-title">Hướng Dẫn Công Cụ AI</h2>
  
          <div class="tutorials-grid">
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Background removal" />
                <div class="tutorial-level intermediate">Trung bình</div>
              </div>
              <div class="tutorial-content">
                <h3>Xóa Phông Nền Tự Động</h3>
                <p>Cách sử dụng AI để xóa và thay đổi phông nền ảnh một cách hoàn hảo</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 6 phút</span>
                  <span><i class="icon-video"></i> Video</span>
                </div>
                <router-link to="/tutorial/background-removal" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
  
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Face enhancement" />
                <div class="tutorial-level intermediate">Trung bình</div>
              </div>
              <div class="tutorial-content">
                <h3>Làm Đẹp Khuôn Mặt</h3>
                <p>Sử dụng AI để làm mịn da, loại bỏ khuyết điểm và làm nổi bật đường nét khuôn mặt</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 10 phút</span>
                  <span><i class="icon-article"></i> Bài viết</span>
                </div>
                <router-link to="/tutorial/face-enhancement" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
  
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Photo restoration" />
                <div class="tutorial-level advanced">Nâng cao</div>
              </div>
              <div class="tutorial-content">
                <h3>Phục Hồi Ảnh Cũ</h3>
                <p>Khôi phục ảnh cũ bị hư hỏng hoặc phai màu bằng công nghệ AI</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 15 phút</span>
                  <span><i class="icon-video"></i> Video</span>
                </div>
                <router-link to="/tutorial/photo-restoration" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Text-to-Image Tutorials Section -->
      <section id="text-to-image" class="tutorials-section">
        <div class="container">
          <h2 class="section-title">Hướng Dẫn Tạo Ảnh Bằng AI</h2>
  
          <div class="tutorials-grid">
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Text to image basics" />
                <div class="tutorial-level beginner">Dễ</div>
              </div>
              <div class="tutorial-content">
                <h3>Cơ Bản Về Text-to-Image</h3>
                <p>Tìm hiểu cách viết prompt hiệu quả để tạo ra hình ảnh như ý muốn</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 7 phút</span>
                  <span><i class="icon-video"></i> Video</span>
                </div>
                <router-link to="/tutorial/text-to-image-basics" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
  
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Advanced prompting" />
                <div class="tutorial-level intermediate">Trung bình</div>
              </div>
              <div class="tutorial-content">
                <h3>Kỹ Thuật Prompt Nâng Cao</h3>
                <p>Các kỹ thuật nâng cao để kiểm soát chi tiết kết quả tạo ảnh</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 12 phút</span>
                  <span><i class="icon-article"></i> Bài viết</span>
                </div>
                <router-link to="/tutorial/advanced-prompting" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
  
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Style customization" />
                <div class="tutorial-level advanced">Nâng cao</div>
              </div>
              <div class="tutorial-content">
                <h3>Tùy Chỉnh Phong Cách Hình Ảnh</h3>
                <p>Cách tạo ảnh theo phong cách nghệ thuật cụ thể như sơn dầu, watercolor, hoặc pixel art</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 10 phút</span>
                  <span><i class="icon-video"></i> Video</span>
                </div>
                <router-link to="/tutorial/style-customization" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Advanced Tutorials Section -->
      <section id="advanced" class="tutorials-section bg-light">
        <div class="container">
          <h2 class="section-title">Hướng Dẫn Nâng Cao</h2>
  
          <div class="tutorials-grid">
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="AI chat editing" />
                <div class="tutorial-level advanced">Nâng cao</div>
              </div>
              <div class="tutorial-content">
                <h3>Chỉnh Sửa Bằng Chat AI</h3>
                <p>Sử dụng chat AI để mô tả và thực hiện chỉnh sửa ảnh phức tạp</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 15 phút</span>
                  <span><i class="icon-video"></i> Video</span>
                </div>
                <router-link to="/tutorial/ai-chat-editing" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
  
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Batch processing" />
                <div class="tutorial-level advanced">Nâng cao</div>
              </div>
              <div class="tutorial-content">
                <h3>Xử Lý Hàng Loạt</h3>
                <p>Cách áp dụng chỉnh sửa cho nhiều ảnh cùng lúc để tiết kiệm thời gian</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 8 phút</span>
                  <span><i class="icon-article"></i> Bài viết</span>
                </div>
                <router-link to="/tutorial/batch-processing" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
  
            <div class="tutorial-card">
              <div class="tutorial-img">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Professional workflow" />
                <div class="tutorial-level expert">Chuyên gia</div>
              </div>
              <div class="tutorial-content">
                <h3>Quy Trình Chỉnh Sửa Chuyên Nghiệp</h3>
                <p>Học quy trình chỉnh sửa ảnh chuyên nghiệp từ A đến Z</p>
                <div class="tutorial-details">
                  <span><i class="icon-time"></i> 25 phút</span>
                  <span><i class="icon-course"></i> Khóa học</span>
                </div>
                <router-link to="/tutorial/pro-workflow" class="btn-tutorial">Xem Hướng Dẫn</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Video Tutorial Feature -->
      <section class="featured-tutorial-section">
        <div class="container">
          <div class="featured-tutorial">
            <div class="featured-content">
              <h2>Khóa Học Đặc Biệt</h2>
              <h3>Làm Chủ Nghệ Thuật Chỉnh Sửa Ảnh Với AI</h3>
              <p>Khám phá tất cả các kỹ thuật và công cụ chỉnh sửa ảnh AI trong khóa học toàn diện này. Từ cơ bản đến chuyên nghiệp, bạn sẽ học được cách tạo ra những hình ảnh đẹp mắt trong thời gian ngắn nhất.</p>
              <div class="featured-stats">
                <div class="stat">
                  <strong>4.5/5</strong>
                  <span>Đánh giá</span>
                </div>
                <div class="stat">
                  <strong>10,000+</strong>
                  <span>Học viên</span>
                </div>
                <div class="stat">
                  <strong>5 giờ</strong>
                  <span>Thời lượng</span>
                </div>
              </div>
              <router-link to="/courses/master-ai-editing" class="btn btn-primary">Đăng Ký Khóa Học</router-link>
            </div>
            <div class="featured-video">
              <div class="video-wrapper">
                <img src="https://content-management-files.canva.com/8d6ba94c-bdbc-476f-bb71-7b05ee1920c8/feature_ai-photo-editor_promo-showcase_022x.jpg?height=400&width=600" alt="Course preview" />
                <div class="play-button">
                  <span>▶</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Newsletter Section -->
      <section class="newsletter-section">
        <div class="container">
          <div class="newsletter-content">
            <h2>Nhận Thông Báo Về Hướng Dẫn Mới</h2>
            <p>Đăng ký để nhận thông báo khi chúng tôi phát hành hướng dẫn và tính năng mới</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Địa chỉ email của bạn" />
              <button class="btn btn-primary">Đăng Ký</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  // Method to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  </script>

<style scoped>
/* Import font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Base styling */
.tutorials-page {
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

.btn-tutorial {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f3f4f6;
  color: #4f46e5;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  margin-top: 15px;
}

.btn-tutorial:hover {
  background-color: #4f46e5;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
}

/* Section styling */
section {
  padding: 100px 0;
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 1.7rem;
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
  font-size: 1.2rem;
  max-width: 750px;
  margin: 0 auto 60px;
  color: #6b7280;
}

.bg-light {
  background-color: #f9fafb;
}

/* Tutorials Hero Section */
.tutorials-hero-section {
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
  position: relative;
  text-align: center;
}

.tutorials-hero-section::before {
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

.tutorials-hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.tutorials-hero-content h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1e293b;
  line-height: 1.2;
  background: linear-gradient(135deg, #1e293b 0%, #4338ca 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tutorials-hero-content p {
  font-size: 1.35rem;
  color: #4b5563;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
}

/* Tutorial Categories Section */
.tutorial-categories-section {
  padding: 80px 0;
  background-color: white;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.category-card {
  background-color: #f9fafb;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  border-color: rgba(124, 58, 237, 0.3);
  background-color: white;
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  color: #4f46e5;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1);
}

.category-card h3 {
  margin-bottom: 10px;
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 700;
}

.category-card p {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.5;
}

/* Tutorials Section */
.tutorials-section {
  padding: 80px 0;
}

.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.tutorial-card {
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tutorial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(124, 58, 237, 0.2);
}

.tutorial-img {
  position: relative;
  overflow: hidden;
}

.tutorial-img img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.tutorial-card:hover .tutorial-img img {
  transform: scale(1.05);
}

.tutorial-level {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.beginner {
  background-color: #10b981;
}

.intermediate {
  background-color: #f59e0b;
}

.advanced {
  background-color: #ef4444;
}

.expert {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.tutorial-content {
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.tutorial-content h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1f2937;
  line-height: 1.4;
}

.tutorial-content p {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 15px;
  flex-grow: 1;
}

.tutorial-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 10px;
}

.tutorial-details span {
  display: flex;
  align-items: center;
}

.tutorial-details i {
  margin-right: 5px;
  font-size: 1rem;
}

.icon-time::before {
  content: "⏱️";
}

.icon-video::before {
  content: "🎬";
}

.icon-article::before {
  content: "📄";
}

.icon-course::before {
  content: "📚";
}

/* Featured Tutorial Section */
.featured-tutorial-section {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  padding: 100px 0;
}

.featured-tutorial {
  display: flex;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.featured-content {
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-content h2 {
  font-size: 1.5rem;
  color: #4f46e5;
  margin-bottom: 15px;
  font-weight: 600;
}

.featured-content h3 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1f2937;
  line-height: 1.2;
}

.featured-content p {
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.featured-stats {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat strong {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 5px;
}

.stat span {
  font-size: 0.9rem;
  color: #6b7280;
}

.featured-video {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-wrapper {
  width: 90%;
  height: 90%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.video-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.play-button span {
  font-size: 2rem;
  color: #4f46e5;
  margin-left: 5px;
}

.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background-color: #4f46e5;
}

.play-button:hover span {
  color: white;
}

/* Newsletter Section */
.newsletter-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  padding: 80px 0;
  color: white;
  text-align: center;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 20px;
}

.newsletter-content p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  padding: 15px 20px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
}

.newsletter-form input:focus {
  outline: none;
}

.newsletter-form .btn {
  padding: 15px 30px;
}

/* Media queries for responsiveness */
@media (max-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tutorials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .featured-tutorial {
    flex-direction: column;
  }
  
  .featured-content {
    padding: 40px;
  }
  
  .video-wrapper {
    width: 100%;
    height: 400px;
  }
}

@media (max-width: 768px) {
  .tutorials-hero-content h1 {
    font-size: 2.5rem;
  }
  
  .tutorials-hero-content p {
    font-size: 1.1rem;
  }
  
  .tutorials-grid {
    grid-template-columns: 1fr;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .featured-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .featured-content h3 {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .tutorials-hero-content h1 {
    font-size: 2rem;
  }
  
  .featured-content {
    padding: 30px;
  }
  
  .featured-content h3 {
    font-size: 1.8rem;
  }
  
  .video-wrapper {
    height: 250px;
  }
  
  .tutorial-content h3 {
    font-size: 1.1rem;
  }
}

/* Add smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Scroll Effects */
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

.category-card {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.category-card:nth-child(1) { animation-delay: 0.1s; }
.category-card:nth-child(2) { animation-delay: 0.2s; }
.category-card:nth-child(3) { animation-delay: 0.3s; }
.category-card:nth-child(4) { animation-delay: 0.4s; }

.tutorial-card {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.tutorials-grid .tutorial-card:nth-child(1) { animation-delay: 0.1s; }
.tutorials-grid .tutorial-card:nth-child(2) { animation-delay: 0.2s; }
.tutorials-grid .tutorial-card:nth-child(3) { animation-delay: 0.3s; }
</style>