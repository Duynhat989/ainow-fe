<template>
    <transition name="fade">
        <div class="lightbox-overlay" v-if="image" @click="$emit('close')">
            <div class="lightbox-content">
                <img :src="image" alt="Full size image" />
                <button class="lightbox-close" @click.stop="$emit('close')">×</button>
                
                <div class="lightbox-controls">
                    <button class="lightbox-btn" @click.stop="downloadImage">
                        <span class="lightbox-btn-icon">💾</span>
                        Download
                    </button>
                    <button class="lightbox-btn share-btn" @click.stop="shareImage">
                        <span class="lightbox-btn-icon">🔗</span>
                        Share
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    image: {
        type: String,
        default: null
    }
});

const emit = defineEmits(['close']);

const downloadImage = () => {
    try {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = props.image;
        
        // Generate a filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `image-${timestamp}.png`;
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading image:', error);
        alert('Could not download the image. Please try again.');
    }
};

const shareImage = () => {
    if (navigator.share) {
        // Use the Web Share API if available
        navigator.share({
            title: 'Shared Image from AI Editor',
            text: 'Check out this image created with AI!',
            url: props.image
        })
        .catch(error => {
            console.error('Error sharing:', error);
        });
    } else {
        // Fallback - copy to clipboard
        try {
            navigator.clipboard.writeText(props.image)
                .then(() => {
                    alert('Image URL copied to clipboard!');
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    alert('Could not share image. Please try again.');
                });
        } catch (error) {
            console.error('Error sharing image:', error);
            alert('Sharing is not supported on this browser.');
        }
    }
};
</script>

<style scoped>
.lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
    cursor: pointer;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    cursor: default;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 85vh;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    object-fit: contain;
    display: block;
}

.lightbox-close {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}

.lightbox-close:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.lightbox-controls {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
}

.lightbox-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 30px;
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.lightbox-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.lightbox-btn-icon {
    font-size: 1.2rem;
}

.share-btn {
    background-color: rgba(99, 102, 241, 0.6);
}

.share-btn:hover {
    background-color: rgba(99, 102, 241, 0.8);
}

/* Transition animations */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

@media (max-width: 768px) {
    .lightbox-controls {
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
    
    .lightbox-btn {
        width: 80%;
    }
}
</style>