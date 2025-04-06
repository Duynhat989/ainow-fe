<template>
  <div class="subscription-popup-overlay" v-if="isVisible" @click.self="closeIfNotPersistent">
    <div class="subscription-popup-container" :class="{ 'shake-animation': showAnimation }">
      <div class="popup-header">
        <div class="popup-icon" :class="type">
          <span v-if="type === 'limit'">⚠️</span>
          <span v-else-if="type === 'expired'">⏱️</span>
        </div>
        <button class="popup-close" @click="close" v-if="!isPersistent">×</button>
      </div>

      <div class="popup-content">
        <h2 class="popup-title">{{ popupTitle }}</h2>
        <p class="popup-message">{{ popupMessage }}</p>
        <p v-if="type === 'limit'" class="popup-note">{{ $t('SUBSCRIPTION_POPUP_NOTE') }}</p>

        <div class="subscription-options" v-if="showSubscriptionOptions">
          <div class="subscription-plan" v-for="(plan, index) in subscriptionPlans" :key="index"
            @click="selectPlan(plan)">
            <div class="plan-header" :class="{ 'recommended': plan.recommended }">
              <h3>{{ plan.name }}</h3>
              <span v-if="plan.recommended" class="recommended-tag">{{ $t('SUBSCRIPTION_POPUP_POPULAR') }}</span>
            </div>
            <div class="plan-price">
              <span class="price">${{ plan.price }}</span>
              <span class="period">/{{ plan.period }}</span>
            </div>
            <ul class="plan-features">
              <li v-for="(feature, i) in plan.features" :key="i">
                <span class="feature-check">✓</span> {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <div class="popup-actions">
          <button v-if="showSubscriptionOptions" class="btn-secondary" @click="showSubscriptionOptions = false">
            {{ $t('SUBSCRIPTION_POPUP_BACK') }}
          </button>
          <button v-else class="btn-secondary" @click="close" v-if="!isPersistent">
            {{ $t('SUBSCRIPTION_POPUP_LATER') }}
          </button>
          <button class="btn-primary" v-if="!showSubscriptionOptions" @click="showPlans">
            {{ upgradeButtonText }}
          </button>
          <button v-else class="btn-primary" @click="navigateToUpgrade">
            {{ $t('SUBSCRIPTION_POPUP_TRY') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'limit', // 'limit' or 'expired'
    validator: (value) => ['limit', 'expired'].includes(value)
  },
  isPersistent: {
    type: Boolean,
    default: false
  },
  usageInfo: {
    type: Object,
    default: () => ({
      imagesLeft: 0,
      totalImages: 50,
      daysLeft: 0
    })
  }
});

const emit = defineEmits(['close', 'upgrade']);

const showAnimation = ref(false);
const showSubscriptionOptions = ref(false);

// Subscription plans matching PricingPage.vue
const subscriptionPlans = [
  {
    name: 'Pro',
    price: '9.9',
    period: 'month',
    features: [
      'Không có quảng cáo',
      'Không giới hạn lượt chỉnh sửa',
      'Truy cập tất cả công cụ AI',
      'Lưu trữ đám mây không giới hạn',
      'Xuất ảnh độ phân giải cao (4K)',
      'Không có watermark',
      'Ưu tiên xử lý trên máy chủ',
      'Hỗ trợ ưu tiên 24/7'
    ],
    recommended: true
  },
  {
    name: 'Cơ Bản',
    price: '0',
    period: 'mãi mãi',
    features: [
      'Có hiển thị quảng cáo',
      '25 lượt chỉnh sửa mỗi ngày',
      'Truy cập các công cụ AI cơ bản',
      'Lưu trữ đám mây 1GB',
      'Xuất ảnh độ phân giải tiêu chuẩn',
      'Có logo watermark trên ảnh',
      'Hỗ trợ qua email'
    ],
    recommended: false
  }
];

// Computed properties for dynamic content
const popupTitle = computed(() => {
  if (props.type === 'limit') {
    return 'Đã Đạt Giới Hạn Ngày';
  } else {
    return 'Gói Dịch Vụ Đã Hết Hạn';
  }
});

