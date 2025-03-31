<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>AI Image Editor</h3>
            <p>Công cụ chỉnh sửa ảnh thông minh với sức mạnh của AI</p>
            <div class="social-links">
              <a href="#" class="social-link">FB</a>
              <a href="#" class="social-link">TW</a>
              <a href="#" class="social-link">IG</a>
              <a href="#" class="social-link">YT</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Sản Phẩm</h4>
            <ul>
              <li><router-link to="/editor">Chỉnh Sửa Ảnh</router-link></li>
              <li><router-link to="/templates">Thư Viện Mẫu</router-link></li>
              <li><router-link to="/utilities">Công Cụ Tiện Ích</router-link></li>
              <li><router-link to="/pricing">Giá Cả</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Hỗ Trợ</h4>
            <ul>
              <li><router-link to="/tutorials">Hướng Dẫn</router-link></li>
              <li><router-link to="/support">Liên Hệ</router-link></li>
              <li><router-link to="/blog">Blog</router-link></li>
              <li><router-link to="/community">Cộng Đồng</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Công Ty</h4>
            <ul>
              <li><router-link to="/about">Về Chúng Tôi</router-link></li>
              <li><router-link to="/terms">Điều Khoản</router-link></li>
              <li><router-link to="/terms">Chính Sách Bảo Mật</router-link></li>
              <li><router-link to="/api">API & Tích Hợp</router-link></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 AINow. Tất cả các quyền được bảo lưu.</p>
          <div class="language-selector">
            <select>
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  // Footer logic here if needed
  </script>
  
  <style scoped>
  .footer {
    background-color: #1f2937;
    color: #f3f4f6;
    padding: 60px 0 20px;
    margin-top: 60px;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
  }
  
  .footer-section h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: white;
  }
  
  .footer-section h4 {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: white;
  }
  
  .footer-section p {
    margin-bottom: 20px;
    color: #d1d5db;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: #374151;
    border-radius: 50%;
    color: white;
    transition: background-color 0.3s;
  }
  
  .social-link:hover {
    background-color: #4f46e5;
  }
  
  .footer-section ul {
    list-style: none;
  }
  
  .footer-section ul li {
    margin-bottom: 10px;
  }
  
  .footer-section ul li a {
    color: #d1d5db;
    transition: color 0.2s;
  }
  
  .footer-section ul li a:hover {
    color: white;
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid #374151;
    color: #9ca3af;
  }
  .footer-bottom p{
    color:white;
  }
  .language-selector select {
    background-color: #374151;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .footer-content {
      grid-template-columns: 1fr;
    }
  }
  </style>
  
  