<template>
    <MessagePopup class="alert" ref="messagePopup" :type="messagePopupConfig.type" :title="messagePopupConfig.title"
        :message="messagePopupConfig.message" :primary-button-text="messagePopupConfig.primaryButtonText"
        :secondary-button-text="messagePopupConfig.secondaryButtonText"
        :show-secondary-button="messagePopupConfig.showSecondaryButton" :is-persistent="messagePopupConfig.isPersistent"
        @close="onMessagePopupClose" @primary-action="onMessagePopupPrimary"
        @secondary-action="onMessagePopupSecondary" />
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import MessagePopup from './MessagePopup.vue';
const messagePopup = ref(null);
const messagePopupConfig = reactive({
    type: 'info',
    title: 'Thông báo',
    message: '',
    primaryButtonText: 'OK',
    secondaryButtonText: 'Hủy',
    showSecondaryButton: false,
    isPersistent: false,
    callback: null
});
// Message popup event handlers
const onMessagePopupClose = () => {
    // Reset to default values if needed
    messagePopupConfig.primaryButtonText = 'OK';
};

const onMessagePopupPrimary = () => {
    if (messagePopupConfig.callback) {
        messagePopupConfig.callback(true);
    }
};

const onMessagePopupSecondary = () => {
    if (messagePopupConfig.callback) {
        messagePopupConfig.callback(false);
    }
};



onMounted(() => {
    
    document.addEventListener('dataChanged', handleDataChanged);

    // Clean up event listener when component is unmounted
    // messagePopup.value.show()
    return () => {
        document.removeEventListener('dataChanged', handleDataChanged);
    };
})

function handleDataChanged(event) {
    console.log(event.detail)
}

</script>