const popupMessage = computed(() => {
  if (props.type === 'limit') {
    return `Bạn đã đạt đến giới hạn ${props.usageInfo.totalImages} lượt chỉnh sửa ảnh mỗi ngày. Nâng cấp lên gói Pro để có không giới hạn lượt chỉnh sửa và các tính năng nâng cao.`;
  } else {
    return `Gói dịch vụ của bạn đã hết hạn ${props.usageInfo.daysLeft > 0 ? 'cách đây ' + props.usageInfo.daysLeft + ' ngày' : 'hôm nay'}. Gia hạn ngay để tiếp tục sử dụng đầy đủ tính năng.`;
  }
});

const upgradeButtonText = computed(() => {
  if (props.type === 'limit') {
    return 'Nâng Cấp Lên Pro';
  } else {
    return 'Gia Hạn Gói Pro';
  }
});

// Show animation when popup first appears
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    showAnimation.value = true;
    setTimeout(() => {
      showAnimation.value = false;
    }, 600);
  } else {
    showSubscriptionOptions.value = false;
  }
});

// Methods
const close = () => {
  emit('close');
};

const closeIfNotPersistent = () => {
  if (!props.isPersistent) {
    close();
  }
};

const showPlans = () => {
  showSubscriptionOptions.value = true;
};

const selectPlan = (plan) => {
  // Here you can store the selected plan if needed
  navigateToUpgrade(plan);
};

const navigateToUpgrade = (plan) => {
  emit('upgrade', plan);
  // For actual implementation, you might want to:
  // window.location.href = '/pricing' or use your router
};
</script>

<style scoped>
.subscription-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  backdrop-filter: blur(6px);
  animation: fadeIn 0.3s ease-out;
}

.subscription-popup-container {
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 90%;
  max-width: 900px;
  overflow: hidden;
  animation: slideUp 0.4s ease-out;
  transform-origin: center;
}

.popup-header {
  position: relative;
  padding: 30px;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(90deg, #4338ca, #6366f1);
}

.popup-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  z-index: 1;
  margin-bottom: -35px;
}

.popup-icon.limit {
  background-color: #fef9c3;
  color: #ca8a04;
}

.popup-icon.expired {
  background-color: #fee2e2;
  color: #dc2626;
}

.popup-close {
  position: absolute;
  right: 20px;
  top: 15px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.popup-close:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.popup-content {
  padding: 40px 30px 30px;
  text-align: center;
}

.popup-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #4338ca, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.popup-message {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 15px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.popup-note {
  font-size: 0.95rem;
  color: #6d28d9;
  font-weight: 500;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}

.btn-primary,
.btn-secondary {
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 160px;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background-color: white;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background-color: #f8fafc;
  border-color: #94a3b8;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.btn-secondary:active {
  transform: translateY(0);
}

/* Subscription Plans */
.subscription-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.subscription-plan {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s;
  background-color: white;
  cursor: pointer;
}

.subscription-plan:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.plan-header {
  padding: 20px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
}

.plan-header.recommended {
  background: linear-gradient(135deg, #dbeafe, #eff6ff);
  border-bottom: 1px solid #bfdbfe;
}

.plan-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.recommended-tag {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #4f46e5;
  color: white;
  padding: 5px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border-bottom-left-radius: 8px;
}

.plan-price {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
}

.period {
  font-size: 1rem;
  color: #64748b;
}

.plan-features {
  list-style: none;
  padding: 20px;
  margin: 0;
  text-align: left;
}

.plan-features li {
  margin-bottom: 10px;
  color: #475569;
  display: flex;
  align-items: flex-start;
  line-height: 1.4;
}

.feature-check {
  color: #4f46e5;
  font-weight: bold;
  margin-right: 8px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.shake-animation {
  animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {

  10%,
  90% {
    transform: translateX(-1px);
  }

  20%,
  80% {
    transform: translateX(2px);
  }

  30%,
  50%,
  70% {
    transform: translateX(-2px);
  }

  40%,
  60% {
    transform: translateX(2px);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .subscription-popup-container {
    width: 95%;
  }

  .popup-header {
    padding: 20px;
  }

  .popup-icon {
    width: 60px;
    height: 60px;
    font-size: 28px;
    margin-bottom: -30px;
  }

  .popup-content {
    padding: 35px 20px 25px;
  }

  .popup-title {
    font-size: 1.5rem;
  }

  .popup-message {
    font-size: 1rem;
  }

  .subscription-options {
    grid-template-columns: 1fr;
  }

  .popup-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>