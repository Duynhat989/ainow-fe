<template>
    <div class="payment">
        <h1>Pro AINow</h1>
        <i v-if="isSnapLoading" style="font-size: 3em;" class='bx bx-loader-circle bx-spin'></i>
        <p v-if="isSnapLoading">Create payment invoice</p>
        <div id="paypal-container-XME39X22MHEYW"></div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const isSnapLoading = ref(true)
paypal.HostedButtons({ hostedButtonId: "XME39X22MHEYW" }).render("#paypal-container-XME39X22MHEYW");


const awEmail = () => {
    let ainow_user = JSON.parse(localStorage.getItem("ainow_user"))
    let idSetInterval = setInterval(() => {

        let memo = document.querySelector('#memo')
        if (memo) {
            memo.value = ainow_user.email
            isSnapLoading.value = false
            clearInterval(idSetInterval)
        }
    }, 1000)
}
awEmail()
</script>
<style scoped>
h1{
    margin-bottom: 50px;
}
.payment {
    text-align: center;
    width: 400px;
    margin: auto;
    margin-top: 50px;
}
</style>