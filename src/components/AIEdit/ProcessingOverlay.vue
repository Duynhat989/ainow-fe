<template>
    <div class="processing-overlay" v-if="isVisible">
        <div class="processing-content">
            <div class="spinner"></div>
            <p>{{ isGenerating ?
                $t('PROCESSING_GENERATING_DESC')
                : $t('PROCESSING_IMAGE_DESC') }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isVisible: {
        type: Boolean,
        default: false
    },
    isGenerating: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.processing-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(8px);
}

.processing-content {
    background-color: white;
    padding: 40px 50px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 90%;
    animation: slideUp 0.4s ease;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f1f5f9;
    border-top: 4px solid #6366f1;
    border-radius: 50%;
    margin: 0 auto 25px;
    animation: spin 1s linear infinite;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media (max-width: 768px) {
    .processing-content {
        padding: 30px;
    }
}
</style>