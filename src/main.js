import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TrafficTrackerPlugin from './utils/trafficTrackerPlugin.js';
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(router)

// Cài đặt plugin TrafficTracker
app.use(TrafficTrackerPlugin, {
    telegramBotToken: '7660224061:AAERdJSRpyKD9vtTriOiLBO1BMu9ke_vYCE', // Thay thế bằng token thực
    telegramChatId: '-4681930908',     // Thay thế bằng chat ID thực
    pageViewTrack: true,
    trackUserDetails: true,
    telegramMessageTemplate: 'Người dùng mới truy cập website!\nURL: {url}\nIP: {ip}\nThiết bị: {userAgent}\nThời gian: {time}'
  });
  
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  popupType: 'popup', // Sử dụng popup thay vì redirect
})

app.mount('#app')
