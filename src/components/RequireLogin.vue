<template>
    <div class="login-popup-overlay" v-if="isVisible" @click.self="closeIfNotPersistent">
        <div class="login-popup-container" :class="{ 'shake-animation': showAnimation }">
            <div class="popup-header">
                <div class="popup-icon">
                    <span>🔐</span>
                </div>
                <button class="popup-close" @click="close" v-if="!isPersistent">×</button>
            </div>

            <div class="popup-content">
                <h2 class="popup-title">{{ $t('LOGIN_POPUP_TITLE') }}</h2>
                <p class="popup-message">{{ $t('LOGIN_POPUP_MESSAGE') }}</p>

                <div class="popup-actions">
                    <button class="btn-gmail" @click="loginWithGmail">
                        <span class="gmail-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                                <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                            </svg>
                        </span>
                        {{ $t('LOGIN_POPUP_GMAIL_BUTTON') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    isPersistent: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close', 'gmail-login']);

const isVisible = ref(false);
const showAnimation = ref(false);

// Listen for dataChanged event
onMounted(() => {
    document.addEventListener('dataChanged', handleDataChanged);

    // Clean up event listener when component is unmounted
    return () => {
        document.removeEventListener('dataChanged', handleDataChanged);
    };
});

function handleDataChanged(event) {
    // console.log('Data was changed:', event.detail);

    // Check if isLogin is false
    if (event.detail && event.detail.isLogin === false) {
        isVisible.value = true;
    }
}

// Show animation when popup first appears
watch(() => isVisible.value, (newValue) => {
    if (newValue) {
        showAnimation.value = true;
        setTimeout(() => {
            showAnimation.value = false;
        }, 600);
    }
});

// Methods
const close = () => {
    isVisible.value = false;
    emit('close');
};

const closeIfNotPersistent = () => {
    if (!props.isPersistent) {
        close();
    }
};

const loginWithGmail = () => {
    emit('gmail-login');
    close(); // Close the popup after emitting the login event
};
</script>

<style scoped>
.login-popup-overlay {
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

.login-popup-container {
    background-color: white;
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    width: 90%;
    max-width: 500px;
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
    background-color: #e0e7ff;
    color: #4338ca;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    z-index: 1;
    margin-bottom: -35px;
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
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
}

.popup-actions {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.btn-gmail {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background-color: white;
    color: #444;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 14px 28px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    min-width: 240px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-gmail:hover {
    background-color: #f8f8f8;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-gmail:active {
    transform: translateY(0);
}

.gmail-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-primary {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    min-width: 140px;
}

.btn-primary:hover {
    background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

.btn-primary:active {
    transform: translateY(0);
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
    .login-popup-container {
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

    .btn-gmail {
        width: 100%;
    }
}
</style>