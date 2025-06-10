<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>COPIAH SUPPLY INC</h4>
          <!-- Company -->
           <p>Email: <span>contact@copiahsupplyinc.com</span></p>
          <p>Address 1: 441 EXTENSION ST</p>
          <p>Address 2: HAZLE HURST MS 39083</p>
          <div class="social-links">
            <a href="#" class="social-link"><i class='bx bxl-facebook'></i></a>
            <a href="#" class="social-link"><i class='bx bxl-twitter' ></i></a>
            <a href="#" class="social-link"><i class='bx bxl-instagram' ></i></a>
            <a href="#" class="social-link"><i class='bx bxl-youtube' ></i></a>
          </div>
        </div>
        <div class="footer-section">
          <h4>{{ $t('FOOTER_PRODUCT') }}</h4>
          <ul>
            <li><router-link to="/editor">{{ $t('FOOTER_EDIT_PHOTO') }}</router-link></li>
            <li><router-link to="/templates">{{ $t('FOOTER_TEMPLATES') }}</router-link></li>
            <li><router-link to="/utilities">{{ $t('FOOTER_UTILITIES') }}</router-link></li>
            <li><router-link to="/pricing">{{ $t('FOOTER_PRICING') }}</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>{{ $t('FOOTER_SUPPORT') }}</h4>
          <ul>
            <li><router-link to="/tutorials">{{ $t('FOOTER_TUTORIALS') }}</router-link></li>
            <li><router-link to="/support">{{ $t('FOOTER_CONTACT') }}</router-link></li>
            <li><router-link to="/blog">{{ $t('FOOTER_BLOG') }}</router-link></li>
            <li><router-link to="/community">{{ $t('FOOTER_COMMUNITY') }}</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>{{ $t('FOOTER_COMPANY') }}</h4>
          
          <ul>
            <li><router-link to="/about">{{ $t('FOOTER_ABOUT') }}</router-link></li>
            <li><router-link to="/terms">{{ $t('FOOTER_TERMS') }}</router-link></li>
            <li><router-link to="/privacy">{{ $t('FOOTER_PRIVACY') }}</router-link></li>
            <li><router-link to="/api">{{ $t('FOOTER_API') }}</router-link></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ $t('FOOTER_COPYRIGHT') }}</p>
        <div class="language-selector">
          <select v-model="currentLocale" @change="changeLanguage">
            <option value="vi">{{ $t('LANG_VIETNAMESE') }}</option>
            <option value="en">{{ $t('LANG_ENGLISH') }}</option>
          </select>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const currentLocale = ref(locale.value || 'vi');

// Đồng bộ hóa giữa locale của i18n và currentLocale
watch(() => locale.value, (newLocale) => {
  currentLocale.value = newLocale;
});

// Hàm thay đổi ngôn ngữ
const changeLanguage = () => {
  // Cập nhật ngôn ngữ trong i18n
  locale.value = currentLocale.value;
  
  // Lưu ngôn ngữ đã chọn vào localStorage để duy trì sau khi tải lại trang
  localStorage.setItem('preferredLanguage', currentLocale.value);
  
  // Thông báo cho người dùng biết rằng ngôn ngữ đã được thay đổi (tùy chọn)
  // Bạn có thể thêm một thông báo nhỏ ở đây nếu muốn
};

// Khởi tạo ngôn ngữ từ localStorage nếu có
const initLanguage = () => {
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    currentLocale.value = savedLanguage;
    locale.value = savedLanguage;
  }
};

// Gọi hàm khởi tạo ngôn ngữ
initLanguage();
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

.footer-bottom p {
  color: white;
}

.language-selector select {
  background-color: #374151;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.language-selector select:hover {
  background-color: #4b5563;
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