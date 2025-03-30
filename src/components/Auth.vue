<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';
import { languagePack } from '@/languages';

// sử dung api fb
const user = ref(null);
const initializeFacebookSDK = () => {
    FB.init({
        appId: "501048089646178", // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v16.0", // Use the latest version
    });
};

const loginWithFacebook = () => {
    FB.login(
        (response) => {
            if (response.status === "connected") {
                fetchFacebookUserData();
            } else {
                alert("Login failed!");
            }
        },
        { scope: "public_profile,email" }
    );
};

const fetchFacebookUserData = () => {
    FB.api("/me", { fields: "name,email,picture" }, (response) => {
        user.value = {
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
        };
        console.log(user.value)
    });
};


const router = useRouter();
const isShowAccount = ref(false)
const loginAccount = ref(true)
const isLoading = ref(false)

const notify = ref('')

const emit = defineEmits()
const close = async () => {
    emit('auth:close')
}
// thông báo đăng nhập 

const username = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const re_password = ref('')
const handleLogin = async (event) => {
    isLoading.value = true;
    try {
        // await new Promise(resolve => setTimeout(resolve, 1000));
        await store.dispatch('login', { email: email.value, password: password.value });
        const intendedRoute = localStorage.getItem('intendedRoute');
        if (intendedRoute) {
            router.push(intendedRoute);
            localStorage.removeItem('intendedRoute');
        } else {
            router.push('/');
        }
        notify.value = {
            color: "green",
            msg: languagePack["SIGNIN_SUCCESS"]
        }
    } catch (error) {
        notify.value = {
            color: "red",
            msg: languagePack["SIGNIN_FAILED"]
        }
    } finally {
        isLoading.value = false;
    }
};

const handleRegister = async (event) => {
    isLoading.value = true;
    try {
        // await new Promise(resolve => setTimeout(resolve, 1000));
        await store.dispatch('register', { name: username.value, email: email.value, password: password.value, phone: phone.value });
        await handleLogin({ email: email.value, password: password.value });
        const intendedRoute = localStorage.getItem('intendedRoute');
        if (intendedRoute) {
            router.push(intendedRoute);
            localStorage.removeItem('intendedRoute');
        } else {
            router.push('/');
        }
        notify.value = {
            color: "green",
            msg: languagePack["SIGNIN_SUCCESS"]
        }
    } catch (error) {
        notify.value = {
            color: "red",
            msg: languagePack["SIGNIN_FAILED"]
        }
    } finally {
        isLoading.value = false;
    }
};
// Cấu hình Google OAuth
const googleAuth = ref(null)
// Khởi tạo Google OAuth client
const initializeGoogleAuth = () => {
    return new Promise((resolve) => {
        if (typeof window.google !== 'undefined') {
            resolve(window.google)
            return
        }

        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = () => resolve(window.google)
        document.head.appendChild(script)
    })
}

// Đăng nhập bằng google
// Hàm decode JWT token
const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        return JSON.parse(jsonPayload)
    } catch (err) {
        console.error('Error decoding JWT:', err)
        return null
    }
}
// Xử lý response từ Google
async function handleCredentialResponse(response) {
    isLoading.value = true
    console.log(response)
    const decodedToken = decodeJWT(response.credential)
    console.log('Decoded token:', decodedToken)
    try {


    } catch (err) {
    } finally {
        isLoading.value = false
    }
}
// Hàm xử lý click để mở popup đăng nhập Google
const handleGoogleLogin = () => {
    if (!googleAuth.value) {
        error.value = 'Google Auth not initialized'
        return
    }

    googleAuth.value.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
            // Popup bị chặn hoặc không thể hiển thị
            console.log('Please enable popups for this site')
            return
        }

        if (notification.isSkippedMoment()) {
            // Người dùng đóng popup mà không chọn tài khoản
            console.log('Please select an account to continue')
            return
        }

        if (notification.isDismissedMoment()) {
            // Người dùng chủ động đóng popup ("dismissed")
            console.log('null')
            return
        }

        // Kiểm tra credential_returned
        if (notification.getMomentType() === "credential_returned") {
            // Credential đã được trả về và sẽ được xử lý trong callback handleCredentialResponse
            isLoading.value = true
        }
    })
}
onMounted(async () => {    // Swr dungj ham

    registerRandomAccount()
})

