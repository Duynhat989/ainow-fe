<template>
    <div class="crop_main">
        <div class="close">
            <label @click="close" style="cursor: pointer;font-size: 1.2em;">X</label>
        </div>
        <!-- Upload hình ảnh -->
        <input hidden id="file" type="file" @change="onFileChange" accept="image/*" />

        <!-- Khu vực hiển thị và chỉnh sửa hình ảnh -->
        <div class="imageBase64" v-if="imageBase64 && intShow == 2" style="margin-top: 20px;">
            <img class="localImage" ref="imageRef" :src="imageBase64" style="max-width: 100%;" />
        </div>
        <div v-else class="empty" @click="chooseImg"
            style="border: 1px dashed #00365d;border-radius: 10px;text-align: center;padding: 50px;">
            <i style="font-size: 5em;opacity: 0.7;" class='bx bx-cloud-upload'></i>
            <div class="text">
                <span @click="chooseSolve(false)" style="color: blue;">{{ languagePack["CAPTURE"] }}</span> {{ languagePack["SOLVE_LIB"] }} <span style="color: blue;" @click="chooseSolve(true)">{{ languagePack["SOLVE_LIBARY"] }}</span>
            </div>
        </div>

        <!-- Nút lấy ảnh sau khi cắt -->
        <button class="crop" v-if="intShow == 2" @click="getCroppedImage" style="">{{ languagePack["CONFIRM"] }}</button>
        <button class="crop takeOf" v-if="intShow == 2" @click="reTakeOfPhoto" style=""><i style="color: #00365d;"
                class='bx bx-camera'></i> {{ languagePack["RE_CAPTURE"] }}</button>

    </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css"; // Import CSS của CropperJS
import { languagePack } from "@/languages";

// State
const imageBase64 = ref(null); // Lưu trữ Base64 của ảnh tải lên
const croppedImage = ref(null); // Lưu trữ Base64 của ảnh đã cắt
const imageRef = ref(null); // Tham chiếu đến thẻ <img> để gắn CropperJS
let cropper = null; // Biến lưu instance của CropperJS

const emit = defineEmits()

const intShow = ref(1)

const chooseImg = async (event) => {
    // event.preventDefault();
    document.querySelector('#file').click()
    intShow.value = 2
}
function resizeImageBase64(base64, newWidth, quality = 1.0) {
    return new Promise((resolve, reject) => {
        // Tạo một đối tượng Image mới
        let img = new Image();
        img.src = base64;

        img.onload = function () {
            // Lấy kích thước ảnh ban đầu
            let width = img.width;
            let height = img.height;

            // Tính tỷ lệ mới để giữ nguyên tỷ lệ của ảnh
            let ratio = newWidth / width;

            // Tính chiều cao mới dựa trên tỷ lệ
            let newHeight = height * ratio;

            // Tạo canvas để vẽ ảnh đã thay đổi kích thước
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Vẽ ảnh lên canvas
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Lấy dữ liệu base64 từ canvas đã vẽ với chất lượng tối đa
            let resizedBase64 = canvas.toDataURL('image/jpeg', quality); // Bạn có thể thay đổi 'image/jpeg' sang 'image/png' tùy theo loại ảnh

            resolve(resizedBase64);
        };

        img.onerror = function() {
            reject('Failed to load image');
        };
    });
}
// Xử lý tải ảnh và khởi tạo CropperJS
const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        imageBase64.value = e.target.result;

        // Đợi DOM render xong rồi khởi tạo CropperJS
        await nextTick();
        if (cropper) cropper.destroy(); // Hủy instance cũ nếu có
        cropper = new Cropper(imageRef.value, {
            aspectRatio: NaN, // Không cố định tỉ lệ, cho phép tự do cắt
            viewMode: 1, // Hiển thị toàn bộ ảnh trong vùng hiển thị
            // dragMode: "move", // Chế độ di chuyển hình
            scalable: true, // Cho phép phóng to/thu nhỏ
            zoomable: true, // Cho phép zoom
            // rotatable: true, // Cho phép xoay hình
            cropBoxMovable: true, // Cho phép di chuyển khung cắt
            cropBoxResizable: true, // Cho phép thay đổi kích thước khung cắt
        });
    };
    reader.readAsDataURL(file);
};

// Xử lý lấy ảnh đã cắt
const reTakeOfPhoto = () => {
    imageBase64.value = null
    intShow.value = 1
    chooseImg()
};
const getCroppedImage =async () => {
    if (!cropper) return;
    // Lấy canvas từ vùng đã cắt
    const canvas = cropper.getCroppedCanvas();
    if (canvas) {
        croppedImage.value = canvas.toDataURL("image/png");
    }
    intShow.value = 3
    croppedImage.value = await resizeImageBase64(croppedImage.value,1000)
    emit('update:finish', {
        base64: croppedImage.value
    })
};
const close = async () => {
    emit('update:close')
}
const chooseSolve = async (libiry) => {
    // isChooseImg.value = true
    if (libiry) {
        document.querySelector('#file').removeAttribute('capture');
    } else {
        document.querySelector('#file').setAttribute('capture', 'camera');
    }
    txtMessgae.value = ''
    document.querySelector('#file').click()
}
onMounted(() => {
    chooseImg()
})

</script>

<style scoped>
/* .imageBase64 {} */

/* Style tuỳ chỉnh nếu cần */
button {
    padding: 10px 20px;
    background: none;
    border: 1px solid #00365d59;
    border-radius: 7px;
    font-size: 1em;
    cursor: pointer;
    min-width: 70px;
    transition: all 0.5s;
    background: white;
}

button:hover {
    background-color: #616161;
    color: white;
}

.crop_main {
    position: relative;
    min-height: 150px;
}

.crop {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 999999;
}

.takeOf {
    position: absolute;
    bottom: 10px;
    right: 110px;
    z-index: 99;
}

.localImage {
    max-height: 75dvb;
}

.close {
    text-align: end;
}

/* .close label {} */
</style>