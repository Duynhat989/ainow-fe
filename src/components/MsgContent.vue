<script setup>
import { onMounted, ref, watch } from "vue";
import hljs from "highlight.js"
import MarkdownIt from 'markdown-it'
import copy from 'copy-to-clipboard'
import mathjax3 from 'markdown-it-mathjax3'

const md = new MarkdownIt({
    linkify: true,
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return `<pre class="hljs-code-container my-3"><div class="hljs-code-header d-flex align-center justify-space-between bg-grey-darken-3 pa-1"><span class="pl-2 text-caption">${language}</span><button class="hljs-copy-button" data-copied="false">Copy</button></div><code class="hljs language-${language}">${hljs.highlight(code, { language: language, ignoreIllegals: true }).value}</code></pre>`
    },
})
md.use(mathjax3)

const contentHtml = ref('')
const contentElm = ref(null)

const renderMessage = (message) => {
    contentHtml.value = message ? md.render(message) : ''
    bindCopyCodeToButtons()
}
const bindCopyCodeToButtons = () => {
    if (!contentElm.value) {
        return
    }
    contentElm.value.querySelectorAll('.hljs-code-container').forEach((codeContainer) => {
        const copyButton = codeContainer.querySelector('.hljs-copy-button');
        const codeBody = codeContainer.querySelector('code');
        copyButton.onclick = function () {
            copy(codeBody.textContent ?? '');

            copyButton.innerHTML = "Copied!";
            copyButton.dataset.copied = 'true';

            setTimeout(() => {
                copyButton.innerHTML = "Copy";
                copyButton.dataset.copied = 'false';
            }, 2000);
        };
    })
}



const props = defineProps(["msg", "load"])
const msg = ref(null)
const load = ref(false)
const isViewMsg = ref(false)
onMounted(() => {
    msg.value = props.msg
    console.log(msg.value)
    load.value = props.load
    if (msg.value) {

        renderMessage(msg.value.pasts[0].text)

        if (msg.value.role == "user") {
            isViewMsg.value = true
        } else {
            setTimeout(() => {
                isViewMsg.value = true
            }, 1000)
        }
    }
})
watch(() => props.msg, (newValue) => {
    msg.value = newValue;
    renderMessage(msg.value.pasts[0].text);
});

</script>

<template>
    <div class="msg-content" v-if="msg">
            <div v-if="msg.pasts[0].text == `loading`" class="load" style="text-align: start;"><i class='bx bx-loader bx-spin bx-flip-vertical' ></i></div>
            <div v-else ref="contentElm" v-html="contentHtml" class="chat-msg-content pa-3"></div>
        </div>
</template>
<style>
.chat-msg-content pre {
    background: rgb(140, 140, 140) !important;
    padding: 10px !important;
    border-radius: 15px !important;
    word-wrap: break-word !important;
}

.chat-msg-content .hljs-code-header {
    display: flex !important;
    margin-bottom: 10px !important;
}

.chat-msg-content pre .text-caption {
    border: 1px solid rgba(128, 128, 128, 0.438) !important;
    padding: 0 5px !important;
    border-radius: 3px !important;
}

.chat-msg-content pre .hljs-copy-button {
    background: none !important;
    margin-left: auto !important;
    display: block !important;
    border: none !important;
    cursor: pointer !important;
}
.chat-msg-content p{
    padding: 10px;
    margin: 0;
}
</style>
<style scoped>
p {
    margin: 0;
    padding: 0;
}
.chat-msg-content{
    padding-right: 20px;
}
</style>