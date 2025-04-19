<template>
  <div class="app">
    <LanguageSelectorPopup :isVisible="showLanguageSelector" @close="hideLanguageSelector"
      @language-changed="onLanguageChanged" />
    <AppHeader />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <AppFooter />
    <RequireLoginView @gmail-login="clickLogin" />
    <AlertView />
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'


import RequireLoginView from './components/RequireLogin.vue';
import AlertView from './components/AlertPopup/AlertView.vue';
import LanguageSelectorPopup from './components/LanguageSelectorPopup.vue';
import { onMounted, ref } from 'vue';

const clickLogin = () => {
  document.querySelector('#btn-gmail').click()
}
const showLanguageSelector = ref(false);

// Kiểm tra xem đã chọn ngôn ngữ chưa khi ứng dụng khởi chạy
onMounted(() => {
  // Kiểm tra cookie hoặc localStorage để xem người dùng đã chọn ngôn ngữ chưa
  const hasSelectedLanguage = localStorage.getItem('preferredLanguage');

  // Nếu chưa chọn ngôn ngữ, hiển thị popup
  if (!hasSelectedLanguage) {
    localStorage.setItem('preferredLanguage', 'en'); // Mặc định là tiếng Anh
    // showLanguageSelector.value = true;
  }
});

const hideLanguageSelector = () => {
  showLanguageSelector.value = false;
};

const onLanguageChanged = (languageCode) => {
  console.log(`User selected language: ${languageCode}`);
  // Có thể thực hiện các thao tác khác ở đây, ví dụ: tải nội dung mới
};

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  line-height: 1.6;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 70px;
  /* Để tránh bị header cố định che mất nội dung */
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
}

img {
  max-width: 100%;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 60px 0;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #4f46e5;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
</style>
