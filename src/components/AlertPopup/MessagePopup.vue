<template>
    <div class="message-popup-overlay" v-if="isVisible" @click.self="closeIfNotPersistent">
        <div class="message-popup-container" :class="{ 'shake-animation': showAnimation }">
            <div class="popup-header" :style="{ backgroundImage: getGradientByType }">
                <div class="popup-icon" :style="{ backgroundColor: getIconBgByType, color: getIconColorByType }">
                    <span>{{ getIconByType }}</span>
                </div>
                <button class="popup-close" @click="close" v-if="!isPersistent">×</button>
            </div>

            <div class="popup-content">
                <h2 class="popup-title" :style="{ background: getGradientByType }">{{ title }}</h2>
                <p class="popup-message">{{ message }}</p>

                <div class="popup-actions">
                    <button class="btn-primary" @click="handlePrimaryAction">
                        {{ primaryButtonText }}
                    </button>
                    <button class="btn-secondary" v-if="showSecondaryButton" @click="handleSecondaryAction">
                        {{ secondaryButtonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'info', // 'info', 'error', 'success', 'warning'
        validator: (value) => ['info', 'error', 'success', 'warning'].includes(value)
    },
    title: {
        type: String,
        default: 'Thông báo'
    },
    message: {
        type: String,
        required: true
    },
    primaryButtonText: {
        type: String,
        default: 'OK'
    },
    secondaryButtonText: {
        type: String,
        default: 'Hủy'
    },
    showSecondaryButton: {
        type: Boolean,
        default: false
    },
    isPersistent: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close', 'primary-action', 'secondary-action']);

const isVisible = ref(false);
const showAnimation = ref(false);

// Type-based styling
const getGradientByType = computed(() => {
    const gradients = {
        info: 'linear-gradient(90deg, #4338ca, #6366f1)',
        error: 'linear-gradient(90deg, #dc2626, #ef4444)',
        success: 'linear-gradient(90deg, #059669, #10b981)',
        warning: 'linear-gradient(90deg, #d97706, #f59e0b)'
    };
    return gradients[props.type];
});

const getIconByType = computed(() => {
    const icons = {
        info: 'ℹ️',
        error: '❌',
        success: '✅',
        warning: '⚠️'
    };
    return icons[props.type];
});

const getIconBgByType = computed(() => {
    const backgrounds = {
        info: '#e0e7ff',
        error: '#fee2e2',
        success: '#d1fae5',
        warning: '#fef3c7'
    };
    return backgrounds[props.type];
});

const getIconColorByType = computed(() => {
    const colors = {
        info: '#4338ca',
        error: '#dc2626',
        success: '#059669',
        warning: '#d97706'
    };
    return colors[props.type];
});

// Public method to show the popup
const show = () => {
    isVisible.value = true;
};

// Expose the show method
defineExpose({ show });

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

const handlePrimaryAction = () => {
    emit('primary-action');
    if (!props.isPersistent) {
        close();
    }
};

const handleSecondaryAction = () => {
    emit('secondary-action');
    if (!props.isPersistent) {
        close();
    }
};
</script>

<style scoped>
.message-popup-overlay {
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

.message-popup-container {
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
}

.popup-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
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
    gap: 12px;
    margin-top: 10px;
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
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(79, 70, 229, 0.35);
}

.btn-secondary {
    background-color: white;
    color: #64748b;
    border: 1px solid #e2e8f0;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    min-width: 140px;
}

.btn-secondary:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.btn-primary:active,
.btn-secondary:active {
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
    .message-popup-container {
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

    .popup-actions {
        flex-direction: column;
        gap: 10px;
    }

    .btn-primary,
    .btn-secondary {
        width: 100%;
    }
}
</style>