const generateRandomAccount = () => {
    // Generate random username (e.g., user123)
    const randomUsername = `user${Math.floor(Math.random() * 10000)}`;

    // Generate random email (e.g., user123@example.com)
    const domains = ['mathsnap.org'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomEmail = `${randomUsername}@${randomDomain}`;

    // Generate random password (8-12 characters with letters, numbers, and special chars)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const passwordLength = Math.floor(Math.random() * 5) + 8; // 8-12 characters
    let randomPassword = '';

    for (let i = 0; i < passwordLength; i++) {
        randomPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Generate random phone number (10 digits, formatting like 0912345678)
    const prefixes = ['09', '08', '07', '03', '05'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomPhoneNumber = randomPrefix +
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');

    return {
        username: randomUsername,
        email: randomEmail,
        password: randomPassword,
        phone: randomPhoneNumber
    };
};

// Example usage with your existing handleRegister function:
const registerRandomAccount = async () => {
    const randomAccount = generateRandomAccount();
    console.log("Generated random account:", randomAccount);

    // Set form values
    username.value = randomAccount.username;
    email.value = randomAccount.email;
    password.value = randomAccount.password;
    phone.value = randomAccount.phone;

    // Call the registration function

    await handleRegister();
};


</script>
<template>
    <div class="login">
        <div class="login_form">
            <label>
                <div class="close" @click="close()">X</div>
            </label>
            <div class="logo">
                <img height="70" src="../assets/images/logo_text.png" alt="logo">
                <p style="margin: 0;font-size: 0.9em;margin-left: 15px;" class="slogan"><i
                        class='bx bx-right-arrow'></i> {{ languagePack["SOLVE_SMART"] }}</p>
            </div>
            <div class="notify">
                <div class="downlloadicon">
                    <i class='bx bxs-download bx-fade-down' ></i>
                </div>
                <div class="titIcon">
                    <h3> {{ languagePack["WAIT_1MIT"] }}</h3>
                </div>
            </div>
            <div class="download flex">
                <div class="ios">
                    <a href="#" target="_blank"><img height="65" src="../assets/images/ios.png" alt=""></a>
                </div>
                <div class="apk">
                    <a href="#" target="_blank"><img height="60" src="../assets/images/apk.png" alt=""></a>
                </div>
            </div>
            <div class="footer" style="text-align: center;padding-top: 15px;">
                <h4 style="margin: 0;">MATHSNAP</h4>
                <span style="font-size: 0.9em;">{{ languagePack["PIRE_SNAP"] }} <a href="#" style="color: blue;"
                        target="_blank">MathSnap</a></span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.downlloadicon i{
    font-size: 2em;
}
.titIcon{
    padding: 5px 30px;
}
.notify {
    text-align: center;
    margin-top: 20px;
}

.download {
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.login {
    padding: 10px 20px;
}

.login_form {
    max-width: 450px;
    margin: auto;
    background: white;
    box-shadow: 1px 2px 6px 1px #00365d54;
    border-radius: 10px;
    min-height: 400px;
    max-height: 70vh;
    padding: 10px;
    overflow-y: scroll;
}

.login_form::-webkit-scrollbar {
    width: 5px;
    height: 8px;
}

.typeButton {
    width: 100%;
    max-width: 370px;
    margin: auto;
    margin-top: 10px;
}

.typeButton button {
    width: calc(100% / 2);
    padding: 12px 20px;
    background: none;
    border: 1px solid rgba(128, 128, 128, 0.24);
    cursor: pointer;
}

.typeButton .choose {
    background: #00365d;
    color: white;
}

.typeButton .choose i {
    color: white;
}

.auth_type {
    max-width: 350px;
    margin: 0px auto;
    margin-bottom: 15px;
}

.auth_select button {
    padding: 15px 10px;
    width: 100%;
    margin-top: 15px;
    border: none;
    background: none;
    box-shadow: 1px 2px 6px 1px #00365d54;
    transition: all 0.5s;
    border-radius: 7px;
}

.choose .user_pass,
.auth_select button:hover,
.auth_select button:hover i {
    background: #00365d;
    cursor: pointer;
    color: white;
}

.form_account {
    padding-top: 10px;
    margin: 10px;
}

.input {
    margin-top: 10px;
}

.input button {
    padding: 12px 10px;
}

.button {
    width: 250px;
    margin: auto;
    margin-top: 10px;
}

.form_account input {
    padding: 12px 10px;
    width: calc(100% - 20px);
    box-shadow: 1px 2px 6px 1px #00365d54;
    border: none;
    background: none;
    margin-top: 7px;
}

.form_account label {
    font-size: 0.9em;
}

label {
    text-align: end;
}

.close {
    cursor: pointer;
}

@media (max-width: 654px) {
    .login_form {
        padding: 15px;
    }
}
</style>